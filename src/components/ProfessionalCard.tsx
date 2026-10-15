import { Professional } from '../data/mockData'
import { StarRating, AvailabilityBadge } from './ui'
import { PageType } from '../App'

interface ProfessionalCardProps {
  readonly pro: Professional
  readonly onNavigate: (page: PageType, data?: Professional) => void
  readonly variant?: 'default' | 'compact' | 'horizontal'
}

export default function ProfessionalCard({ pro, onNavigate, variant = 'default' }: ProfessionalCardProps) {
  if (variant === 'horizontal') {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-5 flex gap-5 hover:shadow-md transition-all hover:border-slate-200 group">
        <div className="relative flex-shrink-0">
          <img
            src={`${pro.photo}?w=96&h=96&fit=crop&auto=format`}
            alt={pro.name}
            className="w-20 h-20 rounded-2xl object-cover bg-slate-100"
          />
          {pro.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-verified rounded-full flex items-center justify-center shadow-sm">
              <svg aria-hidden="true" className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-display font-bold text-slate-900 text-base">{pro.name}</h3>
              <p className="text-slate-500 text-sm">{pro.profession}</p>
            </div>
            <AvailabilityBadge available={pro.available} />
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {pro.location}
          </div>
          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={pro.rating} />
            <span className="font-bold text-sm text-slate-900">{pro.rating}</span>
            <span className="text-slate-400 text-xs">({pro.reviewCount} avis)</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 text-xs">{pro.completedJobs} missions</span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3">{pro.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {pro.skills.slice(0, 3).map(s => (
              <span key={s} className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-lg">{s}</span>
            ))}
            {pro.skills.length > 3 && (
              <span className="bg-slate-50 text-slate-400 text-xs px-2.5 py-1 rounded-lg">+{pro.skills.length - 3}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0">
          <span className="font-display font-bold text-brand text-base">{pro.hourlyRate} <span className="text-xs font-normal text-slate-400">DH/h</span></span>
          <button
            onClick={() => onNavigate('profile', pro)}
            className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md whitespace-nowrap">
            Voir profil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 hover:border-slate-200 group flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <img
            src={`${pro.photo}?w=80&h=80&fit=crop&auto=format`}
            alt={pro.name}
            className="w-16 h-16 rounded-2xl object-cover bg-slate-100"
          />
          {pro.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-verified rounded-full flex items-center justify-center shadow-sm">
              <svg aria-hidden="true" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-slate-900 text-sm mb-0.5 truncate">{pro.name}</h3>
          <p className="text-slate-500 text-xs mb-1.5">{pro.profession}</p>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <svg aria-hidden="true" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {pro.location}
          </div>
        </div>
        <AvailabilityBadge available={pro.available} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <StarRating rating={pro.rating} />
        <span className="font-bold text-sm text-slate-900">{pro.rating}</span>
        <span className="text-slate-400 text-xs">({pro.reviewCount} avis)</span>
      </div>

      <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">{pro.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {pro.skills.slice(0, 2).map(s => (
          <span key={s} className="bg-accent-light text-accent text-xs px-2.5 py-1 rounded-lg font-medium">{s}</span>
        ))}
        {pro.skills.length > 2 && (
          <span className="bg-slate-50 text-slate-400 text-xs px-2.5 py-1 rounded-lg">+{pro.skills.length - 2}</span>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <div>
          <span className="font-display font-bold text-brand text-base">{pro.hourlyRate}</span>
          <span className="text-slate-400 text-xs ml-1">DH/h</span>
        </div>
        <button
          onClick={() => onNavigate('profile', pro)}
          className="bg-brand text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-dark transition-all hover:shadow-md">
          Voir profil
        </button>
      </div>
    </div>
  )
}
