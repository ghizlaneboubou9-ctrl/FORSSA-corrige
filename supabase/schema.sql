-- FORSSA : schéma initial PostgreSQL pour Supabase
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('client','professional','company')),
  phone text, city text, created_at timestamptz not null default now()
);

create table if not exists public.professionals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  name text not null, profession text not null, location text not null default 'Maroc',
  description text not null default '', category text not null, hourly_rate numeric(10,2) not null default 0 check (hourly_rate >= 0),
  available boolean not null default true, photo_url text, skills text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id) on delete cascade,
  professional_id uuid not null references public.professionals(id) on delete cascade,
  title text not null, details text, city text not null, budget numeric(10,2),
  status text not null default 'pending' check (status in ('pending','accepted','in_progress','completed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null unique references public.missions(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  professional_id uuid not null references public.professionals(id) on delete cascade,
  rating int not null check (rating between 1 and 5), comment text, created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.professionals enable row level security;
alter table public.missions enable row level security;
alter table public.reviews enable row level security;

-- Public can read professional listings; signed-in professionals manage their own profile.
create policy "Public can view professionals" on public.professionals for select using (true);
create policy "Professionals create own listing" on public.professionals for insert to authenticated with check (user_id = auth.uid());
create policy "Professionals update own listing" on public.professionals for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Users read own profile" on public.profiles for select to authenticated using (id = auth.uid());
create policy "Users create own profile" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "Users update own profile" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "Clients read own missions" on public.missions for select to authenticated using (client_id = auth.uid() or exists (select 1 from public.professionals p where p.id = professional_id and p.user_id = auth.uid()));
create policy "Clients create missions" on public.missions for insert to authenticated with check (client_id = auth.uid());
create policy "Participants update mission" on public.missions for update to authenticated using (client_id = auth.uid() or exists (select 1 from public.professionals p where p.id = professional_id and p.user_id = auth.uid()));
create policy "Reviews visible to all" on public.reviews for select using (true);
create policy "Clients review own missions" on public.reviews for insert to authenticated with check (author_id = auth.uid() and exists (select 1 from public.missions m where m.id = mission_id and m.client_id = auth.uid() and m.status = 'completed'));

-- Create a profile row automatically after signup using metadata passed by the frontend.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name, role) values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', 'Utilisateur'), coalesce(new.raw_user_meta_data ->> 'role', 'client'));
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
