import { useState } from 'react'
import { PageType } from '../App'
import type { Professional } from '../data/mockData'
import { InteractiveStar, VerifiedBadge } from '../components/ui'

interface ReviewsProps {
  readonly onNavigate: (page: PageType, data?: Professional) => void
}

export default function Reviews({ onNavigate }: ReviewsProps) {
  const [ratings, setRatings] = useState({ quality: 0, deadline: 0, professionalism: 0 })
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const setRating = (key: keyof typeof ratings) => (val: number) => setRatings(r => ({ ...r, [key]: val }))
  const avg = ((ratings.quality + ratings.deadline + ratings.professionalism) / 3).toFixed(1)
  const canSubmit = ratings.quality > 0 && ratings.deadline > 0 && ratings.professionalism > 0 && comment.length >= 20

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
  }

  const totalAvg = Number.parseFloat(avg)
  const isTrusted = totalAvg >= 4.5

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-10 max-w-md w-full text-center shadow-lg">
          <div className="w-24 h-24 bg-verified-light rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">⭐</span>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 mb-3">Avis publié !</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Votre avis aide d'autres clients à choisir en confiance. Merci pour votre contribution !
          </p>

          {isTrusted && (
            <div className="bg-verified-light border border-verified/20 rounded-xl p-5 mb-8 flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-verified rounded-full flex items-center justify-center">
                <svg aria-hidden="true" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-display font-bold text-verified text-base">🏆 Badge "Professionnel Fiable" accordé</div>
                <div className="text-verified/80 text-xs mt-1">Ce professionnel reçoit le badge de confiance FORSSA grâce à ses excellentes évaluations</div>
              </div>
            </div>
          )}

          <button onClick={() => onNavigate('home')}
            className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md">
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => onNavigate('progress')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand transition-colors mb-6">
          <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold text-slate-900 mb-2">Évaluer le professionnel</h1>
          <p className="text-slate-500">Votre avis aide la communauté à choisir des professionnels de confiance</p>
        </div>

        {/* Professional card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 mb-6">
          <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=80&h=80&fit=crop&auto=format"
            alt="Mohammed Alami" className="w-14 h-14 rounded-xl object-cover bg-slate-100" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-display font-bold text-slate-900">Mohammed Alami</span>
              <VerifiedBadge />
            </div>
            <div className="text-slate-500 text-sm">Électricien certifié · Casablanca</div>
          </div>
          <div className="text-right text-sm text-slate-400">
            <div>Mission :</div>
            <div className="font-semibold text-slate-700 text-xs max-w-28 text-right">Installation tableau électrique</div>
          </div>
        </div>

        {/* Ratings form */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
          <h2 className="font-display font-bold text-slate-900 text-lg mb-6">Critères d'évaluation</h2>

          <div className="space-y-8">
            {[
              {
                key: 'quality' as const,
                label: 'Qualité du travail',
                desc: 'Le résultat final est-il conforme à vos attentes ?',
                icon: '🔨',
              },
              {
                key: 'deadline' as const,
                label: 'Respect des délais',
                desc: 'Le professionnel a-t-il respecté les dates convenues ?',
                icon: '📅',
              },
              {
                key: 'professionalism' as const,
                label: 'Professionnalisme',
                desc: 'Communication, ponctualité, sérieux et attitude générale',
                icon: '🤝',
              },
            ].map(item => (
              <div key={item.key}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{item.icon}</span>
                  <h3 className="font-display font-bold text-slate-900">{item.label}</h3>
                </div>
                <p className="text-slate-500 text-xs mb-3 ml-8">{item.desc}</p>
                <div className="ml-8 flex items-center gap-4">
                  <InteractiveStar rating={ratings[item.key]} onRate={setRating(item.key)} />
                  {ratings[item.key] > 0 && (
                    <span className="text-sm font-bold text-amber-500">
                      {['', 'Insuffisant', 'Passable', 'Bien', 'Très bien', 'Excellent'][ratings[item.key]]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Note moyenne */}
          {(ratings.quality > 0 || ratings.deadline > 0 || ratings.professionalism > 0) && (
            <div className="mt-6 p-4 bg-slate-50 rounded-xl flex items-center justify-between">
              <span className="text-sm text-slate-600 font-medium">Note moyenne</span>
              <div className="flex items-center gap-2">
                <svg aria-hidden="true" className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-display font-extrabold text-slate-900 text-xl">{avg}</span>
                <span className="text-slate-400 text-sm">/ 5</span>
                {isTrusted && (
                  <span className="ml-2 inline-flex items-center gap-1 bg-verified-light text-verified text-xs font-bold px-2.5 py-1 rounded-full">
                    🏆 Fiable
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Comment */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
          <h2 className="font-display font-bold text-slate-900 text-lg mb-2">Commentaire</h2>
          <p className="text-slate-500 text-xs mb-4">Partagez votre expérience en détail pour aider la communauté (minimum 20 caractères)</p>
          <textarea value={comment} onChange={e => setComment(e.target.value)}
            placeholder="Décrivez votre expérience avec ce professionnel : qualité du travail, communication, ponctualité, rapport qualité-prix…"
            rows={5}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all resize-none" />
          <div className="flex justify-between mt-2">
            <span className={`text-xs ${comment.length < 20 ? 'text-slate-400' : 'text-verified'}`}>
              {comment.length} / min. 20 caractères
            </span>
            {comment.length >= 20 && <span className="text-xs text-verified">✓ Longueur suffisante</span>}
          </div>
        </div>

        {/* System badge info */}
        <div className="bg-brand/5 border border-brand/10 rounded-xl p-4 flex gap-3 mb-6">
          <span className="text-brand text-xl flex-shrink-0">🛡️</span>
          <div>
            <div className="font-semibold text-brand text-sm mb-1">Système de confiance FORSSA</div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Les professionnels avec une note ≥ 4.5 reçoivent automatiquement le badge <strong>"Professionnel Vérifié / Fiable"</strong>.
              Ce badge est visible sur leur profil et renforce leur crédibilité.
            </p>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={!canSubmit}
          className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md text-base disabled:opacity-60 disabled:cursor-not-allowed">
          Publier mon avis
        </button>
      </div>
    </div>
  )
}
