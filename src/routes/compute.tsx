import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, Network, MonitorDown, Users, BookOpen, Github, Server, ShieldCheck, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { teamAddress } from "@/lib/team-address";

export const Route = createFileRoute("/compute")({
  head: () => ({ meta: [
    { title: "Distributed Compute — Get started" },
    { name: "description", content: "Connect your computer to a team for collaborative GPU training and benchmarks. Desktop setup, private team connections, and hosting guides." },
  ] }),
  component: Compute,
});

const REPO = "https://github.com/michaelkrymski/distributed-compute";
const STORAGE = "distributed-compute.recent-servers.v1";
function savedServers(): string[] {
  try {
    const values: unknown = JSON.parse(localStorage.getItem(STORAGE) ?? "[]");
    if (!Array.isArray(values)) return [];
    return [...new Set(values.filter((v): v is string => typeof v === "string").flatMap(v => {
      try { return [teamAddress(v)]; } catch { return []; }
    }))].slice(0, 6);
  } catch { return []; }
}

function Compute() {
  const [address, setAddress] = useState("");
  const [server, setServer] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const [recent, setRecent] = useState(savedServers);
  const [storageNotice, setStorageNotice] = useState("");
  function save(values: string[]) {
    setRecent(values);
    try { localStorage.setItem(STORAGE, JSON.stringify(values)); setStorageNotice(""); }
    catch { setStorageNotice("This browser cannot save addresses. You can still open your team dashboard."); }
  }
  function connect(event: FormEvent) {
    event.preventDefault(); setError(""); setServer("");
    try {
      const clean = teamAddress(address);
      setServer(clean);
      if (remember) save([clean, ...recent.filter(v => v !== clean)].slice(0, 6));
    } catch {
      setError("Enter your team's HTTPS server address, such as https://team.example.com. Leave out keys and sign-in details.");
    }
  }
  const outline = buttonVariants({ variant: "outline" });
  return <main className="min-h-screen bg-background text-foreground">
    <header className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-x-4 gap-y-5 px-6 py-6 font-mono text-sm md:grid-cols-[1fr_auto_1fr]">
      <Link to="/distributed-compute" className="col-start-1 row-start-1 inline-flex w-fit items-center gap-2 text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" aria-hidden="true" />Back to project</Link>
      <Link to="/compute" className="col-span-2 col-start-1 row-start-2 inline-flex items-center justify-self-center gap-3 md:col-span-1 md:col-start-2 md:row-start-1"><Network className="size-5 text-accent" aria-hidden="true" />distributed compute</Link>
      <nav aria-label="Platform" className="col-start-2 row-start-1 flex justify-self-end gap-6 text-muted-foreground md:col-start-3">
        <a href={`${REPO}/blob/main/desktop/README.md`} target="_blank" rel="noreferrer" className="hover:text-primary">docs ↗</a>
        <a href={REPO} target="_blank" rel="noreferrer" className="hover:text-primary">github ↗</a>
      </nav>
    </header>
    <section className="relative mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative">
        <p className="mb-5 font-mono text-xs text-accent">// your hardware. your team.</p>
        <h1 className="max-w-3xl font-display text-6xl leading-tight sm:text-8xl">Put your compute<br /><span className="italic text-primary">to work.</span></h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">Bring computers together for collaborative model training and benchmarks. Start with your machine, then connect to your team's workspace.</p>
        <div className="mt-7 flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
          {["Windows + Linux", "NVIDIA + AMD", "Open source · Apache-2.0"].map(label => <span key={label} className="rounded-full border border-border bg-card px-3 py-2">{label}</span>)}
        </div>
      </div>
    </section>
    <section aria-label="Get started" className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-2">
      <div className="flex flex-col rounded-lg border border-border bg-card p-6 sm:p-9">
        <p className="font-mono text-xs text-accent">01 / YOUR COMPUTER</p>
        <MonitorDown className="mb-6 mt-8 size-7 text-primary" aria-hidden="true" />
        <h2 className="font-display text-4xl">Start contributing.</h2>
        <p className="mb-7 mt-4 leading-relaxed text-muted-foreground">Install the desktop app to check your GPU, set up Tailscale, and join a benchmark or training session. Your browser is the control room; the local app contributes compute.</p>
        <a className={`${buttonVariants()} mt-auto w-fit gap-2`} href={`${REPO}/blob/main/desktop/README.md`} target="_blank" rel="noreferrer">Get the desktop app <ArrowUpRight className="size-4" aria-hidden="true" /></a>
        <a className="mt-5 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-primary" href={`${REPO}/blob/main/setup/QUICKSTART.md`} target="_blank" rel="noreferrer"><BookOpen className="size-4" aria-hidden="true" />Machine setup guide</a>
      </div>
      <div className="rounded-lg border border-accent/30 bg-card p-6 sm:p-9">
        <p className="font-mono text-xs text-accent">02 / YOUR TEAM</p>
        <Users className="mb-6 mt-8 size-7 text-accent" aria-hidden="true" />
        <h2 className="font-display text-4xl">Connect to your team.</h2>
        <p className="mb-6 mt-4 leading-relaxed text-muted-foreground">Ask your organizer for the team's server address. Open its dashboard, then sign in there with your member key or administrator account.</p>
        <form onSubmit={connect} className="space-y-4">
          <label htmlFor="team-address" className="block font-mono text-xs">Team server address</label>
          <input id="team-address" type="url" autoComplete="url" spellCheck={false} required value={address} onChange={e => { setAddress(e.target.value); setServer(""); setError(""); }} placeholder="https://team.example.com" aria-describedby="team-help team-error" aria-invalid={!!error} className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent" />
          <p id="team-help" className="text-xs leading-relaxed text-muted-foreground">Server address only. Keep your access key out of this field.</p>
          <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="accent-[var(--primary)]" />Remember this address on this device</label>
          <p id="team-error" role="alert" className="text-sm text-destructive">{error}</p>
          <button type="submit" className={`${outline} gap-2`}>Continue <ArrowUpRight className="size-4" aria-hidden="true" /></button>
        </form>
        {server && <div role="status" className="mt-6 rounded-md border border-accent/30 bg-background p-4">
          <p className="break-all font-mono text-xs text-accent">{new URL(server).hostname}</p>
          <p className="my-3 text-sm leading-relaxed text-muted-foreground">Check that this is your organizer's server before signing in. Team credentials are entered on that server, not here.</p>
          <a href={server} target="_blank" rel="noreferrer" className={`${buttonVariants()} gap-2`}>Open team dashboard <ArrowUpRight className="size-4" aria-hidden="true" /></a>
        </div>}
        {storageNotice && <p role="status" className="mt-3 text-xs text-muted-foreground">{storageNotice}</p>}
      </div>
      {recent.length > 0 && <div className="rounded-lg border border-border p-6 lg:col-span-2">
        <h2 className="font-mono text-sm">Recent connections</h2><p className="mt-2 text-xs text-muted-foreground">Addresses saved on this device. This is not a public directory or proof of team membership.</p>
        <ul className="mt-4 flex flex-wrap gap-3">{recent.map(url => <li key={url} className="flex max-w-full items-center gap-3 rounded-full border border-border bg-card py-2 pl-4 pr-2">
          <a href={url} target="_blank" rel="noreferrer" className="break-all font-mono text-xs hover:text-accent">{new URL(url).hostname} ↗</a>
          <button type="button" aria-label={`Forget ${new URL(url).hostname}`} onClick={() => save(recent.filter(v => v !== url))} className="rounded-full p-2 hover:bg-muted"><X className="size-3" aria-hidden="true" /></button>
        </li>)}</ul>
      </div>}
      <div className="flex flex-col justify-between gap-6 rounded-lg border border-border p-6 sm:flex-row sm:items-center sm:p-9 lg:col-span-2">
        <div className="max-w-xl"><Server className="mb-4 size-5 text-accent" aria-hidden="true" /><h2 className="font-display text-3xl">Organizing a new team?</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Follow the self-hosting guide to deploy a team server and manage member keys. Team creation currently requires setup; this page does not provision a backend automatically.</p></div>
        <a href={`${REPO}/blob/main/desktop/PROJECT-SETUP.md`} target="_blank" rel="noreferrer" className={`${outline} shrink-0 gap-2`}>Self-host a team <ArrowUpRight className="size-4" aria-hidden="true" /></a>
      </div>
    </section>
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 border-t border-border px-6 py-8 font-mono text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4" aria-hidden="true" />Team sign-in stays on your team's server.</span>
      <Link to="/distributed-compute" className="inline-flex items-center gap-2 hover:text-primary"><ArrowLeft className="size-3" aria-hidden="true" />About the project</Link>
      <a href={REPO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-primary"><Github className="size-4" aria-hidden="true" />Source code</a>
    </footer>
  </main>;
}
