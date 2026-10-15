import { useNavigate, useLocation, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Agreement from './pages/Agreement'
import Progress from './pages/Progress'
import Reviews from './pages/Reviews'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import type { Professional } from './data/mockData'

export type PageType = 'home' | 'search' | 'profile' | 'agreement' | 'progress' | 'reviews' | 'dashboard' | 'auth'
const paths: Record<PageType, string> = { home: '/', search: '/recherche', profile: '/professionnel', agreement: '/accord', progress: '/suivi', reviews: '/avis', dashboard: '/tableau-de-bord', auth: '/connexion' }
function Shell() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPage = (Object.keys(paths) as PageType[]).find(key => paths[key] === location.pathname) ?? 'home'
  const onNavigate = (page: PageType, data?: Professional) => {
    if (data && page === 'profile') sessionStorage.setItem('forssa:selectedProfessional', JSON.stringify(data))
    navigate(paths[page]); window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const profileData = (() => { try { return JSON.parse(sessionStorage.getItem('forssa:selectedProfessional') || 'null') } catch { return null } })()
  const showChrome = currentPage !== 'auth'
  return <div className="min-h-screen flex flex-col bg-slate-50">
    {showChrome && <Navbar onNavigate={onNavigate} currentPage={currentPage} />}
    <main className="flex-1"><Routes>
      <Route path="/" element={<Home onNavigate={onNavigate} />} />
      <Route path="/recherche" element={<Search onNavigate={onNavigate} />} />
      <Route path="/professionnel" element={<Profile onNavigate={onNavigate} data={profileData} />} />
      <Route path="/accord" element={<Agreement onNavigate={onNavigate} />} />
      <Route path="/suivi" element={<Progress onNavigate={onNavigate} />} />
      <Route path="/avis" element={<Reviews onNavigate={onNavigate} />} />
      <Route path="/tableau-de-bord" element={<Dashboard onNavigate={onNavigate} />} />
      <Route path="/connexion" element={<Auth onNavigate={onNavigate} />} />
      <Route path="*" element={<Home onNavigate={onNavigate} />} />
    </Routes></main>
    {showChrome && <Footer onNavigate={onNavigate} />}
  </div>
}
export default function App() { return <Shell /> }
