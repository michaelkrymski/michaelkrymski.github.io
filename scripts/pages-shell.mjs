// Builds the GitHub Pages artifact: a browser-only bundle of the same routes, plus one
// static HTML shell per route. The normal build renders on the server (nitro/cloudflare);
// this path skips the server entirely, so the shell is generated from the build manifest.
//
// Run after `vite build` with PAGES_STATIC=1:
//   PAGES_STATIC=1 PAGES_BASE=/repo/ bunx vite build && node scripts/pages-shell.mjs
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const clientDir = path.join(root, "dist", "client");
const base = process.env.PAGES_BASE ?? "/";

// Every route that must answer with a 200. Add a page here when a route is added.
const ROUTES = [
  {
    path: "/",
    file: "index.html",
    title: "Michael Krymski — Portfolio",
    description: "Systems development and engineering projects by Michael Krymski.",
  },
  {
    path: "/distributed-compute",
    file: "distributed-compute/index.html",
    title: "Distributed Compute — Michael Krymski",
    description:
      "Train machine learning models by splitting GPU work across the internet, on NVIDIA and AMD hardware.",
  },
];

const manifest = JSON.parse(
  await readFile(path.join(clientDir, ".vite", "manifest.json"), "utf8"),
);

const entry = Object.values(manifest).find((chunk) => chunk.isEntry);
if (!entry?.file) {
  throw new Error("pages-shell: no entry chunk in .vite/manifest.json");
}
const cssChunk = Object.values(manifest).find((chunk) => chunk.file?.endsWith(".css"));

const withBase = (file) => {
  const clean = file.replace(/^\.\//, "").replace(/^\//, "");
  return base === "/" ? `/${clean}` : `${base.replace(/\/$/, "")}/${clean}`;
};

const shell = ({ title, description }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="Michael Krymski" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&family=Manrope:wght@400;500;700&display=swap"
    />
    ${cssChunk ? `<link rel="stylesheet" href="${withBase(cssChunk.file)}" />` : ""}
    <link rel="icon" href="${withBase("favicon.ico")}" type="image/x-icon" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="${withBase(entry.file)}"></script>
  </body>
</html>
`;

for (const route of ROUTES) {
  const target = path.join(clientDir, route.file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, shell(route), "utf8");
  console.log(`pages-shell: wrote ${route.file}`);
}

// Unknown paths: serve the shell so the router can render the right page.
await writeFile(path.join(clientDir, "404.html"), shell(ROUTES[0]), "utf8");
console.log("pages-shell: wrote 404.html");

// GitHub Pages runs Jekyll unless this file exists.
await writeFile(path.join(clientDir, ".nojekyll"), "", "utf8");
console.log("pages-shell: wrote .nojekyll");
