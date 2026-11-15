/** Team discovery never handles credentials: only clean HTTPS server addresses. */
export function teamAddress(value: string): string {
  const url = new URL(value.trim());
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("Enter the HTTPS server address without a key, path, or sign-in details.");
  }
  return url.origin;
}
