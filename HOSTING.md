# Personal website hosting

GitHub Pages publishes this repository's `main` branch, from the root folder.
Custom domain: https://michaelkrymski.me . No application backend is hosted here.

## Publishing your frontend

Place a static `index.html` and its assets in the repository root, then push to
`main`. GitHub Pages deploys automatically. Keep `CNAME` at the root with the
single line `michaelkrymski.me`. For a plain HTML/CSS/JS site, add an empty
`.nojekyll` file when you add `index.html`. No build workflow is needed for that.

For a framework, build static files first; do not publish server code or secrets.
If you prefer building from source with GitHub Actions, switch Settings > Pages >
Source to GitHub Actions and use that framework's static-export deployment
workflow. The frontend framework has deliberately not been selected for you.

## Domain records (Namecheap > Domain List > Manage > Advanced DNS)

The four apex A records already pointed to GitHub Pages when checked on
2026-11-15. Preserve those records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | michaelkrymski.github.io |

Change the existing `www` CNAME from `michaelkrymski.me` to
`michaelkrymski.github.io` (no scheme or path). Leave mail records untouched.
GitHub redirects the www variant to the apex when both records are correct.

Verify ownership in GitHub account Settings > Pages > Add a domain. GitHub gives
you a unique TXT record: add that exact record in Namecheap, then click Verify.
Keep the TXT record afterward. Its value cannot be guessed or supplied in a
public guide. Once GitHub issues a certificate, enable Enforce HTTPS in this
repository's Settings > Pages if it is not already enabled.

## Useful links

- [Repository Pages settings](https://github.com/michaelkrymski/michaelkrymski.github.io/settings/pages)
- [Account domain verification](https://github.com/settings/pages)
- [GitHub custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

The repository originally pointed to `mkrdesign.me`; the custom domain has been
changed to `michaelkrymski.me`. This does not change registration or DNS for the
old domain. Frontend files remain yours to update.
