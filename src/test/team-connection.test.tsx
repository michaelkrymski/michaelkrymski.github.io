import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

// Only navigation is isolated. The rendered form, React events, URL validation,
// conditional dashboard link and local storage are the actual implementation.
vi.mock("@tanstack/react-router", async importOriginal => ({
  ...await importOriginal<typeof import("@tanstack/react-router")>(),
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));
import { Compute } from "@/routes/compute";

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("Team connection form", () => {
  it("accepts focus, typing and submission without losing the page", () => {
    render(<Compute />);
    const field = screen.getByLabelText("Team server address");
    field.focus();
    expect(field).toHaveFocus();
    fireEvent.change(field, { target: { value: "https://team.example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByRole("link", { name: "Open team dashboard" })).toHaveAttribute("href", "https://team.example.com");
    expect(screen.getByRole("heading", { name: "Connect to your team." })).toBeVisible();
    expect(localStorage.length).toBe(0);
  });

  it("still rejects credentials and insecure addresses with native validation disabled", () => {
    render(<Compute />);
    const field = screen.getByLabelText("Team server address");
    for (const value of ["", "http://team.example.com", "https://team.example.com?key=secret"]) {
      fireEvent.change(field, { target: { value } });
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));
      expect(screen.getByRole("alert")).toHaveTextContent("Leave out keys");
      expect(screen.queryByRole("link", { name: "Open team dashboard" })).not.toBeInTheDocument();
    }
  });

  it("only saves an address when requested and supports forgetting it", () => {
    render(<Compute />);
    fireEvent.change(screen.getByLabelText("Team server address"), { target: { value: "https://team.example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(JSON.parse(localStorage.getItem("distributed-compute.recent-servers.v1")!)).toEqual(["https://team.example.com"]);
    fireEvent.click(screen.getByRole("button", { name: "Forget team.example.com" }));
    expect(screen.queryByRole("heading", { name: "Recent connections" })).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("distributed-compute.recent-servers.v1")!)).toEqual([]);
  });
});
