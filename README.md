# Michael Krymski — Portfolio

Live at https://michaelkrymski.me. This is the publishing repository for the portfolio, originally built with [Lovable](https://lovable.dev). See [HOSTING.md](HOSTING.md) for deployment and [PORTFOLIO_SOURCE.md](PORTFOLIO_SOURCE.md) for syncing later Lovable edits.

The dedicated [/distributed-compute](https://michaelkrymski.me/distributed-compute) project page opens the existing dashboard, desktop setup and source code.

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Publish to GitHub Pages

The site builds to plain static files, so GitHub Pages can host it.

1. Connect this project to a GitHub repository (Project settings → Git in Lovable), then
   set the repository's Pages source to **GitHub Actions**: Settings → Pages →
   Build and deployment → Source: GitHub Actions.
2. Push to the default branch. The `Deploy to GitHub Pages` workflow builds the export and
   publishes it.

The workflow derives the base path from the repository name: a `michaelkrymski.github.io`
repository publishes at the root, any other repository publishes under `/<repo>/`. To build
the same export locally:

```sh
PAGES_STATIC=1 PAGES_BASE=/repo-name/ bunx vite build
node scripts/pages-shell.mjs
```

`dist/client` is what gets uploaded. `scripts/pages-shell.mjs` writes one HTML page per route
plus `404.html`, so deep links resolve without a server.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
