export const GITHUB_USER = 'armnkumar321-spec'
export const links = {
  github: 'https://github.com/armnkumar321-spec',
  linkedin: 'https://www.linkedin.com/in/aman-kumar-843b2137b',
  leetcode: 'https://leetcode.com/u/AMANKUMAR0701',
  codeforces: 'https://codeforces.com/profile/amankumar0701',
  email: '', // TODO: add your professional email
  resume: '/resume.pdf', // TODO: drop resume.pdf into /public
}

export const skills: Record<string, string[]> = {
  Programming: ['C++', 'C', 'JavaScript', 'Python', 'Java'],
  Frontend: ['HTML', 'CSS', 'React', 'Vite'],
  Backend: ['Node.js', 'Express.js'],
  Database: ['MongoDB', 'MySQL', 'PostgreSQL'],
  'AI / ML': ['Pandas', 'Embeddings', 'RAG', 'Vector Databases', 'LangChain'],
  'Developer Tools': ['Git', 'GitHub', 'Docker', 'VS Code'],
}

export type Category = 'AI/ML' | 'Full Stack' | 'Web Development' | 'Open Source'
export interface Project { name: string; desc: string; tags: string[]; cat: Category[]; repo?: string; live?: string }
const gh = (r: string) => `https://github.com/${GITHUB_USER}/${r}`

// Descriptions are taken from repo metadata. Repos without a GitHub description are marked so — edit them in your own words.
export const projects: Project[] = [
  { name: 'HR Policy Assistant', desc: 'RAG assistant over HR policy PDFs that answers with citations and shows the source PDF pages side by side.', tags: ['Python', 'LangChain', 'ChromaDB', 'Streamlit', 'Gemini'], cat: ['AI/ML'], repo: gh('hr-policy-assistant') },
  { name: 'Doc-Chat', desc: 'Document intelligence app — chat with your documents.', tags: ['JavaScript'], cat: ['AI/ML', 'Web Development'], repo: gh('doc-chat'), live: 'https://doc-chat-mocha.vercel.app' },
  { name: 'Blood Bank Management System', desc: 'Web app for managing blood bank records.', tags: ['JavaScript'], cat: ['Full Stack'], repo: gh('Bloodbank'), live: 'https://bloodbank-mauve.vercel.app' },
  { name: 'StayNest', desc: 'MERN full stack stay-booking project.', tags: ['MongoDB', 'Express', 'React', 'Node.js'], cat: ['Full Stack'], repo: gh('staynest') },
  { name: 'TaskFlow', desc: 'Modern task management system — CRUD with client-side rendering and priority filtering.', tags: ['JavaScript'], cat: ['Web Development'], repo: gh('task-management-system'), live: 'https://task-management-system-iota-ashen.vercel.app' },
  { name: 'PawPedia', desc: 'Web project deployed on Vercel.', tags: ['JavaScript'], cat: ['Web Development'], repo: gh('pawpedia'), live: 'https://pawpedia-five.vercel.app' },
  { name: 'Qwitter', desc: 'Python-themed social feed web project.', tags: ['HTML'], cat: ['Web Development'], repo: gh('PYTHON_QWITTER'), live: 'https://python-qwitter.vercel.app' },
  { name: 'Link to QR', desc: 'Turns any link into a QR code.', tags: ['CSS', 'JavaScript'], cat: ['Web Development'], repo: gh('link_to_QR') },
]
// TODO: AI Digital Twin, PocketCode, GraphFall and Campus Placement Drive weren't found in your public repos — add them here with repo links once public.

export const mergedPRs = [
  { title: 'feat: add copy button next to entity IDs in transaction tables', repo: 'hiero-ledger/hiero-mirror-node-explorer', url: 'https://github.com/hiero-ledger/hiero-mirror-node-explorer/pull/2864' },
  { title: 'plugin-system: remove unused QueryEditorProps<Spec> type', repo: 'perses/shared', url: 'https://github.com/perses/shared/pull/443' },
  { title: 'chore(dynatrace): migrate to Jest 30', repo: 'backstage/community-plugins', url: 'https://github.com/backstage/community-plugins/pull/11987' },
  { title: 'docs: fix spelling mistakes in Duration, FreezeType, Wallet and Client comments', repo: 'hiero-ledger/hiero-sdk-js', url: 'https://github.com/hiero-ledger/hiero-sdk-js/pull/4567' },
]

export const timeline = [
  { title: 'B.Tech CSE (AI & ML)', org: 'MIRAI School of Technology, Ghaziabad (AKTU)', time: '2025 — 2029', text: 'Studying computer science with a focus on AI and machine learning.' },
  { title: 'Class Representative', org: 'College', time: 'Leadership', text: 'Voice of the class — coordinating between students and faculty.' },
  { title: 'Cultural Committee', org: 'College', time: 'Leadership', text: 'Leading and coordinating cultural events with a team.' },
  { title: 'Open Source Contributor', org: 'Hiero · Backstage · Perses', time: 'Ongoing', text: 'Merged pull requests into upstream open-source projects.' },
]

export const achievements = [
  { big: '94.6', label: 'JEE Main percentile' },
  { big: 'JEE Adv', label: 'Qualified' },
  { big: 'NDA', label: 'Cleared written, SSB journey' },
  { big: '170+', label: 'LeetCode problems' },
  { big: '160+', label: 'Codeforces problems' },
  { big: '4', label: 'Merged upstream PRs' },
]
