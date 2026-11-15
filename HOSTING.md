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
or training database. /distributed-compute introduces the project; /compute is the shared team/project control room. Account, membership, key hashes and coordination data live in the separate Worker/D1 service described below. Self-hosted server addresses can optionally be remembered on the visitor's device.

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

The live entry URL is https://michaelkrymski.me/compute. Its default API is
https://distributed-compute-platform.mkrymski.chatgpt.site. The service uses a
Cloudflare Worker and D1; its source, schema, deployment and recovery notes are
in the product repository's `platform/` directory. No per-team Netlify deployment
is necessary: accounts can create isolated teams and projects on this service.
Existing self-hosted team dashboards remain independent and are not migrated.

The first team creator becomes an administrator. Invitations add members;
administrators can change roles and regenerate/revoke project-scoped worker
keys. Plaintext keys appear only at issuance/rotation and are never committed.
Browser account sessions last 12 hours and use a bearer token in tab-scoped
sessionStorage, needed for this cross-origin static frontend. Passwords are
not stored in the browser. There is no email/password recovery flow yet; users
should save their passwords and keep another trusted team administrator.

For local API development only, set VITE_COMPUTE_API before building. Production
builds must leave it unset to use the service above. Runtime data, SQLite files,
fixture credentials, result files and generated deployment artifacts stay out
of source control. Public API addresses and source code are safe to publish.

compute.michaelkrymski.me is not configured yet. A separate hostname needs its
own hosting/domain mapping and DNS record. GitHub Pages supports one custom
domain per repository; simply pointing that hostname at the existing personal
Pages site does not map it to /compute. Keep the working /compute URL until a
separate product deployment is configured and its HTTPS certificate is ready.
