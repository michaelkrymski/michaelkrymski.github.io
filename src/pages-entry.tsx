// Client-only entry used by the GitHub Pages static build (see vite.config.ts).
// The normal app renders on the server; this entry renders the same router in the browser.
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

const router = getRouter();

createRoot(document.getElementById("app")!).render(<RouterProvider router={router} />);
