import { useState } from 'react'
import { PageType } from '../App'
import type { Professional } from '../data/mockData'
import { professionals, categories } from '../data/mockData'
import ProfessionalCard from '../components/ProfessionalCard'

interface SearchProps {
  readonly onNavigate: (page: PageType, data?: Professional) => void
}

const cities = ['Toutes les villes', 'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda']

export default function Search({ onNavigate }: SearchProps) {
  const [query, setQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('Toutes les villes')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [minRating, setMinRating] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500)
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('rating')

  const filtered = professionals.filter(p => {
    const matchQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.profession.toLowerCase().includes(query.toLowerCase()) ||
      p.skills.some(s => s.toLowerCase().includes(query.toLowerCase()))
    const matchCity = selectedCity === 'Toutes les villes' || p.location === selectedCity
    const matchCat = selectedCategory === 'Toutes' || p.category === selectedCategory
    const matchRating = p.rating >= minRating
    const matchPrice = p.hourlyRate <= maxPrice
    const matchAvail = !onlyAvailable || p.available
    return matchQuery && matchCity && matchCat && matchRating && matchPrice && matchAvail
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount
    if (sortBy === 'price_asc') return a.hourlyRate - b.hourlyRate
    if (sortBy === 'price_desc') return b.hourlyRate - a.hourlyRate
    return 0
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-brand py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Rechercher un professionnel</h1>
          <p className="text-slate-300 mb-6">Trouvez parmi {professionals.length * 83} professionnels vérifiés</p>
          <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 max-w-3xl">
            <div className="flex items-center gap-3 flex-1 px-4 py-2 border border-slate-200 rounded-lg focus-within:border-accent transition-colors">
              <svg aria-hidden="true" className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Compétence, métier, nom…"
                className="flex-1 text-sm text-slate-700 placeholder-slate-400 bg-transparent outline-none" />
            </div>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white outline-none focus:border-accent">
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
            <button className="bg-brand text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-brand-dark transition-colors">
              Rechercher
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-slate-900">Filtres</h2>
                <button onClick={() => {
                  setSelectedCategory('Toutes')
                  setSelectedCity('Toutes les villes')
                  setMinRating(0)
                  setMaxPrice(500)
                  setOnlyAvailable(false)
                }} className="text-xs text-accent hover:underline font-medium">
                  Réinitialiser
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="font-display font-semibold text-sm text-slate-800 mb-3">Catégorie</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="cat" checked={selectedCategory === 'Toutes'}
                      onChange={() => setSelectedCategory('Toutes')}
                      className="w-4 h-4 accent-brand" />
                    <span className="text-sm text-slate-700">Toutes les catégories</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat.name} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="cat" checked={selectedCategory === cat.name}
                        onChange={() => setSelectedCategory(cat.name)}
                        className="w-4 h-4 accent-brand" />
                      <span className="text-sm text-slate-700">{cat.emoji} {cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <h3 className="font-display font-semibold text-sm text-slate-800 mb-3">Note minimale</h3>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map(r => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="rating" checked={minRating === r}
                        onChange={() => setMinRating(r)}
                        className="w-4 h-4 accent-brand" />
                      <div className="flex items-center gap-1">
                        {r === 0 ? <span className="text-sm text-slate-700">Toutes les notes</span> : (
                          <>
                            <svg aria-hidden="true" className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-slate-700">{r}+ et plus</span>
                          </>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <h3 className="font-display font-semibold text-sm text-slate-800 mb-3">
                  Tarif max: <span className="text-brand font-bold">{maxPrice} DH/h</span>
                </h3>
                <input type="range" min={50} max={500} step={25} value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand" />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>50 DH</span><span>500 DH</span>
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={onlyAvailable} onChange={event => setOnlyAvailable(event.target.checked)} className="sr-only peer" />
                  <span aria-hidden="true" className={`w-10 h-6 rounded-full transition-colors relative ${onlyAvailable ? 'bg-brand' : 'bg-slate-200'}`}>
                    <span className={`block w-4 h-4 bg-white rounded-full shadow absolute top-1 transition-transform ${onlyAvailable ? 'translate-x-5' : 'translate-x-1'}`} />
                  </span>
                  <span className="text-sm text-slate-700 font-medium">Disponibles uniquement</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <p className="text-slate-600 text-sm">
                <span className="font-bold text-slate-900">{filtered.length}</span> professionnel{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-3">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-brand bg-white">
                  <option value="rating">Mieux notés</option>
                  <option value="reviews">Plus d'avis</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                </select>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button type="button" aria-label="Afficher les résultats en grille" onClick={() => setLayout('grid')}
                    className={`p-2 transition-colors ${layout === 'grid' ? 'bg-brand text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                    <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 3H3v7h7V3zM21 3h-7v7h7V3zM21 14h-7v7h7v-7zM10 14H3v7h7v-7z" />
                    </svg>
                  </button>
                  <button type="button" aria-label="Afficher les résultats en liste" onClick={() => setLayout('list')}
                    className={`p-2 transition-colors ${layout === 'list' ? 'bg-brand text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl p-16 text-center border border-slate-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display font-bold text-slate-900 text-xl mb-2">Aucun résultat trouvé</h3>
                <p className="text-slate-500 text-sm">Essayez d'élargir vos critères de recherche</p>
              </div>
            )}
            {filtered.length > 0 && layout === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(pro => (
                  <ProfessionalCard key={pro.id} pro={pro} onNavigate={onNavigate} />
                ))}
              </div>
            )}
            {filtered.length > 0 && layout === 'list' && (
              <div className="space-y-4">
                {filtered.map(pro => (
                  <ProfessionalCard key={pro.id} pro={pro} onNavigate={onNavigate} variant="horizontal" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
