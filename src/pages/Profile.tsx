import { useState } from 'react'
import { PageType } from '../App'
import { Professional, reviews, portfolioImages } from '../data/mockData'
import { StarRating, VerifiedBadge, AvailabilityBadge } from '../components/ui'

interface ProfileProps {
  readonly onNavigate: (page: PageType, data?: Professional) => void
  readonly data?: Professional | null
}

const defaultPro: Professional = {
  id: 1, name: 'Mohammed Alami', profession: 'Électricien certifié', location: 'Casablanca',
  rating: 4.9, reviewCount: 87, completedJobs: 142, verified: true, available: true,
  photo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e',
  description: 'Électricien certifié avec 12 ans d\'expérience. Spécialiste en installation électrique résidentielle et commerciale, domotique et panneaux solaires. Je travaille avec rigueur, respect des normes et souci du détail. Chaque chantier est suivi par étapes avec photos et rapport détaillé.',
  skills: ['Installation électrique', 'Tableau électrique', 'Domotique', 'Panneaux solaires', 'Câblage réseau', 'Éclairage LED'],
  hourlyRate: 150, category: 'Électricité', responseTime: '< 1 heure', memberSince: 'Janvier 2024',
}

const availability = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const availDays = [true, true, true, true, true, true, false]

export default function Profile({ onNavigate, data }: ProfileProps) {
  const pro = data || defaultPro
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'reviews' | 'availability'>('about')

  const avgRating = (
    reviews.reduce((sum, r) => sum + (r.qualityRating + r.deadlineRating + r.professionalismRating) / 3, 0) / reviews.length
  ).toFixed(1)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button onClick={() => onNavigate('search')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand transition-colors mb-6">
          <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux résultats
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-brand to-brand-muted" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-6">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <img src={`${pro.photo}?w=160&h=160&fit=crop&auto=format`} alt={pro.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover bg-slate-200 border-4 border-white shadow-lg" />
                  {pro.verified && (
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-verified rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <svg aria-hidden="true" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="font-display text-2xl font-extrabold text-slate-900">{pro.name}</h1>
                    {pro.verified && <VerifiedBadge label="Professionnel vérifié" />}
                  </div>
                  <p className="text-slate-600 font-medium mb-1">{pro.profession}</p>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {pro.location}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 sm:mb-2">
                <AvailabilityBadge available={pro.available} />
                <button onClick={() => onNavigate('agreement', pro)}
                  className="bg-brand text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md text-sm">
                  Demander ce professionnel
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Note globale', value: pro.rating.toString(), icon: '⭐' },
                { label: 'Avis clients', value: pro.reviewCount.toString(), icon: '💬' },
                { label: 'Missions réalisées', value: pro.completedJobs.toString(), icon: '✅' },
                { label: 'Tarif horaire', value: `${pro.hourlyRate} DH`, icon: '💰' },
              ].map(stat => (
                <div key={stat.label} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="font-display font-extrabold text-slate-900 text-lg">{stat.value}</div>
                  <div className="text-slate-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100 overflow-x-auto">
            {(['about', 'portfolio', 'reviews', 'availability'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-brand text-brand bg-accent-light/30'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}>
                {{ about: 'À propos', portfolio: 'Portfolio', reviews: 'Avis clients', availability: 'Disponibilité' }[tab]}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-3">Présentation</h3>
                  <p className="text-slate-600 leading-relaxed">{pro.description}</p>
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-lg mb-3">Compétences & Services</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {pro.skills.map(s => (
                      <span key={s} className="bg-accent-light text-accent font-medium text-sm px-4 py-2 rounded-xl">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Temps de réponse', value: pro.responseTime || '< 1 heure', icon: '⚡' },
                    { label: 'Membre depuis', value: pro.memberSince || 'Janvier 2024', icon: '📅' },
                    { label: 'Catégorie', value: pro.category, icon: '🏷️' },
                  ].map(item => (
                    <div key={item.label} className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-xs text-slate-500">{item.label}</div>
                        <div className="font-semibold text-slate-900 text-sm">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-5">Réalisations précédentes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {portfolioImages.map((img, i) => (
                    <div key={img.src} className="group relative overflow-hidden rounded-xl bg-slate-100">
                      <img src={`${img.src}?w=400&h=280&fit=crop&auto=format`} alt={img.alt}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-white text-xs font-medium">{img.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {/* Summary */}
                <div className="flex items-center gap-6 mb-8 p-5 bg-slate-50 rounded-xl">
                  <div className="text-center">
                    <div className="font-display text-5xl font-extrabold text-slate-900">{avgRating}</div>
                    <StarRating rating={Number.parseFloat(avgRating)} size="md" />
                    <div className="text-slate-500 text-xs mt-1">{pro.reviewCount} avis</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[
                      { label: 'Qualité du travail', val: 4.9 },
                      { label: 'Respect des délais', val: 4.7 },
                      { label: 'Professionnalisme', val: 5.0 },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 w-40 flex-shrink-0">{item.label}</span>
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(item.val / 5) * 100}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-700 w-8">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  {reviews.map(r => (
                    <div key={r.id} className="border border-slate-100 rounded-xl p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <img src={`${r.photo}?w=60&h=60&fit=crop&auto=format`} alt={r.author}
                          className="w-10 h-10 rounded-full object-cover bg-slate-200 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-slate-900 text-sm">{r.author}</div>
                            <div className="text-slate-400 text-xs">{r.date}</div>
                          </div>
                          <div className="text-slate-500 text-xs mb-2">{r.jobTitle}</div>
                          <div className="flex items-center gap-3 flex-wrap">
                            {[
                              { label: 'Qualité', val: r.qualityRating },
                              { label: 'Délais', val: r.deadlineRating },
                              { label: 'Pro', val: r.professionalismRating },
                            ].map(item => (
                              <span key={item.label} className="text-xs text-slate-500 flex items-center gap-1">
                                {item.label}: <StarRating rating={item.val} size="sm" />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'availability' && (
              <div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-5">Planning de disponibilité</h3>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {availability.map((day, i) => (
                    <div key={day} className={`rounded-xl p-3 text-center ${availDays[i] ? 'bg-verified-light' : 'bg-slate-50'}`}>
                      <div className="text-xs font-semibold text-slate-500 mb-1">{day}</div>
                      <div className={`w-2 h-2 rounded-full mx-auto ${availDays[i] ? 'bg-verified' : 'bg-slate-300'}`} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-verified-light rounded border border-verified/20" />{' '}
                    Disponible
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-slate-100 rounded border border-slate-200" />{' '}
                    Indisponible
                  </span>
                </div>
                <div className="mt-6">
                  <button onClick={() => onNavigate('agreement', pro)}
                    className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md">
                    Demander ce professionnel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  )
}
