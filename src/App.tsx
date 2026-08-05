import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { BarChart3, BookOpen, Network, Search, Users, type LucideIcon } from 'lucide-react'
import { NavLink, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { authors, journals, papers, subjects } from './data/repository'

const navItems = [
  ['/', 'Overview'], ['/papers', 'Papers'], ['/authors', 'Authors'], ['/journals', 'Journals'], ['/subjects', 'Subjects'], ['/citations', 'Citations'], ['/statistics', 'Statistics'],
]

function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  function submit(event: React.FormEvent) { event.preventDefault(); navigate(`/search?q=${encodeURIComponent(query)}`) }
  return <div className="min-h-screen bg-stone-50 text-slate-900">
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="font-serif text-lg font-bold text-slate-900 no-underline">Academic Repository</NavLink>
        <form onSubmit={submit} className="order-3 flex w-full items-center rounded-md border border-stone-300 bg-stone-50 px-3 py-2 sm:order-none sm:ml-auto sm:w-72">
          <Search size={16} className="mr-2 text-slate-500" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search research" className="w-full bg-transparent text-sm outline-none" />
        </form>
        <nav className="order-4 flex w-full gap-4 overflow-x-auto text-sm sm:order-none sm:w-auto">
          {navItems.slice(1).map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `whitespace-nowrap no-underline ${isActive ? 'font-semibold text-accent' : 'text-slate-600 hover:text-slate-900'}`}>{label}</NavLink>)}
        </nav>
      </div>
    </header>
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    <footer className="border-t border-stone-200 bg-white"><div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500 sm:px-6">Built with React, TypeScript, Tailwind CSS, React Router, Recharts, and Lucide.</div></footer>
  </div>
}

function Title({ title, intro }: { title: string; intro: string }) { return <div className="mb-8"><h1 className="font-serif text-4xl font-bold tracking-tight">{title}</h1><p className="mt-2 max-w-2xl text-slate-600">{intro}</p></div> }
function Card({ children }: { children: ReactNode }) { return <article className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">{children}</article> }

function Overview() {
  const totalCitations = papers.reduce((sum, paper) => sum + paper.citations, 0)
  const metrics: Array<{ Icon: LucideIcon; value: number; label: string }> = [
    { Icon: BookOpen, value: papers.length, label: 'Papers' },
    { Icon: Users, value: authors.length, label: 'Authors' },
    { Icon: Network, value: journals.length, label: 'Journals' },
    { Icon: BarChart3, value: totalCitations, label: 'Citations' },
  ]
  return <><Title title="Research, connected." intro="A living index of publications, people, venues, and the ideas linking them." />
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{metrics.map(({ Icon, value, label }) => <Card key={label}><Icon size={20} className="text-accent" /><p className="mt-4 text-3xl font-semibold">{value}</p><p className="text-sm text-slate-500">{label}</p></Card>)}</section>
    <section className="mt-10"><h2 className="font-serif text-2xl font-bold">Recently added</h2><div className="mt-4 grid gap-4 lg:grid-cols-2">{papers.slice(0, 4).map((paper) => <PaperCard key={paper.id} paper={paper} />)}</div></section>
  </>
}

function PaperCard({ paper }: { paper: typeof papers[number] }) { return <Card><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-accent">{paper.subject} · {paper.year}</p><h3 className="mt-1 font-serif text-xl font-bold">{paper.title}</h3></div><span className="whitespace-nowrap text-sm text-slate-500">{paper.citations} cites</span></div><p className="mt-2 text-sm text-slate-600">{paper.authors.join(', ')} · <em>{paper.journal}</em></p><p className="mt-3 text-sm leading-6 text-slate-600">{paper.abstract}</p></Card> }

function Papers() {
  const [subject, setSubject] = useState('All subjects')
  const visible = subject === 'All subjects' ? papers : papers.filter((paper) => paper.subject === subject)
  return <><Title title="Papers" intro="Browse the collection and filter it by research area." /><label className="mb-6 block max-w-xs text-sm font-medium">Research area<select value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full rounded-md border border-stone-300 bg-white p-2"><option>All subjects</option>{subjects.map((item) => <option key={item}>{item}</option>)}</select></label><div className="grid gap-4">{visible.map((paper) => <PaperCard key={paper.id} paper={paper} />)}</div></>
}

function Directory({ kind, items }: { kind: string; items: string[] }) { return <><Title title={kind} intro={`A quick directory of ${kind.toLowerCase()} represented in this repository.`} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <Card key={item}><h2 className="font-serif text-xl font-bold">{item}</h2><p className="mt-2 text-sm text-slate-600">{papers.filter((paper) => kind === 'Authors' ? paper.authors.includes(item) : kind === 'Journals' ? paper.journal === item : paper.subject === item).length} related publications</p></Card>)}</div></> }

function SearchPage() { const [params] = useSearchParams(); const query = (params.get('q') ?? '').trim().toLowerCase(); const results = useMemo(() => papers.filter((paper) => `${paper.title} ${paper.authors.join(' ')} ${paper.subject} ${paper.journal}`.toLowerCase().includes(query)), [query]); return <><Title title="Search" intro={query ? `Results for “${query}”` : 'Search the repository from the navigation bar.'} />{query && (results.length ? <div className="grid gap-4">{results.map((paper) => <PaperCard key={paper.id} paper={paper} />)}</div> : <Card>No matching records yet. Try a subject, author, or journal name.</Card>)}</> }

function Citations() { return <><Title title="Citation explorer" intro="A simplified view of the most cited work in the repository." /><div className="space-y-3">{[...papers].sort((a, b) => b.citations - a.citations).map((paper, index) => <Card key={paper.id}><div className="flex gap-4"><span className="font-mono text-2xl text-accent">{index + 1}</span><div><h2 className="font-serif text-xl font-bold">{paper.title}</h2><p className="mt-1 text-sm text-slate-600">{paper.citations} citations · {paper.authors.join(', ')}</p></div></div></Card>)}</div></> }

function Statistics() { const data = subjects.map((subject) => ({ subject: subject.replace(' Science', ''), papers: papers.filter((paper) => paper.subject === subject).length, citations: papers.filter((paper) => paper.subject === subject).reduce((sum, paper) => sum + paper.citations, 0) })); return <><Title title="Repository statistics" intro="Publication and citation activity by research area." /><Card><h2 className="mb-5 font-serif text-xl font-bold">Citations by subject</h2><div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="subject" /><YAxis /><Tooltip /><Bar dataKey="citations" fill="#1e3a5f" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></Card></> }

function App() { return <Layout><Routes><Route path="/" element={<Overview />} /><Route path="/papers" element={<Papers />} /><Route path="/authors" element={<Directory kind="Authors" items={authors} />} /><Route path="/journals" element={<Directory kind="Journals" items={journals} />} /><Route path="/subjects" element={<Directory kind="Subjects" items={subjects} />} /><Route path="/citations" element={<Citations />} /><Route path="/statistics" element={<Statistics />} /><Route path="/search" element={<SearchPage />} /><Route path="*" element={<Overview />} /></Routes></Layout> }
export default App
