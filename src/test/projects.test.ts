import { describe, expect, it } from "vitest";
import { featured, projects } from "@/lib/projects";

describe("Portfolio project selection", () => {
  it("shows the six selected projects and hides the six older projects", () => {
    expect(projects.map((project) => project.name)).toEqual([
      "BinViewer", "N55Maps", "distributed-compute", "CaneSight", "ParkPlus", "ProjectAnnenberg",
    ]);
  });
  it("opens distributed-compute on its dedicated page from both entry points", () => {
    expect(projects.find((project) => project.name === "distributed-compute")?.page).toBe("/distributed-compute");
    expect(featured.find((project) => project.repo === "distributed-compute")?.page).toBe("/distributed-compute");
  });
  it("keeps the other five projects linked to their GitHub source repositories", () => {
    const sourceProjects = projects.filter((project) => project.name !== "distributed-compute");
    expect(sourceProjects).toHaveLength(5);
    for (const project of sourceProjects) {
      expect(project.page).toBeUndefined();
      expect(project.url).toBe(`https://github.com/michaelkrymski/${project.name}`);
    }
  });
});