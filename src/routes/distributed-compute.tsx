import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, Cpu, Network, Activity, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/distributed-compute")({
  head: () => ({
    meta: [
      { title: "distributed-compute — Michael Krymski" },
      { name: "description", content: "Michael Krymski’s distributed-compute project: collaborative machine-learning training across NVIDIA and AMD GPUs." },
      { property: "og:title", content: "distributed-compute — Michael Krymski" },
      { property: "og:description", content: "Project overview and source code for collaborative GPU training across multiple computers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DistributedCompute,
});

function DistributedCompute() {
  const project = projects.find((item) => item.name === "distributed-compute");
  if (!project) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6 font-mono text-sm">
        <Link to="/" className="hover:text-primary">michael.krymski</Link>
        <Link to="/" hash="projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" /> projects
        </Link>
      </header>
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-24">
        <p className="mb-6 font-mono text-sm text-accent">#distributed compute</p>
        <h1 className="break-words font-display text-5xl leading-tight sm:text-7xl">distributed-compute</h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed">{project.description}</p>
        <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">{project.detail}</p>
        <p className="mt-8 max-w-3xl font-mono text-xs leading-relaxed text-accent">{project.language}</p>
        <div className="mt-10 flex flex-wrap gap-3">
        <a href="https://gatorllm-team-2-lab.netlify.app" target="_blank" rel="noreferrer" className={`${buttonVariants()} gap-2`}>
          Open dashboard <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        <a href={`${project.url}/blob/main/desktop/README.md`} target="_blank" rel="noreferrer" className={`${buttonVariants({ variant: "outline" })} gap-2`}>
          <Download className="size-4" aria-hidden="true" /> Desktop setup
        </a>
        <a href={project.url} target="_blank" rel="noreferrer" className={`${buttonVariants({ variant: "outline" })} gap-2`}>
          <Github className="size-4" aria-hidden="true" /> Source code <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">The dashboard opens the existing team service. A team key or administrator account is required for protected features. Contributing compute requires the desktop app or a locally launched worker.</p>
        <div className="mt-20 grid gap-6 border-t border-border pt-10 md:grid-cols-3">
          {[
            { icon: Cpu, title: "Different GPUs. Shared work.", text: "NVIDIA CUDA and AMD ROCm workers contribute to collaborative PyTorch training across computers." },
            { icon: Network, title: "Connect your team.", text: "Guided machine setup, Tailscale connectivity, and secure team access help contributors join a shared session." },
            { icon: Activity, title: "Measure before training.", text: "Synchronized benchmarks report throughput and estimate training time for the configured model goal." },
          ].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-lg border border-border bg-card p-6">
            <Icon className="mb-5 size-5 text-accent" aria-hidden="true" />
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>)}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-5 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:p-8">
          <div><p className="font-mono text-xs text-accent">// open source · Apache-2.0</p><h2 className="mt-3 font-display text-3xl">Explore the implementation.</h2></div>
          <a href={`${project.url}/blob/main/training/BENCHMARK.md`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline">Read the benchmark guide <ArrowUpRight className="size-4" aria-hidden="true" /></a>
        </div>
      </section>
      <footer className="mx-auto max-w-6xl border-t border-border px-6 py-8 font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Michael Krymski
      </footer>
    </main>
  );
}
