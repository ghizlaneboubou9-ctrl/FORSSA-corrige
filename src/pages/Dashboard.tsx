import { useState } from 'react'
import { PageType } from '../App'
import type { Professional } from '../data/mockData'
import { StarRating, VerifiedBadge } from '../components/ui'

interface DashboardProps {
  readonly onNavigate: (page: PageType, data?: Professional) => void
}

type DashRole = 'client' | 'professional' | 'company'

const clientJobs = [
  { id: 1, title: 'Installation tableau électrique', pro: 'Mohammed Alami', status: 'active', date: '16 Sept. 2026', price: '2 500 DH', progress: 60 },
  { id: 2, title: 'Réparation fuite plomberie', pro: 'Youssef Benali', status: 'upcoming', date: '20 Sept. 2026', price: '800 DH', progress: 0 },
  { id: 3, title: 'Peinture salon & chambre', pro: 'Omar Chraibi', status: 'completed', date: '10 Sept. 2026', price: '3 200 DH', progress: 100 },
]

const proJobs = [
  { id: 1, title: 'Installation panneau solaire', client: 'Rachid Bennani', status: 'active', date: '16 Sept. 2026', price: '4 500 DH', progress: 40 },
  { id: 2, title: 'Câblage réseau bureau', client: 'Nadia Alaoui', status: 'upcoming', date: '22 Sept. 2026', price: '1 800 DH', progress: 0 },
  { id: 3, title: 'Rénovation tableau électrique', client: 'Amine Fassi', status: 'completed', date: '8 Sept. 2026', price: '2 100 DH', progress: 100 },
]

const notifications = [
  { id: 1, type: 'message', text: 'Youssef Benali a envoyé un message concernant votre mission', time: 'Il y a 2h', read: false },
  { id: 2, type: 'update', text: 'Étape 2 validée par Mohammed Alami — photos disponibles', time: 'Il y a 4h', read: false },
  { id: 3, type: 'review', text: 'Nouveau avis 5 ⭐ publié sur votre profil', time: 'Hier', read: true },
  { id: 4, type: 'payment', text: 'Paiement de 3 200 DH confirmé pour la mission terminée', time: 'Il y a 2j', read: true },
]

