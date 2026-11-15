# Personal website hosting

The portfolio is published at https://michaelkrymski.me using GitHub Pages.
Source is in this repository; the original Lovable repo remains intact. See
PORTFOLIO_SOURCE.md for its source revision and future synchronization.

## Publish changes

Push to main. The deploy-pages.yml workflow installs the locked dependencies,
runs the tests, builds the PAGES_STATIC=1 export with PAGES_BASE=/, writes HTML
shells for direct route access, and deploys dist/client. The CNAME is retained
in the published artifact. Settings > Pages > Source must be GitHub Actions.
Do not push generated dist files. This is a static site; it holds no team keys
or training database. /distributed-compute introduces the project; /compute is the neutral product entry. Team addresses are entered by visitors and optionally stored only on their device. Keys and sign-in stay on the selected team server.

## Local checks

```sh
bun install --frozen-lockfile
bun run test
PAGES_STATIC=1 PAGES_BASE=/ bunx vite build
PAGES_BASE=/ node scripts/pages-shell.mjs
```

On PowerShell, set `$env:PAGES_STATIC='1'; $env:PAGES_BASE='/'` before the build.
For preview, serve dist/client with any static HTTP server.

## DNS

Keep the four apex A records at Namecheap:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | michaelkrymski.github.io |

Leave mail records untouched. HTTPS is enforced in Pages settings. Domain
ownership verification is available at https://github.com/settings/pages;
use GitHub's exact TXT record and retain it after verification.

[Pages settings](https://github.com/michaelkrymski/michaelkrymski.github.io/settings/pages)

## Product entry and future subdomain

The live entry URL is https://michaelkrymski.me/compute. It is not an embedded
team dashboard, team directory, global account service, or automatic team
provisioner. Existing team servers remain independent. The hosting guide linked
from the entry page documents the current manual deployment process.

compute.michaelkrymski.me is not configured yet. A separate hostname needs its
own hosting/domain mapping and DNS record. GitHub Pages supports one custom
domain per repository; simply pointing that hostname at the existing personal
Pages site does not map it to /compute. Keep the working /compute URL until a
separate product deployment is configured and its HTTPS certificate is ready.
