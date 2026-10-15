import { useState } from 'react'
import { PageType } from '../App'
import type { Professional } from '../data/mockData'
import { professionals, categories, testimonials } from '../data/mockData'
import { StarRating } from '../components/ui'
import ProfessionalCard from '../components/ProfessionalCard'

interface HomeProps {
  readonly onNavigate: (page: PageType, data?: Professional) => void
}

export default function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const steps = [
    { n: '01', title: 'Rechercher', desc: 'Entrez votre besoin et votre ville pour trouver des professionnels disponibles.', emoji: '🔍', bg: 'bg-blue-50', text: 'text-blue-600' },
    { n: '02', title: 'Choisir', desc: 'Consultez les profils, avis et portfolios. Comparez et choisissez en confiance.', emoji: '👤', bg: 'bg-purple-50', text: 'text-purple-600' },
    { n: '03', title: 'Planifier', desc: 'Définissez les modalités, la date et le budget. Signez l\'accord digital sécurisé.', emoji: '📋', bg: 'bg-amber-50', text: 'text-amber-600' },
    { n: '04', title: 'Confirmer', desc: 'Suivez l\'avancement par étapes et confirmez la fin du travail pour valider.', emoji: '✅', bg: 'bg-green-50', text: 'text-green-600' },
  ]

  const trustItems = [
    { icon: '🛡️', title: 'Vérification d\'identité', desc: 'CIN, diplômes et certifications professionnelles vérifiés avant toute mise en ligne.' },
    { icon: '⭐', title: 'Avis authentiques', desc: 'Avis laissés uniquement par des clients ayant réellement travaillé avec le professionnel.' },
    { icon: '📊', title: 'Suivi de travail', desc: 'Chaque mission suit un protocole par étapes avec photos et validation client.' },
    { icon: '🤝', title: 'Accord digital', desc: 'Contrat clair et sécurisé entre client et professionnel avant le début du travail.' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand relative overflow-hidden min-h-[580px] flex flex-col">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-muted opacity-30" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent opacity-10" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 flex-1 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-white/10">
              <span className="w-2 h-2 bg-verified rounded-full animate-pulse" />{' '}
              +15 000 professionnels vérifiés au Maroc
            </div>

            <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
              Trouvez le bon<br />
              <span className="text-white/70">professionnel</span><br />
              pour votre projet
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-lg">
              Artisans qualifiés, employés et prestataires de confiance — vérifiés, évalués, et suivis à chaque étape de votre projet.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button onClick={() => onNavigate('search')}
                className="bg-accent text-white font-bold px-8 py-4 rounded-xl hover:bg-accent/90 transition-all hover:shadow-xl hover:shadow-accent/30 text-base">
                Je cherche un professionnel
              </button>
              <button onClick={() => onNavigate('auth')}
                className="bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-base backdrop-blur-sm">
                Je cherche un emploi
              </button>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {[
                { val: '15K+', label: 'Professionnels' },
                { val: '98%', label: 'Satisfaction' },
                { val: '50K+', label: 'Missions' },
                { val: '12', label: 'Villes' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-extrabold text-white">{stat.val}</div>
                  <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search bar overlap */}
        <div className="relative -mb-8 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-3 flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus-within:border-accent-light focus-within:ring-2 focus-within:ring-accent-light transition-all">
              <svg aria-hidden="true" className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Que recherchez-vous ? (ex: électricien, peintre…)"
                className="flex-1 text-sm text-slate-700 placeholder-slate-400 bg-transparent outline-none" />
            </div>
            <div className="flex items-center gap-3 flex-1 px-4 py-2.5 border border-slate-200 rounded-xl focus-within:border-accent-light focus-within:ring-2 focus-within:ring-accent-light transition-all">
              <svg aria-hidden="true" className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input value={location} onChange={e => setLocation(e.target.value)}
                placeholder="Ville ou localisation"
                className="flex-1 text-sm text-slate-700 placeholder-slate-400 bg-transparent outline-none" />
            </div>
            <button onClick={() => onNavigate('search')}
              className="bg-brand text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors whitespace-nowrap text-sm">
              Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pt-24 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">Catégories populaires</h2>
            <p className="text-slate-500 text-lg">Trouvez le spécialiste dont vous avez besoin</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(cat => (
              <button key={cat.name} onClick={() => onNavigate('search')}
                className="flex flex-col items-center gap-2.5 bg-white p-4 rounded-2xl hover:shadow-md transition-all hover:-translate-y-1 group border border-transparent hover:border-slate-100">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${cat.bg} group-hover:scale-110 transition-transform`}>
                  {cat.emoji}
                </div>
                <span className={`text-xs font-semibold text-slate-700 text-center leading-tight`}>{cat.name}</span>
                <span className="text-xs text-slate-400 font-medium">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Professionals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Professionnels recommandés</h2>
              <p className="text-slate-500">Les mieux notés de la semaine dans votre région</p>
            </div>
            <button onClick={() => onNavigate('search')} className="text-accent font-semibold text-sm hover:underline hidden sm:flex items-center gap-1">
              Voir tous
              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map(pro => (
              <ProfessionalCard key={pro.id} pro={pro} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">Comment ça marche ?</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">En 4 étapes simples, trouvez et validez votre professionnel</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={step.n} className="relative flex flex-col items-center text-center bg-white rounded-2xl p-8 border border-slate-100">
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-slate-200 z-10" />
                )}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl ${step.bg} mb-5 relative`}>
                  {step.emoji}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-bold">{idx + 1}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white mb-3">Notre système de confiance</h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">Chaque professionnel est soumis à un processus rigoureux de vérification et d'évaluation continue</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustItems.map(item => (
              <div key={item.title} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">Ce qu'ils disent de nous</h2>
            <p className="text-slate-500 text-lg">Des milliers de clients satisfaits à travers le Maroc</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="bg-slate-50 rounded-2xl p-7 relative border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="absolute top-5 right-6 text-5xl text-slate-200 font-display font-extrabold leading-none select-none">"</div>
                <StarRating rating={t.rating} size="md" />
                <p className="text-slate-700 text-sm leading-relaxed mt-4 mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <img src={`${t.photo}?w=64&h=64&fit=crop&auto=format`} alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-slate-200" />
                  <div>
                    <div className="font-display font-semibold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-brand to-brand-muted">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-extrabold text-white mb-5">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Rejoignez plus de 50 000 clients et professionnels qui font confiance à FORSSA chaque jour
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('search')}
              className="bg-white text-brand font-bold px-9 py-4 rounded-xl hover:bg-slate-50 transition-all hover:shadow-lg text-base">
              Trouver un professionnel
            </button>
            <button onClick={() => onNavigate('auth')}
              className="border-2 border-white/40 text-white font-bold px-9 py-4 rounded-xl hover:bg-white/10 transition-all text-base">
              Devenir professionnel
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
