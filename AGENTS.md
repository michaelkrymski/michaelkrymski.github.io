<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Keep interest links in separate normal-flow lanes above and below the reserved headline area so floating animations cannot cover its text.
- Store optional internal project destinations alongside repository URLs; use TanStack Links for project pages and external anchors for source code so both interest links and cards share the same destination.
- Publish to GitHub Pages with the `PAGES_STATIC=1` build (browser-only bundle, no server) plus `scripts/pages-shell.mjs`, which writes one HTML shell per route: the server-rendered nitro build only runs inside Lovable's own build environment, so static hosting needs this path. Keep the script's route list in sync with `src/routes`, and let vite's base (`PAGES_BASE`) be the single source of the site's prefix so links and assets never disagree.
- The root shell renders the full HTML document. Keep the static React root mounted on `document`, not a div inside body: the latter causes React's document singletons to form an event-traversal loop when an input receives focus. Verify real input focus/typing after changing the static entry or root shell.