const messages = [
  { id: 1, from: 'Mohammed Alami', preview: 'Bonjour, j\'ai acheté les matériaux et serai sur place demain matin…', time: '14:30', unread: 2, photo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e' },
  { id: 2, from: 'Youssef Benali', preview: 'Pouvez-vous confirmer l\'heure d\'accès pour vendredi ?', time: '11:15', unread: 1, photo: 'https://images.unsplash.com/photo-1676210133055-eab6ef033ce3' },
  { id: 3, from: 'Sara Mansouri', preview: 'Merci pour votre confiance ! J\'ai bien reçu votre demande.', time: 'Hier', unread: 0, photo: 'https://images.unsplash.com/photo-1672748341520-6a839e6c05bb' },
]

function StatusBadge({ status }: { readonly status: string }) {
  const map: Record<string, string> = {
    active: 'bg-accent-light text-accent',
    upcoming: 'bg-amber-50 text-amber-700',
    completed: 'bg-verified-light text-verified',
  }
  const labels: Record<string, string> = {
    active: 'En cours', upcoming: 'À venir', completed: 'Terminé'
  }
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${map[status] || 'bg-slate-100 text-slate-500'}`}>
      {labels[status] || status}
    </span>
  )
}

type Job = {
  title: string
  status: string
  date: string
  price: string
  progress: number
  pro?: string
  client?: string
}

function JobCard({ job, role, onNavigate }: { readonly job: Job; readonly role: DashRole; readonly onNavigate: (p: PageType) => void }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 hover:border-slate-200 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="font-display font-semibold text-slate-900 text-sm mb-0.5">{job.title}</h4>
          <p className="text-slate-400 text-xs">{role === 'client' ? `avec ${job.pro}` : `Client : ${job.client}`} · {job.date}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>
      {job.status === 'active' && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Avancement</span>
            <span className="font-bold text-slate-700">{job.progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${job.progress}%` }} />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="font-display font-bold text-brand text-sm">{job.price}</span>
        <div className="flex gap-2">
          {job.status === 'active' && (
            <button onClick={() => onNavigate('progress')}
              className="text-xs font-semibold text-accent hover:underline">
              Voir progrès →
            </button>
          )}
          {job.status === 'completed' && role === 'client' && (
            <button onClick={() => onNavigate('reviews')}
              className="text-xs font-semibold text-brand hover:underline">
              Laisser un avis
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [role, setRole] = useState<DashRole>('client')
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'messages' | 'notifications'>('overview')

  const jobs = role === 'client' ? clientJobs : proJobs
  const activeJobs = jobs.filter(j => j.status === 'active')
  const upcomingJobs = jobs.filter(j => j.status === 'upcoming')
  const completedJobs = jobs.filter(j => j.status === 'completed')
  const unreadNotifs = notifications.filter(n => !n.read).length

  const proStats = [
    { label: 'Note globale', value: '4.9', icon: '⭐', trend: '+0.2' },
    { label: 'Missions ce mois', value: '8', icon: '✅', trend: '+3' },
    { label: 'Revenus sept.', value: '12 400 DH', icon: '💰', trend: '+18%' },
    { label: 'Taux réponse', value: '97%', icon: '⚡', trend: 'stable' },
  ]

  const clientStats = [
    { label: 'Missions actives', value: '1', icon: '🔧', trend: '' },
    { label: 'À venir', value: '1', icon: '📅', trend: '' },
    { label: 'Terminées', value: '3', icon: '✅', trend: '' },
    { label: 'Total dépensé', value: '6 500 DH', icon: '💳', trend: '' },
  ]

  const stats = role === 'client' ? clientStats : proStats

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-slate-900">Tableau de bord</h1>
              <p className="text-slate-500 text-sm">Bienvenue, Rachid 👋 — Mercredi 17 septembre 2026</p>
            </div>

            {/* Role switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
              {([
                { val: 'client', label: '🏠 Client' },
                { val: 'professional', label: '🔧 Professionnel' },
                { val: 'company', label: '🏢 Entreprise' },
              ] as const).map(opt => (
                <button key={opt.val} onClick={() => setRole(opt.val)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    role === opt.val ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto">
            {([
              { key: 'overview', label: 'Vue d\'ensemble' },
              { key: 'jobs', label: 'Missions' },
              { key: 'messages', label: 'Messages', badge: messages.reduce((s, m) => s + m.unread, 0) },
              { key: 'notifications', label: 'Notifications', badge: unreadNotifs },
            ] as const).map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? 'border-brand text-brand'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}>
                {tab.label}
                {'badge' in tab && tab.badge > 0 && (
                  <span className="w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {'badge' in tab ? tab.badge : null}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="text-2xl mb-3">{stat.icon}</div>
                  <div className="font-display font-extrabold text-slate-900 text-2xl mb-1">{stat.value}</div>
                  <div className="text-slate-500 text-xs">{stat.label}</div>
                  {stat.trend && (
                    <div className="mt-2 text-xs text-verified font-semibold">{stat.trend}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Active jobs */}
            <div>
              <h2 className="font-display font-bold text-slate-900 text-lg mb-4">Missions en cours</h2>
              {activeJobs.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 text-sm">
                  Aucune mission en cours
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeJobs.map(j => <JobCard key={j.id} job={j} role={role} onNavigate={onNavigate} />)}
                </div>
              )}
            </div>

            {/* Pro: profile card */}
            {role === 'professional' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="font-display font-bold text-slate-900 text-lg mb-5">Statut du profil</h2>
                <div className="flex items-center gap-4 mb-6">
                  <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=80&h=80&fit=crop"
                    className="w-16 h-16 rounded-2xl object-cover bg-slate-100" alt="Profile" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-slate-900">Mohammed Alami</span>
                      <VerifiedBadge label="Vérifié" />
                    </div>
                    <div className="text-slate-500 text-sm">Électricien certifié · Casablanca</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <StarRating rating={4.9} size="sm" />
                      <span className="text-sm font-bold text-slate-900">4.9</span>
                      <span className="text-slate-400 text-xs">(87 avis)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Profil complété', pct: 92, ok: true },
                    { label: 'Documents vérifiés', pct: 100, ok: true },
                    { label: 'Portfolio renseigné', pct: 75, ok: false },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600">{item.label}</span>
                        <span className={`font-bold ${item.ok ? 'text-verified' : 'text-amber-500'}`}>{item.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.ok ? 'bg-verified' : 'bg-amber-400'}`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Company: team overview */}
            {role === 'company' && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="font-display font-bold text-slate-900 text-lg mb-5">Vue équipe</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Employés actifs', value: '12', icon: '👤' },
                    { label: 'Contrats ouverts', value: '5', icon: '📋' },
                    { label: 'Budget mensuel', value: '48 000 DH', icon: '💰' },
                  ].map(item => (
                    <div key={item.label} className="bg-slate-50 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="font-display font-bold text-slate-900 text-xl">{item.value}</div>
                      <div className="text-slate-500 text-xs">{item.label}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate('search')}
                  className="w-full bg-brand text-white font-bold py-3 rounded-xl hover:bg-brand-dark transition-all">
                  Recruter de nouveaux professionnels
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-8">
            {[
              { title: '🔧 En cours', jobs: activeJobs },
              { title: '📅 À venir', jobs: upcomingJobs },
              { title: '✅ Terminées', jobs: completedJobs },
            ].map(section => (
              <div key={section.title}>
                <h2 className="font-display font-bold text-slate-900 text-lg mb-4">{section.title}</h2>
                {section.jobs.length === 0 ? (
                  <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 text-sm">
                    Aucune mission dans cette catégorie
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.jobs.map(j => <JobCard key={j.id} job={j} role={role} onNavigate={onNavigate} />)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="font-display font-bold text-slate-900 text-lg">Messages</h2>
            </div>
            <div>
              {messages.map((msg, i) => (
                <div key={msg.id}
                  className={`flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors cursor-pointer ${i < messages.length - 1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="relative flex-shrink-0">
                    <img src={`${msg.photo}?w=60&h=60&fit=crop`} alt={msg.from}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                    {msg.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {msg.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${msg.unread > 0 ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                        {msg.from}
                      </span>
                      <span className="text-xs text-slate-400">{msg.time}</span>
                    </div>
                    <p className={`text-xs leading-relaxed truncate ${msg.unread > 0 ? 'text-slate-700' : 'text-slate-400'}`}>
                      {msg.preview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-display font-bold text-slate-900 text-lg">Notifications</h2>
              <button className="text-xs text-accent hover:underline font-medium">Tout marquer comme lu</button>
            </div>
            <div>
              {notifications.map((notif, i) => {
                const icons: Record<string, string> = { message: '💬', update: '📊', review: '⭐', payment: '💰' }
                return (
                  <div key={notif.id}
                    className={`flex items-start gap-4 p-5 transition-colors ${notif.read ? '' : 'bg-accent-light/20'} ${i < notifications.length - 1 ? 'border-b border-slate-50' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${notif.read ? 'bg-slate-50' : 'bg-accent-light'}`}>
                      {icons[notif.type]}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm leading-relaxed ${notif.read ? 'text-slate-500' : 'text-slate-800 font-medium'}`}>
                        {notif.text}
                      </p>
                      <span className="text-xs text-slate-400 mt-1 block">{notif.time}</span>
                    </div>
                    {!notif.read && <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
