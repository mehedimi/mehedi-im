---
title: Setting Up Multi-Tenant Custom Domains (Without Paying for Cloudflare for SaaS)
description: How Countdown Builder serves customer domains with their own TLS certs — Nginx stream SNI routing, Caddy on-demand TLS, unix sockets, and PROXY protocol, without paying for Cloudflare for SaaS.
date: 2026-10-23
tags:
  - Nginx
  - Caddy
  - TLS
  - Infrastructure
image: /images/blog/banner-custom-domains-light.png
---

![Multi-Tenant Custom Domains, without paying for Cloudflare for SaaS](/images/blog/banner-custom-domains-light.png)

I run [CountdownBuilder](https://countdownbuilder.com), a SaaS that serves live countdown timer images for emails. Customers wanted `timer.theirbrand.com` instead of our domain, which meant issuing and renewing TLS certs for domains I don't know in advance.

Cloudflare for SaaS solves this, but it bills per hostname, and that adds up when every customer brings their own domain. So I built it on a single server with Nginx and Caddy. This is the loop I went through: what I tried, what broke, and what the final setup looks like.

## The final architecture

```
                         ┌──> [Known SaaS domain] ──> Nginx app (unix socket)
Client ──> Nginx :443 ───┤
          (stream, L4)   └──> [Custom domain]     ──> Caddy on-demand TLS (unix socket)
```

- **Nginx `stream` (Layer 4)** listens on 443. It never decrypts anything. It reads the SNI from the TLS handshake and routes the raw connection.
- **Caddy (Layer 7)** handles unknown customer domains. It terminates TLS, gets Let's Encrypt certificates on the fly, and proxies to the backend.
- The two hops use **unix sockets** in one directory, and **PROXY protocol** carries the real client IP across the Layer 4 hop.

## Attempt 1: Plain Nginx

**Try:** one `server` block with `server_name _` and a wildcard cert.
**Result:** a wildcard cert only covers _my_ domain. Customer domains throw certificate warnings, and Gmail's image proxy refuses to fetch the timer.
**Learned:** Nginx needs a cert _before_ it knows which site you wanted. Dynamic domains need something that can get certs at handshake time.

## Attempt 2: Caddy on-demand TLS, alone

**Try:** Caddy on 443 with `on_demand` and an `ask` endpoint.
**Result:** it works, but now Caddy fronts my main app too, and I didn't want to migrate a working Nginx setup.
**Learned:** I wanted the main app untouched, with only unknown domains going to Caddy.

## Attempt 3: Nginx `stream` as an SNI router

Nginx's `stream` module can read the SNI from the TLS ClientHello without decrypting anything:

```nginx
stream {
    map $ssl_preread_server_name $https_backend {
        app.example.com  127.0.0.1:8081;   # main app (Nginx http block)
        example.com      127.0.0.1:8081;
        default          127.0.0.1:8443;   # everything else -> Caddy
    }

    server {
        listen 443;
        ssl_preread on;
        proxy_pass $https_backend;
    }
}
```

**Result:** HTTPS worked. Known domains hit the app, unknown ones hit Caddy and got certs on demand. I thought I was done.

## Bug 1: Port 80 routing doesn't work in `stream`

My first draft routed port 80 with `$http_host` inside a `stream` map. That variable doesn't exist there, because stream is Layer 4 and never parses HTTP. You get a config error or an empty variable, depending on version.

**Fix:** keep port 80 in a normal `http` block, where Host-based routing works:

```nginx
http {
    server {
        listen 80 default_server;
        server_name app.example.com example.com;
        location / { proxy_pass http://127.0.0.1:5000; }
    }

    server {
        listen 80;
        server_name _;
        location / {
            proxy_pass http://127.0.0.1:8082;   # Caddy HTTP (ACME + redirect)
            proxy_set_header Host $host;
        }
    }
}
```

## Improvement: replace loopback TCP with unix sockets

The setup worked, but every request crossed two loopback TCP hops (`:8081` and `:8443`). Unix sockets skip the TCP stack, and they have a second advantage: they can be locked down with file permissions. Loopback ports can't. That matters later, because anything that can connect to a PROXY-protocol listener can forge a client IP.

### One directory, one access rule

```bash
echo 'd /run/app-sockets 0750 caddy www-data -' | sudo tee /etc/tmpfiles.d/app-sockets.conf
sudo systemd-tmpfiles --create
```

The directory is owned by `caddy`, with group `www-data` (Nginx's worker user) and mode `0750`. Only those two can enter it, so the directory is the access control and the socket files inside can be permissive.

You might wonder how Nginx creates its socket if `www-data` can't write there. It doesn't need to: the Nginx master process runs as root and creates listen sockets at startup. The workers, running as `www-data`, only need to _traverse_ the directory and connect.

### Nginx side

In the main app's server block, listen on a socket instead of `127.0.0.1:8081`:

```nginx
listen unix:/run/app-sockets/nginx-app.sock ssl;
```

Then point the stream map at it:

```nginx
map $ssl_preread_server_name $https_backend {
    app.example.com  unix:/run/app-sockets/nginx-app.sock;
    example.com      unix:/run/app-sockets/nginx-app.sock;
    default          unix:/run/app-sockets/caddy-tls.sock;
}
```

The `unix:` prefix is required in map values. `sudo nginx -t && sudo systemctl reload nginx` is enough for the app side, and `ss -xlp | grep nginx-app` should show the socket listening.

### Caddy side

Caddy can bind a site to a unix socket, and the `|0666` suffix sets the socket's mode (the default would not let Nginx connect):

```
{
    http_port 8082

    on_demand_tls {
        ask http://127.0.0.1:8000/internal/domain-check
    }
}

https:// {
    bind unix//run/app-sockets/caddy-tls.sock|0666
    tls {
        on_demand
    }
    # ...your handlers
}
```

I did this one hop at a time, and the migration order matters: move the Nginx hop first, confirm the app still works, then move the Caddy hop. Restart Caddy _before_ reloading Nginx, so the socket exists when Nginx starts routing to it.

## Bug 2: every client IP was 127.0.0.1

This one cost me the most time.

### The symptom

I checked analytics for customer-domain traffic: every request came from the same address, so one visitor with no geography.

### The cause

`stream` forwards raw TCP. Caddy never sees the real client, only Nginx. Setting `X-Real-IP` can't help, because Caddy's idea of the remote address is already wrong before any HTTP is parsed. And Nginx can't add headers, because it never decrypts the traffic. Per-IP rate limiting, abuse blocking and logs all see one client. A unix socket doesn't change this: the peer on a unix socket is just "unix", not your visitor.

### The fix: PROXY protocol

PROXY protocol solves this at Layer 4. Nginx prepends a small plaintext line to the connection, before the TLS handshake, carrying the original client address:

```
PROXY TCP4 203.0.113.50 10.0.0.5 51234 443
```

The backend reads that line, strips it, and treats `203.0.113.50` as the connection's remote address. TLS then proceeds untouched.

**Step 1: tell Nginx stream to send it**

```nginx
server {
    listen 443;
    ssl_preread on;
    proxy_pass $https_backend;
    proxy_protocol on;
}
```

**Step 2: tell Caddy to expect it**

```
{
    http_port 8082

    on_demand_tls {
        ask http://127.0.0.1:8000/internal/domain-check
    }

    servers unix//run/app-sockets/caddy-tls.sock|0666 {
        protocols h1 h2
        listener_wrappers {
            proxy_protocol
            tls
        }
    }
}
```

Three details here, and I hit all of them:

- **The directive is `listener_wrappers`.** I first typed `listen_wrappers` and got `unrecognized servers option`.
- **Order matters.** `proxy_protocol` must come before `tls`, because the PROXY line arrives _before_ the TLS handshake. Reverse them and Caddy tries to parse `PROXY TCP4...` as a ClientHello.
- **Scope the `servers` block to the socket.** A bare `servers { }` applies to every listener, including the HTTP one on 8082, and putting a `tls` wrapper on a plain-HTTP port breaks ACME HTTP-01 and the redirect. The address in `servers <address>` has to match the listener Caddy actually creates, and a mismatch fails silently, with `caddy validate` still passing. So check it:

```bash
sudo caddy adapt --config /etc/caddy/Caddyfile --pretty | grep -n -B3 -A10 listener_wrappers
```

You should see `proxy_protocol` then `tls` inside a server whose `listen` is your unix socket. If `listener_wrappers` is missing, copy the exact `"listen"` string from the `adapt` output into the `servers` line.

With this in place, `{remote_host}` in Caddy resolves to the real client, so for any proxied service you can add `header_up X-Real-IP {remote_host}`.

### Gotcha: Caddy 2.6 doesn't have the module

`caddy validate` failed with `module not registered: caddy.listeners.proxy_protocol`. The PROXY protocol listener only ships in Caddy 2.7 and newer, and Ubuntu's own `caddy` package is stuck on 2.6.2. Check with `caddy version` and `caddy list-modules | grep proxy_protocol`.

Installing from the official Caddy apt repo wasn't enough on its own. `apt policy caddy` still picked 2.6.2, because Ubuntu's ESM repo has the package at pin priority 510, which beats the Caddy repo's 500. Either install a specific version (`sudo apt install caddy=2.11.7`) or pin the repo so upgrades don't drift back:

```
# /etc/apt/preferences.d/caddy
Package: caddy
Pin: origin dl.cloudsmith.io
Pin-Priority: 1001
```

### The trap: `proxy_protocol on` is all-or-nothing

`proxy_protocol on` in the stream server prefixes _every_ connection, including the ones headed for the main app. That listener has to expect it too, or it will read `PROXY TCP4 ...` as the start of a TLS handshake and reject it. **Every backend in the map must accept PROXY protocol, or none of them can.**

```nginx
# main app server block
listen unix:/run/app-sockets/nginx-app.sock ssl proxy_protocol;

set_real_ip_from unix:;
real_ip_header   proxy_protocol;
```

`proxy_protocol` on the `listen` line makes Nginx _parse_ the header. `set_real_ip_from` plus `real_ip_header proxy_protocol` makes it _use_ the header to set `$remote_addr`. You need both. For a unix socket peer, the trusted source is `unix:`.

Because one side now sends the header and the other requires it, switch them together:

```bash
sudo nginx -t && sudo systemctl restart caddy && sudo systemctl reload nginx
```

### Why the socket permissions matter here

PROXY protocol is just text the sender claims is true. If an untrusted process can connect to a listener that accepts PROXY headers, it can send `PROXY TCP4 1.2.3.4 ...` and impersonate any IP, which defeats rate limits and IP bans. With a `0750` directory, only Caddy and the Nginx user can reach the sockets at all. With loopback TCP, every local process could. That's the real security gain from sockets here.

## Bug 3: my own domain showed Cloudflare's IP

After PROXY protocol worked, customer domains reported real client IPs. My own domain didn't: it reported `172.71.x.x`. That's not a bug. My own domain is proxied through Cloudflare, so from the server's point of view Cloudflare _is_ the client, and PROXY protocol correctly reported Cloudflare's edge. The real visitor is in the `CF-Connecting-IP` header.

You can't trust that header blindly, because anyone can send it straight to your server. So Nginx should honor it only when the connecting peer is a Cloudflare address. I already use `real_ip_header proxy_protocol`, and there can only be one `real_ip_header`, so I compute a separate `$client_ip`:

```nginx
# /etc/nginx/conf.d/cloudflare-geo.conf  (generated from Cloudflare's published ranges)
geo $is_cloudflare {
    default 0;
    173.245.48.0/20 1;
    103.21.244.0/22 1;
    # ...the rest of https://www.cloudflare.com/ips-v4 and ips-v6
}
```

```nginx
# /etc/nginx/conf.d/client-ip.conf
map $is_cloudflare $client_ip {
    1       $http_cf_connecting_ip;
    default $remote_addr;
}
```

Then in the app's location, use it for both headers:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $client_ip;
    proxy_set_header X-Forwarded-For $client_ip;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Two traps in my own config made this take longer than it should have:

- I had **two `X-Real-IP` lines**, one with `$remote_addr` and one with `$client_ip`. Delete the old one so there's no ambiguity about which wins.
- `X-Forwarded-For $proxy_add_x_forwarded_for` **appends `$remote_addr`**, which is Cloudflare's edge address. If your app reads that header, it keeps seeing Cloudflare no matter what `$client_ip` says.

The Cloudflare ranges change occasionally, so regenerate that file from Cloudflare's published lists every few months (a cron job works).

## The gatekeeper endpoint

Without an `ask` endpoint, anyone can point a domain at your IP and make Caddy burn through your Let's Encrypt rate limits. Caddy calls your backend before issuing:

```
GET /internal/domain-check?domain=clientdomain.com
```

- **`200 OK`:** your database recognizes the domain. Caddy gets the cert, caches it, and serves the request.
- **Anything else:** Caddy aborts the handshake.

Keep it to one indexed DB lookup, since it sits on the handshake path.

## Gotcha: ACME challenges and scanner noise

HTTP-01 needs port 80 to reach Caddy for the customer domain, which the `http` block from Bug 1 handles. If issuance fails, check first that the customer's DNS actually points at your server.

You may also see `tls-alpn challenge ... no information found to solve challenge for identifier:` in Caddy's logs every few days. Look at the `server_name` field: when it's empty, something connected with the ACME ALPN protocol but sent no hostname. Real validations carry the domain, so this is almost certainly a scanner, and Caddy is correctly refusing it.

## How I verified it

A page that loads proves nothing. I checked each path separately, from a machine other than the server:

```bash
curl -s ifconfig.me                                   # your public IP
curl -s https://timer.customer.com/ip                 # customer-domain path
curl -s https://app.example.com/ip                    # main-app path
```

Both `/ip` endpoints should print your public IP. (`ifconfig.me` can return IPv6 while the other returns IPv4, so force a family with `-4` or `-6` on both if they differ.)

Then a spoof test that bypasses Cloudflare, to confirm the header is only trusted from Cloudflare peers:

```bash
curl -s --resolve app.example.com:443:YOUR_SERVER_IP \
  -H 'CF-Connecting-IP: 1.2.3.4' https://app.example.com/ip
```

That should return your real address, not `1.2.3.4`. If it returns `1.2.3.4`, the `geo` check isn't working and anyone can fake their IP.

Last, issue a certificate for a domain that has never touched the server and read Caddy's log:

```bash
sudo journalctl -u caddy --since "5 min ago" --no-pager | grep -iE 'obtaining|obtained|error'
```

You want `obtaining new certificate` with the real client address in `remote_ip`, followed by `certificate obtained successfully`. (If journalctl prints "No entries" without `sudo`, that's a permissions issue, not an empty log.)

## What I'd tell past me

1. Prototype with Let's Encrypt **staging** to avoid rate limits while debugging.
2. Test with `curl --resolve` before touching real DNS.
3. Check `caddy version` first. PROXY protocol needs 2.7+, and distro packages are often older.
4. Treat `proxy_protocol` as a change to your _whole_ proxy chain, not one backend, and switch both sides together.
5. After editing `servers <address>` in Caddy, run `caddy adapt` and confirm the wrapper attached. `validate` passing doesn't prove it.
6. If you front your own domain with Cloudflare, don't expect PROXY protocol to give you the visitor's IP. Trust `CF-Connecting-IP` only for Cloudflare peers.
7. Check real client IPs in logs on day one, not after a week of bad analytics.
8. Add a per-domain issuance cap in your `ask` endpoint.
