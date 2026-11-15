import { describe, expect, it } from "vitest";
import { teamAddress } from "@/lib/team-address";

describe("Private team links", () => {
  it("normalizes an HTTPS server origin", () => {
    expect(teamAddress(" https://TEAM.example.com/ ")).toBe("https://team.example.com");
  });
  it.each([
    "http://team.example.com", "javascript:alert(1)", "not a URL",
    "https://user:secret@team.example.com", "https://team.example.com/?key=secret",
    "https://team.example.com/#token", "https://team.example.com/sign-in",
  ])("rejects insecure addresses and embedded credentials: %s", value => {
    expect(() => teamAddress(value)).toThrow();
  });
});
