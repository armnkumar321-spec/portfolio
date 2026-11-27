import { lazy, Suspense, useEffect, useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin } from './icons'
import { ArrowUpRight, Mail, FileDown, Menu, X, Check, AlertCircle, GitMerge, Code2 } from 'lucide-react'
import { Reveal, SplitText, Magnetic, SectionTitle } from './ui'
import { links, skills, projects, mergedPRs, timeline, achievements, GITHUB_USER, type Category } from '../data/content'

const Scene = lazy(() => import('./Scene'))
const SkillOrb = lazy(() => import('./SkillOrb'))

function useLowPower() {
  return useMemo(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4 || window.innerWidth < 768
    let gl = true; try { gl = !!document.createElement('canvas').getContext('webgl2') } catch { gl = false }
    return { reduced, low: weak, noGL: !gl || reduced }
  }, [])
}

export function Loader({ done }: { done: () => void }) {
  useEffect(() => { const t = setTimeout(done, 1400); return () => clearTimeout(t) }, [done])
  return <motion.div className="fixed inset-0 z-[200] grid place-items-center bg-ink" exit={{ opacity: 0, transition: { duration: 0.6 } }}>
    <div className="text-center"><motion.p className="font-display text-5xl font-bold grad" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>AK</motion.p>
      <div className="mt-6 h-px w-40 overflow-hidden bg-white/10"><motion.div className="h-full bg-gradient-to-r from-cyan to-violet" initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 1.2 }} /></div></div>
  </motion.div>
}

const nav = ['About', 'Skills', 'Projects', 'Open Source', 'Experience', 'Contact']
const id = (s: string) => s.toLowerCase().replace(/\s/g, '-')

export function Nav() {
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false)
  useEffect(() => { const f = () => setScrolled(scrollY > 40); addEventListener('scroll', f); return () => removeEventListener('scroll', f) }, [])
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'py-3' : 'py-6'}`}>
    <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3 ${scrolled ? 'glass' : ''}`} aria-label="Main">
      <a href="#top" className="font-display text-xl font-bold grad">AK</a>
      <ul className="hidden gap-8 text-sm text-slate-300 md:flex">{nav.map((n) => <li key={n}><a className="transition hover:text-cyan" href={`#${id(n)}`}>{n}</a></li>)}</ul>
      <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </nav>
    <AnimatePresence>{open && <motion.ul initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass mx-4 mt-2 rounded-2xl p-6 md:hidden">
      {nav.map((n) => <li key={n}><a onClick={() => setOpen(false)} className="block py-3 font-display text-2xl" href={`#${id(n)}`}>{n}</a></li>)}</motion.ul>}</AnimatePresence>
  </header>
}

export function Hero() {
  const { low, noGL } = useLowPower()
  return <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
    <div className="absolute inset-0" aria-hidden>{noGL
      ? <div className="h-full w-full bg-[radial-gradient(circle_at_70%_40%,rgba(139,92,246,.35),transparent_50%),radial-gradient(circle_at_30%_70%,rgba(34,211,238,.2),transparent_50%)]" />
      : <Suspense fallback={null}><Scene low={low} /></Suspense>}</div>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />
    <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="font-mono text-sm text-cyan">Hi, I'm Aman Kumar —</motion.p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[1.05] text-white md:text-8xl"><SplitText text="Building Intelligent" /><br /><SplitText text="Systems Through" /> <SplitText className="grad" text="Code." /></h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-6 max-w-xl text-lg text-slate-400">CSE (AI & ML) student · Full Stack Developer · Open Source Contributor · Future AI Researcher</motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }} className="mt-10 flex flex-wrap items-center gap-4">
        <Magnetic href="#projects" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-7 py-3.5 font-medium text-ink">Explore My Work <ArrowUpRight size={18} /></Magnetic>
        <Magnetic href={links.resume} download className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-white">Download Resume <FileDown size={18} /></Magnetic>
        <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass rounded-full p-3.5 hover:text-cyan"><Github size={20} /></a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass rounded-full p-3.5 hover:text-cyan"><Linkedin size={20} /></a>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400"><span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="h-2 w-2 rounded-full bg-emerald-400" /></span>Open to SWE & AI/ML internships</motion.p>
    </div>
  </section>
}

