// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// PAGES_STATIC=1 switches to the GitHub Pages export: a browser-only bundle plus static HTML
// shells written by scripts/pages-shell.mjs. Without it the app builds for Lovable hosting
// (server rendering on Cloudflare) exactly as before.
const pagesStatic = process.env["PAGES_STATIC"] === "1";
const pagesBase = process.env["PAGES_BASE"] ?? "/";

export default defineConfig(
  pagesStatic
    ? {
        nitro: false,
        tanstackStart: {
          server: { entry: "server" },
          client: { entry: "./pages-entry" },
        },
        vite: {
          base: pagesBase,
          build: { manifest: true },
        },
      }
    : {
        tanstackStart: {
          // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
          // nitro/vite builds from this
          server: { entry: "server" },
        },
      },
);
