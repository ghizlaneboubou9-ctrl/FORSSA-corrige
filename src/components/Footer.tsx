import { PageType } from '../App'

interface FooterProps {
  readonly onNavigate: (page: PageType) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const cols = [
    {
      title: 'Plateforme',
      links: ['Rechercher un professionnel', 'Comment ça marche', 'Toutes les catégories', 'Tarifs et commissions'],
    },
    {
      title: 'Entreprise',
      links: ['À propos de FORSSA', 'Blog & actualités', 'Rejoindre l\'équipe', 'Espace presse'],
    },
    {
      title: 'Support',
      links: ['Centre d\'aide', 'Conditions d\'utilisation', 'Politique de confidentialité', 'Nous contacter'],
    },
  ]

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16L14 10L20 16L14 22L8 16Z" fill="white" opacity="0.9" />
                  <path d="M14 10L20 16L26 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                </svg>
              </div>
              <span className="font-display font-extrabold text-xl">FORSSA</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              La plateforme de confiance qui connecte les professionnels qualifiés avec les clients partout au Maroc.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 bg-white/5 px-3 py-1.5 rounded-lg">🇲🇦 Casablanca, Maroc</span>
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}>
                    <button className="text-slate-400 hover:text-white text-sm transition-colors text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2026 FORSSA Technologies. Tous droits réservés.</p>
          <div className="flex items-center gap-6 text-slate-500 text-xs">
            <span>+15,000 professionnels vérifiés</span>
            <span>•</span>
            <span>50K+ missions réalisées</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
