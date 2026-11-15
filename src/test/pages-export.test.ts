import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const shellScript = readFileSync(path.join(process.cwd(), "scripts", "pages-shell.mjs"), "utf8");

const routePaths = readdirSync(path.join(process.cwd(), "src", "routes"))
  .filter((file) => file.endsWith(".tsx") && file !== "__root.tsx")
  .map((file) => (file === "index.tsx" ? "/" : `/${file.replace(/\.tsx$/, "")}`));

describe("GitHub Pages static export", () => {
  it("writes one HTML shell for every route the app declares", () => {
    for (const routePath of routePaths) {
      expect(shellScript).toContain(`path: "${routePath}"`);
    }
  });

  it("serves unknown paths from the shell and keeps Jekyll out of the artifact", () => {
    expect(shellScript).toContain("404.html");
    expect(shellScript).toContain(".nojekyll");
  });
});