export function About() {
  return <section id="about" className="mx-auto max-w-6xl px-6 py-32">
    <SectionTitle k="01 / About" title="Curious by default." />
    <div className="grid gap-10 md:grid-cols-5">
      <Reveal className="space-y-5 text-lg leading-relaxed text-slate-300 md:col-span-3">
        <p>I'm a B.Tech Computer Science (AI & ML) student at MIRAI School of Technology, graduating in 2029. What started with C++ and competitive programming turned into a fascination with how software can <span className="text-white">reason, retrieve and help people</span>.</p>
        <p>Today I build across the stack — React front ends, Node/Express APIs, MongoDB and SQL databases — and increasingly at the AI layer: embeddings, vector databases and retrieval-augmented generation with LangChain.</p>
        <p>I contribute to open source projects like Hiero, Backstage and Perses, serve as my class representative, and help lead my college's cultural committee. Long term, I want to do research and build AI systems that make a real difference.</p>
      </Reveal>
      <Reveal delay={0.2} className="md:col-span-2"><div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl">
        {[['2029', 'Graduation'], ['AI & ML', 'Specialisation'], ['4', 'Merged upstream PRs'], ['330+', 'DSA problems solved']].map(([a, b]) =>
          <div key={b} className="bg-ink/60 p-6"><p className="font-display text-3xl font-bold grad">{a}</p><p className="mt-1 text-sm text-slate-400">{b}</p></div>)}
      </div></Reveal>
    </div>
  </section>
}

