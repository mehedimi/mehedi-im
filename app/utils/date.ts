export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Count words in a Nuxt Content body. Handles both the classic AST
 * (`{ type: "text", value }` / `children`) and the minified "minimark"
 * format (`{ type: "minimark", value: [tag, props, ...children] }`).
 */
function countWords(node: unknown): number {
  if (node == null) return 0;
  if (typeof node === "string") {
    return node.split(/\s+/).filter(Boolean).length;
  }
  if (Array.isArray(node)) {
    return node.reduce((sum, child) => sum + countWords(child), 0);
  }
  if (typeof node === "object") {
    return countWords((node as { value?: unknown }).value);
  }
  return 0;
}

/** Estimate reading time in minutes from a Nuxt Content body AST. */
export function readingTime(body: unknown): number | null {
  const words = countWords(body);
  if (!words) return null;
  return Math.max(1, Math.round(words / 220));
}
