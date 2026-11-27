import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
export function SplitText({ text, className = '' }: { text: string; className?: string }) {
  return <span className={className} aria-label={text}>{text.split(' ').map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]" aria-hidden>
      <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.9 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span></span>))}</span>
}
export function Magnetic({ children, href, className = '', ...rest }: { children: ReactNode; href: string; className?: string; [k: string]: unknown }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 }), y = useSpring(0, { stiffness: 200, damping: 15 })
  return <motion.a ref={ref} href={href} style={{ x, y }} className={className} {...rest}
    onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3) }}
    onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.a>
}
export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 300, damping: 28 }), sy = useSpring(y, { stiffness: 300, damping: 28 })
  useEffect(() => { const m = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }; window.addEventListener('mousemove', m); return () => window.removeEventListener('mousemove', m) }, [x, y])
  return <>
    <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/60 mix-blend-difference [@media(pointer:fine)]:block" />
    <motion.div style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan [@media(pointer:fine)]:block" />
  </>
}
export function SectionTitle({ k, title }: { k: string; title: string }) {
  return <Reveal className="mb-12"><p className="font-mono text-sm text-cyan">{k}</p><h2 className="mt-2 font-display text-4xl font-bold text-white md:text-6xl">{title}</h2></Reveal>
}
