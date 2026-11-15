// The root route's shell owns <html>, <head>, and <body>, so it must mount at
// document level. Mounting that shell inside #app makes React's singleton body
// point outside its root and can loop forever when an input receives focus.
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

const router = getRouter();

createRoot(document).render(<RouterProvider router={router} />);
