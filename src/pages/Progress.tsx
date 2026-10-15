import { useState } from 'react'
import { PageType } from '../App'
import type { Professional } from '../data/mockData'
import { portfolioImages } from '../data/mockData'

interface ProgressProps {
  readonly onNavigate: (page: PageType, data?: Professional) => void
}

interface Stage {
  id: number
  title: string
  desc: string
  status: 'completed' | 'active' | 'pending'
  date?: string
  photos: string[]
  clientValidated?: boolean
}

const initialStages: Stage[] = [
  {
    id: 0, title: 'Travail commencé', desc: 'Le professionnel a démarré la mission', status: 'completed',
    date: '15 Sept. 2026', photos: [portfolioImages[0].src, portfolioImages[1].src],
    clientValidated: true,
  },
  {
    id: 1, title: 'Étape 1 — Préparation', desc: 'Inspection du site et préparation du matériel nécessaire', status: 'completed',
    date: '15 Sept. 2026', photos: [portfolioImages[2].src],
    clientValidated: true,
  },
  {
    id: 2, title: 'Étape 2 — Installation', desc: 'Installation du tableau électrique principal et câblage des circuits', status: 'active',
    date: '16 Sept. 2026', photos: [portfolioImages[3].src],
    clientValidated: false,
  },
  {
    id: 3, title: 'Étape 3 — Vérification', desc: 'Tests de conformité électrique et vérification des connexions', status: 'pending',
    date: undefined, photos: [],
    clientValidated: false,
  },
  {
    id: 4, title: 'Travail terminé', desc: 'Validation finale et livraison de la mission', status: 'pending',
    date: undefined, photos: [],
    clientValidated: false,
  },
]

export default function Progress({ onNavigate }: ProgressProps) {
  const [stages, setStages] = useState<Stage[]>(initialStages)
  const [workConfirmed, setWorkConfirmed] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const completedCount = stages.filter(s => s.status === 'completed').length
  const progress = Math.round((completedCount / stages.length) * 100)

  const validateStage = (id: number) => {
    setStages(prev => prev.map(s => {
      if (s.id === id) return { ...s, clientValidated: true }
      if (s.id === id + 1 && s.status === 'pending') return { ...s, status: 'active' as const }
      return s
    }))
    setStages(prev => prev.map(s => {
      if (s.id === id && !s.clientValidated) return { ...s, status: 'completed' as const, clientValidated: true }
      return s
    }))
  }

  const confirmWork = () => {
    setWorkConfirmed(true)
    setShowConfirmModal(false)
  }

  if (workConfirmed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-10 max-w-md w-full text-center shadow-lg">
          <div className="w-24 h-24 bg-verified-light rounded-full flex items-center justify-center mx-auto mb-6">
            <svg aria-hidden="true" className="w-12 h-12 text-verified" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 mb-3">Mission validée !</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Vous avez confirmé l'achèvement du travail. Le professionnel sera notifié et le paiement sera finalisé.
          </p>
          <button onClick={() => onNavigate('reviews')}
            className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md mb-3">
            Laisser un avis →
          </button>
          <button onClick={() => onNavigate('dashboard')}
            className="w-full text-slate-500 text-sm hover:text-brand py-2 transition-colors">
            Voir mes missions
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand transition-colors mb-6">
          <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour au tableau de bord
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-slate-900 mb-1">Installation tableau électrique</h1>
              <p className="text-slate-500 text-sm">Mohammed Alami · Casablanca · Démarré le 15 Sept. 2026</p>
            </div>
            <span className="bg-accent-light text-accent text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">En cours</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Avancement global</span>
            <span className="font-bold text-slate-900">{progress}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand to-accent rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
            <span>{completedCount} / {stages.length} étapes validées</span>
            <span>Prix convenu: <span className="font-bold text-slate-700">2 500 DH</span></span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
          <h2 className="font-display font-bold text-slate-900 text-lg mb-6">Suivi par étapes</h2>
          <div className="relative">
            {stages.map((stage, idx) => (
              <div key={stage.id} className="flex gap-4 mb-6 last:mb-0">
                {/* Left: timeline */}
                <div className="flex flex-col items-center flex-shrink-0 w-8">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${{
                    completed: 'bg-verified text-white shadow-md shadow-verified/20',
                    active: 'bg-accent text-white shadow-md shadow-accent/20 ring-4 ring-accent/20',
                    pending: 'bg-slate-100 text-slate-400',
                  }[stage.status]}`}>
                    {stage.status === 'completed' && (
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {stage.status === 'active' && <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />}
                    {stage.status === 'pending' && <div className="w-2 h-2 bg-slate-300 rounded-full" />}
                  </div>
                  {idx < stages.length - 1 && (
                    <div className={`w-0.5 flex-1 mt-1 min-h-6 ${stage.status === 'completed' ? 'bg-verified/30' : 'bg-slate-100'}`} />
                  )}
                </div>

                {/* Right: content */}
                <div className="flex-1 pb-6 last:pb-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-display font-bold text-sm ${
                      stage.status === 'pending' ? 'text-slate-400' : 'text-slate-900'
                    }`}>
                      {stage.title}
                    </h3>
                    {stage.date && (
                      <span className="text-xs text-slate-400 flex-shrink-0">{stage.date}</span>
                    )}
                  </div>
                  <p className={`text-xs leading-relaxed mb-3 ${stage.status === 'pending' ? 'text-slate-300' : 'text-slate-500'}`}>
                    {stage.desc}
                  </p>

                  {/* Photos */}
                  {stage.photos.length > 0 && (
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {stage.photos.map((src, pi) => (
                        <div key={`${stage.id}-${src}`} className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          <img src={`${src}?w=80&h=80&fit=crop&auto=format`} alt={`Étape ${stage.id}, vue ${pi + 1}`}
                            className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Validation */}
                  {stage.status === 'active' && !stage.clientValidated && (
                    <button onClick={() => validateStage(stage.id)}
                      className="text-xs font-bold text-accent border border-accent px-4 py-2 rounded-lg hover:bg-accent-light transition-colors">
                      ✓ Valider cette étape
                    </button>
                  )}
                  {stage.status === 'completed' && stage.clientValidated && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-verified font-semibold">
                      <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Validé par le client
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirm completion */}
        <div className="bg-gradient-to-br from-brand to-brand-muted rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">🏁</div>
          <h3 className="font-display font-bold text-white text-xl mb-2">Le travail est-il terminé ?</h3>
          <p className="text-slate-300 text-sm mb-6 max-w-sm mx-auto">
            Confirmez la fin de la mission pour libérer le paiement et donner votre avis au professionnel.
          </p>
          <button onClick={() => setShowConfirmModal(true)}
            className="bg-white text-brand font-bold px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-all hover:shadow-lg text-base">
            Je confirme l'achèvement du travail
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <button type="button" aria-label="Fermer la fenêtre de confirmation" className="absolute inset-0 w-full h-full cursor-default" onClick={() => setShowConfirmModal(false)} />
          <div role="dialog" aria-modal="true" aria-labelledby="confirm-work-title" className="relative z-10 bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 id="confirm-work-title" className="font-display font-bold text-slate-900 text-xl mb-2">Confirmer l'achèvement</h3>
              <p className="text-slate-500 text-sm">Êtes-vous sûr que le travail est entièrement terminé et conforme à l'accord ?</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirmModal(false)}
                className="flex-1 border-2 border-slate-200 text-slate-600 font-semibold py-3 rounded-xl hover:border-slate-300 transition-colors">
                Annuler
              </button>
              <button onClick={confirmWork}
                className="flex-1 bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand-dark transition-all">
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
