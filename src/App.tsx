import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Cursor } from './components/ui'
import { Loader, Nav, Hero, About, Skills, Projects, OpenSource, Experience, Contact } from './components/Sections'

export default function App() {
  const [loading, setLoading] = useState(true)
  return <>
    <AnimatePresence>{loading && <Loader done={() => setLoading(false)} />}</AnimatePresence>
    <Cursor /><Nav />
    <main><Hero /><About /><Skills /><Projects /><OpenSource /><Experience /><Contact /></main>
  </>
}
