import { useState } from 'react'
import { PageType } from '../App'

interface NavbarProps {
  readonly onNavigate: (page: PageType) => void
  readonly currentPage: PageType
}

const FORSSALogo = () => (
  <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#1B3A6B" />
    <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="white" opacity="0.9" />
    <path d="M14 10L20 16L26 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    <circle cx="22" cy="10" r="2.5" fill="#16A34A" />
  </svg>
)

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links: { label: string; page: PageType }[] = [
    { label: 'Accueil', page: 'home' },
    { label: 'Rechercher', page: 'search' },
    { label: 'Progrès', page: 'progress' },
    { label: 'Dashboard', page: 'dashboard' },
  ]

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 focus:outline-none">
            <FORSSALogo />
            <span className="font-display font-extrabold text-xl text-brand tracking-tight">FORSSA</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <button key={link.label} onClick={() => onNavigate(link.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-accent-light text-accent'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand'
                }`}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => onNavigate('auth')}
              className="text-sm font-semibold text-slate-700 hover:text-brand transition-colors px-3 py-2">
              Connexion
            </button>
            <button onClick={() => onNavigate('auth')}
              className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md">
              S'inscrire
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-1">
            {links.map(link => (
              <button key={link.label} onClick={() => { onNavigate(link.page); setMobileOpen(false) }}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                {link.label}
              </button>
            ))}
            <div className="pt-3 flex gap-3 px-2">
              <button onClick={() => { onNavigate('auth'); setMobileOpen(false) }}
                className="flex-1 text-sm font-semibold text-brand border-2 border-brand py-2.5 rounded-xl">
                Connexion
              </button>
              <button onClick={() => { onNavigate('auth'); setMobileOpen(false) }}
                className="flex-1 bg-brand text-white text-sm font-semibold py-2.5 rounded-xl">
                S'inscrire
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
