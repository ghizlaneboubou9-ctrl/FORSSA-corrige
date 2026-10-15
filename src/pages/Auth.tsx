import { useState } from 'react'
import { PageType } from '../App'
import type { Professional } from '../data/mockData'
import { loginAccount, registerAccount } from '../lib/database'

interface AuthProps {
  readonly onNavigate: (page: PageType, data?: Professional) => void
}

type AuthMode = 'login' | 'register'
type UserType = 'client' | 'professional' | 'company'

const userTypes: { val: UserType; label: string; desc: string; emoji: string }[] = [
  { val: 'client', label: 'Client', desc: 'Je cherche un professionnel pour mes projets', emoji: '🏠' },
  { val: 'professional', label: 'Professionnel', desc: 'Je propose mes compétences et services', emoji: '🔧' },
  { val: 'company', label: 'Entreprise', desc: 'Je gère une équipe ou cherche des talents', emoji: '🏢' },
]

export default function Auth({ onNavigate }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [userType, setUserType] = useState<UserType>('client')
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    email: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', phone: '', city: '',
    profession: '', company: '', siret: '',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await loginAccount(form.email, form.password)
      onNavigate('dashboard')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Connexion impossible. Vérifiez vos identifiants et la configuration Supabase.')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) { setStep(2); return }
    if (form.password !== form.confirmPassword) { alert('Les mots de passe ne correspondent pas.'); return }
    try {
      await registerAccount({ email: form.email, password: form.password, fullName: `${form.firstName} ${form.lastName}`.trim(), role: userType })
      alert('Compte créé. Vérifiez votre e-mail si la confirmation est activée dans Supabase.')
      onNavigate('dashboard')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Inscription impossible. Vérifiez la configuration Supabase.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 bg-brand p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-muted opacity-40" />
          <div className="absolute bottom-10 -left-10 w-60 h-60 rounded-full bg-accent opacity-10" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 mb-16">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-extrabold text-lg">K</span>
            </div>
            <span className="font-display font-extrabold text-2xl text-white">FORSSA</span>
          </button>

          <h2 className="font-display text-4xl font-extrabold text-white leading-tight mb-5">
            La plateforme de confiance pour vos projets
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-10">
            Connectez-vous avec des milliers de professionnels vérifiés au Maroc. Confiance, transparence et qualité garanties.
          </p>

          <div className="space-y-4">
            {[
              { icon: '🛡️', text: '+15 000 professionnels vérifiés' },
              { icon: '⭐', text: '98% de taux de satisfaction client' },
              { icon: '📊', text: 'Suivi de travail par étapes' },
              { icon: '🔒', text: 'Paiement sécurisé et protégé' },
            ].map(item => (
              <div key={item.icon} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm">{item.icon}</div>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <img src="https://images.unsplash.com/photo-1758518727984-17b37f2f0562?w=48&h=48&fit=crop"
                className="w-10 h-10 rounded-full object-cover" alt="Testimonial" />
              <div>
                <div className="font-semibold text-white text-sm">Rachid Bennani</div>
                <div className="text-slate-400 text-xs">Client vérifié, Casablanca</div>
              </div>
            </div>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              "J'ai trouvé un électricien qualifié en 2 heures. Le suivi de travail étape par étape m'a rassuré tout au long du projet."
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <button onClick={() => onNavigate('home')}
            className="lg:hidden flex items-center gap-2 text-sm text-slate-500 hover:text-brand mb-8">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour à l'accueil
          </button>

          {/* Mode switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button onClick={() => { setMode('login'); setStep(1) }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mode === 'login' ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}>
              Se connecter
            </button>
            <button onClick={() => { setMode('register'); setStep(1) }}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mode === 'register' ? 'bg-white text-brand shadow-sm' : 'text-slate-500'}`}>
              Créer un compte
            </button>
          </div>

          {mode === 'login' ? (
            <>
              <div className="mb-8">
                <h1 className="font-display text-3xl font-extrabold text-slate-900 mb-2">Bienvenue 👋</h1>
                <p className="text-slate-500">Connectez-vous à votre espace FORSSA</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-sm font-semibold text-slate-700 mb-1.5">Adresse e-mail</label>
                  <input id="login-email" type="email" value={form.email} onChange={e => set('email', e.target.value)} required
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="login-password" className="text-sm font-semibold text-slate-700">Mot de passe</label>
                    <button type="button" className="text-xs text-accent hover:underline">Mot de passe oublié ?</button>
                  </div>
                  <input id="login-password" type="password" value={form.password} onChange={e => set('password', e.target.value)} required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                </div>

                <button type="submit"
                  className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md mt-2">
                  Se connecter
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-500 text-sm">
                  Pas encore de compte ?{' '}
                  <button onClick={() => setMode('register')} className="text-accent font-semibold hover:underline">
                    Créer un compte
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-display text-3xl font-extrabold text-slate-900">
                    {step === 1 ? 'Créer un compte' : 'Votre profil'}
                  </h1>
                  <span className="bg-slate-100 text-slate-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Étape {step}/2
                  </span>
                </div>
                <p className="text-slate-500">
                  {step === 1 ? 'Choisissez votre type de compte et vos identifiants' : 'Complétez votre profil professionnel'}
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {step === 1 ? (
                  <>
                    {/* User type */}
                    <div>
                      <span className="block text-sm font-semibold text-slate-700 mb-2">Je suis un…</span>
                      <div className="space-y-2">
                        {userTypes.map(t => (
                          <label key={t.val}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                              userType === t.val ? 'border-brand bg-accent-light/30' : 'border-slate-200 hover:border-slate-300'
                            }`}>
                            <input type="radio" name="userType" value={t.val} checked={userType === t.val}
                              onChange={() => setUserType(t.val)} className="sr-only" />
                            <span className="text-xl">{t.emoji}</span>
                            <div>
                              <div className={`text-sm font-bold ${userType === t.val ? 'text-brand' : 'text-slate-800'}`}>{t.label}</div>
                              <div className="text-xs text-slate-500">{t.desc}</div>
                            </div>
                            {userType === t.val && (
                              <svg aria-hidden="true" className="w-5 h-5 text-brand ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="register-email" className="block text-sm font-semibold text-slate-700 mb-1.5">Adresse e-mail</label>
                      <input id="register-email" type="email" value={form.email} onChange={e => set('email', e.target.value)} required
                        placeholder="votre@email.com"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mot de passe</label>
                      <input id="register-password" type="password" value={form.password} onChange={e => set('password', e.target.value)} required
                        placeholder="Minimum 8 caractères"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="register-first-name" className="block text-sm font-semibold text-slate-700 mb-1.5">Prénom</label>
                        <input id="register-first-name" value={form.firstName} onChange={e => set('firstName', e.target.value)} required
                          placeholder="Mohammed"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                      </div>
                      <div>
                        <label htmlFor="register-last-name" className="block text-sm font-semibold text-slate-700 mb-1.5">Nom</label>
                        <input id="register-last-name" value={form.lastName} onChange={e => set('lastName', e.target.value)} required
                          placeholder="Alami"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="register-phone" className="block text-sm font-semibold text-slate-700 mb-1.5">Téléphone</label>
                      <input id="register-phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} required
                        placeholder="+212 6XX XXX XXX"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                    </div>

                    <div>
                      <label htmlFor="register-city" className="block text-sm font-semibold text-slate-700 mb-1.5">Ville</label>
                      <select id="register-city" value={form.city} onChange={e => set('city', e.target.value)} required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-brand bg-white focus:ring-2 focus:ring-brand/10 transition-all">
                        <option value="">Sélectionnez votre ville</option>
                        {['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda'].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {userType === 'professional' && (
                      <div>
                        <label htmlFor="register-profession" className="block text-sm font-semibold text-slate-700 mb-1.5">Profession / Spécialité</label>
                        <input id="register-profession" value={form.profession} onChange={e => set('profession', e.target.value)}
                          placeholder="ex: Électricien, Plombier, Développeur web…"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                      </div>
                    )}

                    {userType === 'company' && (
                      <div>
                        <label htmlFor="register-company" className="block text-sm font-semibold text-slate-700 mb-1.5">Nom de l'entreprise</label>
                        <input id="register-company" value={form.company} onChange={e => set('company', e.target.value)}
                          placeholder="Nom légal de la société"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all" />
                      </div>
                    )}
                  </>
                )}

                <button type="submit"
                  className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md mt-2">
                  {step === 1 ? 'Continuer →' : 'Créer mon compte'}
                </button>
              </form>

              {step === 1 && (
                <p className="mt-6 text-center text-slate-500 text-sm">
                  Déjà inscrit ?{' '}
                  <button onClick={() => setMode('login')} className="text-accent font-semibold hover:underline">
                    Se connecter
                  </button>
                </p>
              )}

              {step === 2 && (
                <button onClick={() => setStep(1)} className="mt-4 w-full text-slate-500 text-sm hover:text-brand transition-colors py-2">
                  ← Étape précédente
                </button>
              )}
            </>
          )}

          <p className="mt-8 text-center text-slate-400 text-xs leading-relaxed">
            En continuant, vous acceptez les{' '}
            <button className="text-brand hover:underline">Conditions d'utilisation</button>
            {' '}et la{' '}
            <button className="text-brand hover:underline">Politique de confidentialité</button>{' '}de FORSSA.
          </p>
        </div>
      </div>
    </div>
  )
}
