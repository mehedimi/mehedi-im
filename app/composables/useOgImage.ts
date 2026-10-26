// OG images are rendered by OG Dynamic: one template per page type, filled
// with query params. encodeURIComponent over URLSearchParams so spaces become
// %20, which the renderer decodes reliably (unlike the '+' URLSearchParams
// would produce)
const PAGE_OG_IMAGE_ENDPOINT = "https://cdn.ogdynamic.com/c/01m5wkjfgsrpx2nnszthgr80bw";
const POST_OG_IMAGE_ENDPOINT = "https://cdn.ogdynamic.com/c/01m5wkjg709t2y8gvnsxr1ghfm";

type OgImageValue = string | (() => string);

function resolve(value: OgImageValue): string {
  return typeof value === "function" ? value() : value;
}

function buildImageUrl(
  endpoint: string,
  params: [string, string][],
  twitter: boolean,
): string {
  const pairs = params.map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
  if (twitter) pairs.push("config[intent]=twitter");
  return `${endpoint}?${pairs.join("&")}`;
}

export function useOgImage(
  label: OgImageValue,
  title: OgImageValue,
  subtitle: OgImageValue,
) {
  const build =
    (twitter: boolean) =>
    (): string =>
      buildImageUrl(
        PAGE_OG_IMAGE_ENDPOINT,
        [
          ["label", resolve(label)],
          ["title", resolve(title)],
          ["subtitle", resolve(subtitle)],
        ],
        twitter,
      );

  return { ogImage: build(false), twitterImage: build(true) };
}

export function usePostOgImage(title: OgImageValue, meta: OgImageValue) {
  const build =
    (twitter: boolean) =>
    (): string =>
      buildImageUrl(
        POST_OG_IMAGE_ENDPOINT,
        [
          ["title", resolve(title)],
          ["meta", resolve(meta)],
        ],
        twitter,
      );

  return { ogImage: build(false), twitterImage: build(true) };
}
