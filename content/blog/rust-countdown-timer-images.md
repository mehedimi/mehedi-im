---
title: Generating countdown timer images with Rust
description: How Countdown Builder renders millions of email countdown timers — a Rust image service, WASM in the browser, and caches everywhere.
date: 2026-10-05
tags:
  - Rust
  - WASM
  - Laravel
  - SaaS
---

Email clients are a hostile environment. No JavaScript, inconsistent CSS, and rendering engines that haven't changed in a decade. So when [Countdown Builder](https://countdownbuilder.com) needed live countdown timers inside emails, there was really only one option: generate them as images on the server, on every request.

## Why Rust

At peak, a single campaign send produces a thundering herd of image requests — every recipient opens within minutes of each other. PHP image generation under that load gets expensive fast. Rust gives us:

- Sub-millisecond rendering per image
- Predictable, flat memory usage
- A single small binary per worker

The core render loop is a straightforward "draw digits into a frame" job, and crates like `image` and `ab_glyph` do the heavy lifting:

```rust
pub fn render(&self, remaining: Duration) -> Result<Vec<u8>> {
    let mut buf = ImageBuffer::new(self.width, self.height);
    let digits = format_remaining(remaining, &self.format);

    // Draw panel background
    draw_panel(&mut buf, &self.theme)?;

    // Draw each digit block
    for (i, block) in digits.chunks(2).enumerate() {
        let x = self.block_origin(i);
        draw_block(&mut buf, x, block, &self.theme)?;
    }

    encode_png(buf)
}
```

The full timer — digits, labels, separators, theme colors — is assembled in one pass and encoded straight to PNG.

## One rendering path, two runtimes

The interesting part is that the _same_ rendering code powers the browser-based builder preview. Compiled to WebAssembly, the exact function that renders production images also renders the live preview as you tweak fonts and colors:

```txt
shared/render (Rust crate)
├── axum service  → server images  (email requests)
└── wasm-bindgen  → browser canvas (builder preview)
```

One implementation means the preview never drifts from what lands in the email. That single decision eliminated an entire category of "looks different in the campaign" bugs.

## Laravel in front, caches behind

The Laravel app owns everything user-facing: templates, scheduling, quotas. When an image request comes in, it computes the timer's expiry from the campaign timezone and proxies to the Rust service with a canonical cache key:

```php
public function show(Campaign $campaign, string $variant)
{
    $key = "timer:{$campaign->id}:{$variant}:".now()->floorMinute();

    return Cache::remember(
        $key,
        seconds_until_next_minute(),
        fn () => $this->timers->render($campaign, $variant),
    );
}
```

Images are cached to the minute, pushed to a CDN, and the origin only sees cold requests. The floor-to-minute granularity keeps images honest — a timer never shows a stale second — without turning every view into a render.

## The takeaway

You don't have to rewrite your product in Rust. Identify the one hot path with a strict latency budget, isolate it behind an HTTP boundary your main app can call, and keep everything else boring. For us that's Laravel for the product and ~800 lines of Rust for the pixels — each doing what it's best at.