export function Skills() {
  const { noGL } = useLowPower()
  return <section id="skills" className="mx-auto max-w-6xl px-6 py-32">
    <SectionTitle k="02 / Skills" title="The toolkit." />
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="h-[420px]" aria-hidden>{!noGL && <Suspense fallback={null}><SkillOrb /></Suspense>}</div>
      <div className="grid gap-4 sm:grid-cols-2">{Object.entries(skills).map(([cat, list], i) => (
        <Reveal key={cat} delay={i * 0.05}><motion.div whileHover={{ y: -6, rotateX: 4, rotateY: -4 }} className="glass h-full rounded-2xl p-5 [transform-style:preserve-3d]">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">{cat}</p>
          <div className="mt-3 flex flex-wrap gap-2">{list.map((s) => <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200">{s}</span>)}</div>
        </motion.div></Reveal>))}</div>
    </div>
  </section>
}

function TiltCard({ p }: { p: (typeof projects)[number] }) {
  const [r, setR] = useState({ x: 0, y: 0 })
  return <motion.article layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
    onMouseMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); setR({ x: ((e.clientY - b.top) / b.height - 0.5) * -10, y: ((e.clientX - b.left) / b.width - 0.5) * 10 }) }}
    onMouseLeave={() => setR({ x: 0, y: 0 })} style={{ transform: `perspective(900px) rotateX(${r.x}deg) rotateY(${r.y}deg)` }}
    className="glass group relative flex flex-col overflow-hidden rounded-3xl transition-transform duration-200">
    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-violet/30 via-ink to-cyan/20">
      <div className="absolute inset-0 grid place-items-center font-display text-6xl font-bold text-white/10 transition duration-500 group-hover:scale-110">{p.name.split(' ').map((w) => w[0]).join('').slice(0, 3)}</div>
      <div className="absolute left-4 top-4 flex gap-2">{p.cat.map((c) => <span key={c} className="rounded-full bg-ink/70 px-3 py-1 font-mono text-[11px] text-cyan">{c}</span>)}</div>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <h3 className="font-display text-2xl font-bold text-white">{p.name}</h3>
      <p className="mt-2 flex-1 text-slate-400">{p.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="font-mono text-xs text-slate-300">#{t}</span>)}</div>
      <div className="mt-6 flex gap-3">
        {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm hover:border-cyan hover:text-cyan"><Github size={15} /> Code</a>}
        {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm text-ink hover:bg-cyan">Live <ArrowUpRight size={15} /></a>}
      </div>
    </div>
  </motion.article>
}

export function Projects() {
  const cats: ('All' | Category)[] = ['All', 'AI/ML', 'Full Stack', 'Web Development']
  const [f, setF] = useState<(typeof cats)[number]>('All')
  const list = f === 'All' ? projects : projects.filter((p) => p.cat.includes(f as Category))
  return <section id="projects" className="mx-auto max-w-6xl px-6 py-32">
    <SectionTitle k="03 / Projects" title="Things I've built." />
    <div className="mb-10 flex flex-wrap gap-2" role="tablist">{cats.map((c) => <button key={c} role="tab" aria-selected={f === c} onClick={() => setF(c)}
      className={`relative rounded-full px-5 py-2 text-sm transition ${f === c ? 'text-ink' : 'text-slate-300 hover:text-white'}`}>
      {f === c && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan to-violet" />}<span className="relative">{c}</span></button>)}</div>
    <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><AnimatePresence mode="popLayout">{list.map((p) => <TiltCard key={p.name} p={p} />)}</AnimatePresence></motion.div>
  </section>
}

type GH = { public_repos: number; followers: number; avatar_url: string }
export function OpenSource() {
  const [u, setU] = useState<GH | null>(null)
  useEffect(() => { fetch(`https://api.github.com/users/${GITHUB_USER}`).then((r) => r.ok ? r.json() : null).then(setU).catch(() => {}) }, [])
  const orgs = [...new Set(mergedPRs.map((p) => p.repo.split('/')[0]))]
  return <section id="open-source" className="mx-auto max-w-6xl px-6 py-32">
    <SectionTitle k="04 / Open Source" title="Shipping upstream." />
    <div className="grid gap-6 lg:grid-cols-3">
      <Reveal className="glass rounded-3xl p-6">
        <div className="flex items-center gap-4">{u && <img src={u.avatar_url} alt="Aman's GitHub avatar" width={56} height={56} className="rounded-full" loading="lazy" />}
          <div><p className="font-display text-xl font-bold text-white">@{GITHUB_USER}</p><a href={links.github} target="_blank" rel="noreferrer" className="text-sm text-cyan">View profile →</a></div></div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[[u?.public_repos ?? '—', 'Repos'], [mergedPRs.length, 'Merged PRs'], [orgs.length, 'Orgs']].map(([a, b]) => <div key={b as string} className="rounded-2xl bg-white/5 p-3"><p className="font-display text-2xl font-bold grad">{a}</p><p className="text-xs text-slate-400">{b}</p></div>)}</div>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-slate-500">Organisations</p>
        <div className="mt-2 flex flex-wrap gap-2">{orgs.map((o) => <a key={o} href={`https://github.com/${o}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-1 text-sm hover:border-cyan">{o}</a>)}</div>
      </Reveal>
      <Reveal delay={0.1} className="space-y-3 lg:col-span-2">{mergedPRs.map((p) => (
        <a key={p.url} href={p.url} target="_blank" rel="noreferrer" className="glass group flex items-start gap-4 rounded-2xl p-5 transition hover:border-violet/50">
          <GitMerge className="mt-1 shrink-0 text-violet" size={20} /><div className="flex-1"><p className="text-white group-hover:text-cyan">{p.title}</p><p className="mt-1 font-mono text-xs text-slate-500">{p.repo}</p></div><ArrowUpRight className="text-slate-500" size={18} /></a>))}</Reveal>
    </div>
    <Reveal delay={0.2} className="glass mt-6 overflow-x-auto rounded-3xl p-6">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500">Contribution graph</p>
      <img src={`https://ghchart.rshah.org/8b5cf6/${GITHUB_USER}`} alt="GitHub contribution graph" loading="lazy" onError={(e) => { e.currentTarget.parentElement!.style.display = "none" }} className="min-w-[700px] w-full opacity-90 invert-[.9] hue-rotate-180" />
    </Reveal>
  </section>
}

export function Experience() {
  return <section id="experience" className="mx-auto max-w-6xl px-6 py-32">
    <SectionTitle k="05 / Experience & Leadership" title="Leading, building, learning." />
    <div className="relative ml-3 border-l border-white/10">{timeline.map((t, i) => (
      <Reveal key={t.title} delay={i * 0.08} className="relative mb-12 pl-10">
        <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-gradient-to-r from-cyan to-violet shadow-[0_0_20px_#22d3ee]" />
        <p className="font-mono text-xs text-cyan">{t.time}</p><h3 className="mt-1 font-display text-2xl font-bold text-white">{t.title}</h3><p className="text-slate-400">{t.org}</p><p className="mt-2 max-w-xl text-slate-300">{t.text}</p>
      </Reveal>))}</div>
    <SectionTitle k="06 / Achievements" title="Milestones." />
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">{achievements.map((a, i) => (
      <Reveal key={a.label} delay={i * 0.05}><motion.div whileHover={{ scale: 1.03 }} className="glass rounded-3xl p-6"><p className="font-display text-3xl font-bold grad md:text-4xl">{a.big}</p><p className="mt-2 text-slate-400">{a.label}</p></motion.div></Reveal>))}</div>
    <Reveal className="mt-6 flex gap-3"><a href={links.leetcode} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm hover:text-cyan"><Code2 size={16} />LeetCode</a><a href={links.codeforces} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm hover:text-cyan"><Code2 size={16} />Codeforces</a></Reveal>
  </section>
}

export function Contact() {
  const [s, setS] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle'), [errs, setErrs] = useState<Record<string, string>>({})
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const fd = new FormData(e.currentTarget); const d = Object.fromEntries(fd) as Record<string, string>; const er: Record<string, string> = {}
    if (d.name.trim().length < 2) er.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) er.email = 'Please enter a valid email'
    if (d.message.trim().length < 10) er.message = 'Message should be at least 10 characters'
    setErrs(er); if (Object.keys(er).length) return
    const key = import.meta.env.VITE_WEB3FORMS_KEY
    setS('sending')
    try {
      if (!key) throw new Error('no key')
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...d, access_key: key }) })
      if (!r.ok) throw new Error(); setS('ok'); e.currentTarget?.reset()
    } catch { setS('err') }
  }
  const field = 'w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan'
  return <section id="contact" className="mx-auto max-w-6xl px-6 py-32">
    <SectionTitle k="07 / Contact" title="Let's build something." />
    <div className="grid gap-10 md:grid-cols-2">
      <Reveal className="space-y-4 text-slate-300"><p className="text-lg">Looking for an intern who ships? Have an open source idea? My inbox is open.</p>
        {links.email && <a href={`mailto:${links.email}`} className="flex items-center gap-3 hover:text-cyan"><Mail size={18} />{links.email}</a>}
        <a href={links.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-cyan"><Github size={18} />github.com/{GITHUB_USER}</a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-cyan"><Linkedin size={18} />LinkedIn</a></Reveal>
      <Reveal delay={0.1}><form onSubmit={submit} noValidate className="space-y-4">
        {(['name', 'email', 'message'] as const).map((n) => <div key={n}>
          <label htmlFor={n} className="sr-only">{n}</label>
          {n === 'message' ? <textarea id={n} name={n} rows={5} placeholder="Your message" className={field} aria-invalid={!!errs[n]} />
            : <input id={n} name={n} type={n === 'email' ? 'email' : 'text'} placeholder={n === 'email' ? 'you@company.com' : 'Your name'} className={field} aria-invalid={!!errs[n]} />}
          {errs[n] && <p className="mt-1 text-sm text-rose-400">{errs[n]}</p>}</div>)}
        <button disabled={s === 'sending'} className="w-full rounded-full bg-gradient-to-r from-cyan to-violet py-4 font-medium text-ink disabled:opacity-60">{s === 'sending' ? 'Sending…' : 'Send message'}</button>
        <AnimatePresence>{(s === 'ok' || s === 'err') && <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
          className={`flex items-center gap-3 rounded-2xl p-4 ${s === 'ok' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`} role="status">
          {s === 'ok' ? <><Check /> Thanks! I'll get back to you soon.</> : <><AlertCircle /> Couldn't send right now — please reach me on LinkedIn.</>}</motion.div>}</AnimatePresence>
      </form></Reveal>
    </div>
    <footer className="mt-32 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row"><p>© {new Date().getFullYear()} Aman Kumar</p><p className="font-mono">Built with React · Three.js · Framer Motion</p></footer>
  </section>
}

export function NotFound() {
  return <main className="grid min-h-svh place-items-center px-6 text-center"><div><p className="font-display text-[10rem] font-bold leading-none grad">404</p><p className="mt-4 text-slate-400">This page drifted into the void.</p><a href="/" className="mt-8 inline-block rounded-full bg-gradient-to-r from-cyan to-violet px-6 py-3 text-ink">Back home</a></div></main>
}
