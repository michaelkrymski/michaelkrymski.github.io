import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ComponentProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featured, projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Michael Krymski — I'm interested in…" },
      { name: "description", content: "Portfolio of Michael Krymski: car tuning tools, distributed GPU compute, and more." },
      { property: "og:title", content: "Michael Krymski — Portfolio" },
      { property: "og:description", content: "Car tuning tools, distributed GPU compute, and miscellaneous builds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const toneClass = {
  primary: "border-primary/40 text-primary shadow-[var(--glow-primary)] hover:bg-primary hover:text-primary-foreground",
  accent: "border-accent/40 text-accent shadow-[var(--glow-accent)] hover:bg-accent hover:text-accent-foreground",
  secondary: "border-secondary/40 text-secondary shadow-[var(--glow-secondary)] hover:bg-secondary hover:text-secondary-foreground",
};

const bubbles = [
  ...featured.map((project, index) => ({ ...project, anim: index === 0 ? "float-a" : "float-b" })),
  { label: "everything else", repo: "misc", url: "#projects", tone: "secondary" as const, anim: "float-c" },
];

function ProjectLink({ page, url, ...props }: Pick<ComponentProps<"a">, "children" | "className" | "onMouseEnter" | "onMouseLeave" | "onFocus" | "onBlur"> & { page?: "/distributed-compute" | undefined; url: string }) {
  if (page) return <Link to={page} {...props} />;
  return <a href={url} target={url.startsWith("#") ? undefined : "_blank"} rel="noreferrer" {...props} />;
}

function Index() {
  const [hover, setHover] = useState<string | null>(null);
  const tags = ["All", ...Array.from(new Set(projects.map((p) => p.tag)))];
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.tag === filter);
  const renderBubble = (b: (typeof bubbles)[number]) => (
    <ProjectLink
      key={b.label}
      url={b.url}
      page={"page" in b ? b.page : undefined}
      onMouseEnter={() => setHover(b.label)}
      onMouseLeave={() => setHover(null)}
      onFocus={() => setHover(b.label)}
      onBlur={() => setHover(null)}
      className={`${b.anim} relative z-20 inline-flex max-w-full flex-wrap justify-center gap-x-2 rounded-full border bg-card/70 px-5 py-3 text-center font-mono text-xs backdrop-blur transition-colors sm:text-sm ${toneClass[b.tone]}`}
    >
      <span>{b.label}</span>
      <span className="opacity-60">→ {b.repo}</span>
    </ProjectLink>
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 font-mono text-sm">
        <span>michael.krymski</span>
        <nav className="flex gap-6 text-muted-foreground">
          <a href="#projects" className="hover:text-foreground">projects</a>
          <a href="https://github.com/michaelkrymski" target="_blank" rel="noreferrer" className="hover:text-foreground">github ↗</a>
        </nav>
      </header>

      <section className="relative mx-auto flex min-h-[82svh] max-w-6xl flex-col justify-center gap-10 px-6 pb-12 pt-8 sm:gap-12">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="flex w-full justify-start pl-4 sm:pl-12">
          {bubbles.slice(0, 1).map(renderBubble)}
        </div>
        <div className="relative z-10 w-full">
          <p className="mb-4 font-mono text-sm text-muted-foreground">// hi, I'm Michael — systems developer</p>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-7xl md:text-8xl">
            I'm interested in{" "}
            <span className="block min-h-[3.15em] italic text-primary sm:min-h-[2.1em]">
              {hover ?? "___"}
            </span>
          </h1>
        </div>
        <div className="flex w-full flex-col items-center justify-end gap-10 sm:flex-row sm:gap-12">
          {bubbles.slice(1).map(renderBubble)}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24 pt-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl">Projects</h2>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {tags.map((t) => (
              <Button
                key={t}
                variant="outline"
                size="sm"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={`rounded-full border px-3 py-1.5 transition-colors ${filter === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {shown.map((p) => (
            <ProjectLink
              key={p.name}
              url={p.url}
              page={p.page}
              className="group flex flex-col gap-6 rounded-lg border border-border bg-card p-6 transition hover:border-primary/50 sm:p-10 lg:flex-row lg:gap-12"
            >
              <div className="flex shrink-0 flex-col items-start gap-4 lg:w-64">
                <span className={p.tag === "Misc" ? "text-secondary" : p.tag === "Car tuning" ? "text-primary" : "text-accent"}>#{p.tag.toLowerCase()}</span>
                <h3 className="text-2xl font-bold group-hover:text-primary">{p.title}</h3>
                <span className="font-mono text-xs leading-relaxed text-muted-foreground">{p.language}</span>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground group-hover:text-primary">
                  {p.page ? "Project page" : "Source code"}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </div>
              <div className="max-w-2xl">
                <p className="text-base leading-relaxed">{p.description}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
              </div>
            </ProjectLink>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Michael Krymski
      </footer>
    </main>
  );
}
