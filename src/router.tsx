import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// GitHub Pages project sites live under /<repo>/, so links need the same prefix the assets
// get. Vite exposes its configured base as BASE_URL, so one build setting covers both.
const injectedBase = import.meta.env.BASE_URL ?? "/";
const basepath = injectedBase !== "/" ? injectedBase.replace(/\/+$/, "") : undefined;

export const getRouter = () => {
  // One client per request: a module-level QueryClient leaks cached data between SSR requests.
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Lets Query own freshness; set caching defaults on the QueryClient, not the router.
    defaultPreloadStaleTime: 0,
    ...(basepath ? { basepath } : {}),
  });

  return router;
};
