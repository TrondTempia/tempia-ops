-- BYGG
create table if not exists public.buildings (
  id uuid primary key default gen_random_uuid(),
  number int not null unique check (number between 40 and 130),
  name text,
  address text,
  created_at timestamptz default now()
);

-- PROSEDYRER (ferdige dokumenter med lenke)
create table if not exists public.procedures (
  id uuid primary key default gen_random_uuid(),
  code text,
  title text not null,
  link text not null,
  created_at timestamptz default now()
);

-- FDV-FILER (PDF i Supabase Storage)
create table if not exists public.fdv_files (
  id uuid primary key default gen_random_uuid(),
  building_id uuid not null references public.buildings(id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  uploaded_by uuid default auth.uid(),
  uploaded_at timestamptz default now(),
  version int default 1,
  tags text[]
);

-- FLOW (klikkbar flyt + noder/kanter)
create table if not exists public.flows (
  id uuid primary key default gen_random_uuid(),
  building_id uuid not null references public.buildings(id) on delete cascade,
  title text not null,
  created_by uuid default auth.uid(),
  created_at timestamptz default now()
);

create table if not exists public.flow_nodes (
  id uuid primary key default gen_random_uuid(),
  flow_id uuid not null references public.flows(id) on delete cascade,
  label text not null,
  type text check (type in ('start','step','decision','end')) default 'step',
  procedure_id uuid references public.procedures(id),
  x int default 0,
  y int default 0
);

create table if not exists public.flow_edges (
  id uuid primary key default gen_random_uuid(),
  flow_id uuid not null references public.flows(id) on delete cascade,
  source uuid not null references public.flow_nodes(id) on delete cascade,
  target uuid not null references public.flow_nodes(id) on delete cascade
);

-- Enable RLS
alter table public.buildings enable row level security;
alter table public.procedures enable row level security;
alter table public.fdv_files enable row level security;
alter table public.flows enable row level security;
alter table public.flow_nodes enable row level security;
alter table public.flow_edges enable row level security;

-- Helper function to get role from JWT
create or replace function public.jwt_role()
returns text language sql stable
as $$ select coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), 'admin') $$;

-- RLS Policies
-- Buildings
create policy b_sel on public.buildings for select using (true);
create policy b_cud on public.buildings for all using (public.jwt_role() <> 'viewer') with check (public.jwt_role() <> 'viewer');

-- Procedures
create policy p_sel on public.procedures for select using (true);
create policy p_cud on public.procedures for all using (public.jwt_role() <> 'viewer') with check (public.jwt_role() <> 'viewer');

-- FDV Files
create policy fdv_sel on public.fdv_files for select using (true);
create policy fdv_cud on public.fdv_files for all using (public.jwt_role() <> 'viewer') with check (public.jwt_role() <> 'viewer');

-- Flows
create policy f_sel on public.flows for select using (true);
create policy f_cud on public.flows for all using (public.jwt_role() <> 'viewer') with check (public.jwt_role() <> 'viewer');

-- Flow Nodes
create policy fn_sel on public.flow_nodes for select using (true);
create policy fn_cud on public.flow_nodes for all using (public.jwt_role() <> 'viewer') with check (public.jwt_role() <> 'viewer');

-- Flow Edges
create policy fe_sel on public.flow_edges for select using (true);
create policy fe_cud on public.flow_edges for all using (public.jwt_role() <> 'viewer') with check (public.jwt_role() <> 'viewer');

-- Seed Buildings (40-130)
insert into public.buildings (number, name) 
select i, null 
from generate_series(40, 130) as i
on conflict (number) do nothing;