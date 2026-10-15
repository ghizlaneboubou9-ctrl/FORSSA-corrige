import React from 'react'

export function StarRating({ rating, max = 5, size = 'sm' }: { readonly rating: number; readonly max?: number; readonly size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' }
  return (
    <div role="img" aria-label={`Note ${rating} sur ${max}`} className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, index) => index + 1).map(star => (
        <svg aria-hidden="true" key={star} className={`${sizes[size]} ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function InteractiveStar({ rating, onRate }: { readonly rating: number; readonly onRate: (r: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button key={star} type="button" aria-label={`Donner ${star} étoile${star > 1 ? 's' : ''}`} onClick={() => onRate(star)} className="transition-transform hover:scale-110 active:scale-95">
          <svg aria-hidden="true" className={`w-8 h-8 transition-colors ${star <= rating ? 'text-amber-400' : 'text-slate-200 hover:text-amber-200'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

export function VerifiedBadge({ label = 'Vérifié' }: { readonly label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-verified-light text-verified text-xs font-semibold px-2.5 py-1 rounded-full">
      <svg aria-hidden="true" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      {label}
    </span>
  )
}

export function AvailabilityBadge({ available }: { readonly available: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${available ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${available ? 'bg-green-500' : 'bg-slate-400'}`} />
      {available ? 'Disponible' : 'Indisponible'}
    </span>
  )
}

export function PrimaryButton({ children, onClick, className = '', type = 'button', disabled = false }: {
  readonly children: React.ReactNode; readonly onClick?: () => void; readonly className?: string; readonly type?: 'button' | 'submit'; readonly disabled?: boolean
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`bg-brand text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-dark transition-all duration-200 hover:shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}>
      {children}
    </button>
  )
}

export function SecondaryButton({ children, onClick, className = '' }: {
  readonly children: React.ReactNode; readonly onClick?: () => void; readonly className?: string
}) {
  return (
    <button onClick={onClick}
      className={`border-2 border-brand text-brand font-semibold px-5 py-2.5 rounded-xl hover:bg-brand hover:text-white transition-all duration-200 ${className}`}>
      {children}
    </button>
  )
}

export function Badge({ children, variant = 'default' }: {
  readonly children: React.ReactNode; readonly variant?: 'default' | 'success' | 'warning' | 'info' | 'error'
}) {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-amber-50 text-amber-700',
    info: 'bg-blue-50 text-blue-700',
    error: 'bg-red-50 text-red-700',
  }
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}

export function LocationIcon({ className = 'w-4 h-4' }: { readonly className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export function CheckIcon({ className = 'w-4 h-4' }: { readonly className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function SectionHeader({ title, subtitle, center = false }: { readonly title: string; readonly subtitle?: string; readonly center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">{title}</h2>
      {subtitle && <p className="text-slate-500 text-lg max-w-2xl">{subtitle}</p>}
    </div>
  )
}
