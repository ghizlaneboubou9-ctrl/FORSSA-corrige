import { supabase } from './supabase'

export type ProfessionalRecord = { id: string; name: string; profession: string; location: string; description: string; category: string; hourly_rate: number; available: boolean; photo_url: string | null }

/** Fetches live profiles when Supabase is configured; returns [] if not configured. */
export async function getProfessionals() {
  if (!supabase) return [] as ProfessionalRecord[]
  const { data, error } = await supabase.from('professionals').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as ProfessionalRecord[]
}

export async function createProfessional(profile: Omit<ProfessionalRecord, 'id'>) {
  if (!supabase) throw new Error('Configurez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local.')
  const { data, error } = await supabase.from('professionals').insert(profile).select().single()
  if (error) throw error
  return data as ProfessionalRecord
}

export async function registerAccount(input: { email: string; password: string; fullName: string; role: 'client' | 'professional' | 'company' }) {
  if (!supabase) throw new Error('Supabase n’est pas configuré. Consultez README.md.')
  const { data, error } = await supabase.auth.signUp({ email: input.email, password: input.password, options: { data: { full_name: input.fullName, role: input.role } } })
  if (error) throw error
  return data
}

export async function loginAccount(email: string, password: string) {
  if (!supabase) throw new Error('Supabase n’est pas configuré. Consultez README.md.')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}
