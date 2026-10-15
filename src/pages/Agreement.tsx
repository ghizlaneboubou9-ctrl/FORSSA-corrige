import { useState } from 'react'
import { PageType } from '../App'
import type { Professional } from '../data/mockData'

interface AgreementProps {
  readonly onNavigate: (page: PageType, data?: Professional) => void
}

const statusOptions = ['En attente', 'Planifié', 'En cours', 'Terminé', 'Annulé']

export default function Agreement({ onNavigate }: AgreementProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    price: '',
    priceType: 'fixed',
    location: '',
    status: 'Planifié',
    notes: '',
  })
  const [confirmed, setConfirmed] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleConfirm = () => {
    if (!form.title || !form.description || !form.startDate || !form.price) return
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-10 max-w-md w-full text-center shadow-lg">
          <div className="w-20 h-20 bg-verified-light rounded-full flex items-center justify-center mx-auto mb-6">
            <svg aria-hidden="true" className="w-10 h-10 text-verified" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 mb-3">Accord confirmé !</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            L'accord a été enregistré. Le professionnel a été notifié et peut maintenant démarrer le suivi de travail.
          </p>
          <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Mission</span>
              <span className="font-semibold text-slate-900">{form.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Début</span>
              <span className="font-semibold text-slate-900">{form.startDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Prix</span>
              <span className="font-bold text-brand">{form.price} DH</span>
            </div>
          </div>
          <button onClick={() => onNavigate('progress')}
            className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md mb-3">
            Suivre l'avancement →
          </button>
          <button onClick={() => onNavigate('home')}
            className="w-full text-slate-500 text-sm hover:text-brand transition-colors py-2">
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button onClick={() => onNavigate('profile')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand transition-colors mb-6">
          <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour au profil
        </button>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold text-slate-900 mb-2">Accord de service</h1>
          <p className="text-slate-500">Définissez les modalités de la mission avec votre professionnel</p>
        </div>

        {/* Professional mini card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 mb-6">
          <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=80&h=80&fit=crop&auto=format"
            alt="Mohammed Alami" className="w-14 h-14 rounded-xl object-cover bg-slate-100" />
          <div className="flex-1">
            <div className="font-display font-bold text-slate-900">Mohammed Alami</div>
            <div className="text-slate-500 text-sm">Électricien certifié · Casablanca</div>
          </div>
          <div className="text-right">
            <div className="font-display font-bold text-brand text-lg">150 DH/h</div>
            <div className="inline-flex items-center gap-1 bg-verified-light text-verified text-xs font-semibold px-2.5 py-1 rounded-full">
              <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Vérifié
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-6 pt-6 pb-2 border-b border-slate-50">
            <h2 className="font-display font-bold text-slate-900 text-lg">Détails de la mission</h2>
          </div>

          <div className="p-6 space-y-5">
            <div>
              <label htmlFor="mission-title" className="block text-sm font-semibold text-slate-700 mb-1.5">Titre de la mission *</label>
              <input id="mission-title" value={form.title} onChange={e => set('title', e.target.value)}
                placeholder="ex: Installation tableau électrique villa"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
            </div>

            <div>
              <label htmlFor="mission-description" className="block text-sm font-semibold text-slate-700 mb-1.5">Description du service *</label>
              <textarea id="mission-description" value={form.description} onChange={e => set('description', e.target.value)}
                placeholder="Décrivez en détail le travail à réaliser, les matériaux à prévoir, les contraintes particulières…"
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="mission-start-date" className="block text-sm font-semibold text-slate-700 mb-1.5">Date de début *</label>
                <input id="mission-start-date" type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
              </div>
              <div>
                <label htmlFor="mission-end-date" className="block text-sm font-semibold text-slate-700 mb-1.5">Date de fin estimée</label>
                <input id="mission-end-date" type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="mission-location" className="block text-sm font-semibold text-slate-700 mb-1.5">Lieu d'intervention *</label>
              <input id="mission-location" value={form.location} onChange={e => set('location', e.target.value)}
                placeholder="Adresse complète ou quartier"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
            </div>

            <div>
              <span className="block text-sm font-semibold text-slate-700 mb-2">Type de tarification</span>
              <div className="flex gap-3">
                {[
                  { val: 'fixed', label: 'Prix fixe', desc: 'Montant total convenu' },
                  { val: 'hourly', label: 'Par heure', desc: 'Tarif horaire × durée' },
                  { val: 'estimate', label: 'Sur devis', desc: 'À définir ensemble' },
                ].map(opt => (
                  <label key={opt.val}
                    className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      form.priceType === opt.val ? 'border-brand bg-accent-light' : 'border-slate-200 hover:border-slate-300'
                    }`}>
                    <input type="radio" name="priceType" value={opt.val} checked={form.priceType === opt.val}
                      onChange={e => set('priceType', e.target.value)} className="sr-only" />
                    <div className={`text-sm font-bold ${form.priceType === opt.val ? 'text-brand' : 'text-slate-700'}`}>{opt.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            {form.priceType !== 'estimate' && (
              <div>
                <label htmlFor="mission-price" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {form.priceType === 'fixed' ? 'Prix total (DH) *' : 'Tarif horaire (DH/h) *'}
                </label>
                <div className="relative">
                  <input id="mission-price" type="number" value={form.price} onChange={e => set('price', e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-4 pr-14 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                    {form.priceType === 'hourly' ? 'DH/h' : 'DH'}
                  </span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="mission-status" className="block text-sm font-semibold text-slate-700 mb-1.5">Statut initial</label>
              <select id="mission-status" value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-brand bg-white focus:ring-2 focus:ring-brand/10 transition-all">
                {statusOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="mission-notes" className="block text-sm font-semibold text-slate-700 mb-1.5">Notes supplémentaires</label>
              <textarea id="mission-notes" value={form.notes} onChange={e => set('notes', e.target.value)}
                placeholder="Conditions particulières, matériaux fournis par le client, accès au chantier…"
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all resize-none" />
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
              <span className="text-amber-500 text-lg flex-shrink-0">⚠️</span>
              <p className="text-amber-800 text-xs leading-relaxed">
                En confirmant cet accord, les deux parties s'engagent à respecter les termes définis.
                Cet accord est enregistré sur la plateforme FORSSA et servira de référence tout au long de la mission.
              </p>
            </div>

            <button onClick={handleConfirm}
              disabled={!form.title || !form.description || !form.startDate || (!form.price && form.priceType !== 'estimate')}
              className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md text-base disabled:opacity-60 disabled:cursor-not-allowed">
              Confirmer l'accord
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
