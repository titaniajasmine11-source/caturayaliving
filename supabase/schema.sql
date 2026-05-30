create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  location text not null,
  need text not null,
  area text not null,
  size text,
  budget text,
  notes text,
  source text default 'website',
  status text not null default 'new',
  updated_at timestamptz not null default now(),
  constraint leads_status_check check (status in ('new', 'contacted', 'consulting', 'estimate_requested', 'survey_scheduled', 'survey_done', 'proposal_sent', 'negotiation', 'won', 'lost', 'follow_up_later'))
);

alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads add column if not exists updated_at timestamptz not null default now();
alter table public.leads add column if not exists follow_up_at timestamptz;
alter table public.leads add column if not exists survey_date timestamptz;
alter table public.leads add column if not exists assigned_to text;
alter table public.leads add column if not exists offer_value numeric;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'leads_status_check'
  ) then
    alter table public.leads add constraint leads_status_check check (status in ('new', 'contacted', 'consulting', 'estimate_requested', 'survey_scheduled', 'survey_done', 'proposal_sent', 'negotiation', 'won', 'lost', 'follow_up_later'));
  end if;
end $$;

alter table public.leads enable row level security;

drop policy if exists "service role can manage leads" on public.leads;
create policy "service role can manage leads"
on public.leads
for all
to service_role
using (true)
with check (true);

create table if not exists public.saved_designs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  phone text,
  room text not null,
  model text not null,
  material text not null,
  width numeric not null,
  length numeric not null,
  items text[] not null default '{}',
  notes text,
  source text default 'planner'
);

create table if not exists public.price_rules (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  service text not null,
  package text not null,
  unit text not null,
  base_price numeric not null,
  minimum_order numeric default 1,
  margin_percent numeric default 0,
  notes text,
  is_active boolean not null default true
);

create table if not exists public.content_calendar (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  publish_date date not null,
  channel text not null,
  topic text not null,
  format text not null,
  status text not null default 'idea',
  owner text,
  notes text,
  constraint content_calendar_status_check check (status in ('idea', 'draft', 'review', 'approved', 'published', 'archived'))
);

create table if not exists public.cms_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  type text not null,
  title text not null,
  slug text not null,
  status text not null default 'draft',
  summary text,
  body jsonb default '{}'::jsonb,
  seo_title text,
  seo_description text,
  constraint cms_items_status_check check (status in ('draft', 'review', 'approved', 'published', 'archived')),
  constraint cms_items_type_check check (type in ('service', 'area', 'portfolio', 'article', 'testimonial', 'faq', 'team', 'material'))
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  portfolio_slug text,
  media_url text not null,
  media_type text not null default 'image',
  caption text,
  sort_order numeric default 0,
  is_before boolean not null default false,
  is_after boolean not null default false,
  status text not null default 'draft',
  constraint project_media_type_check check (media_type in ('image', 'video')),
  constraint project_media_status_check check (status in ('draft', 'review', 'approved', 'published', 'archived'))
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  role text not null,
  phone text,
  status text not null default 'active',
  notes text,
  constraint team_members_status_check check (status in ('active', 'inactive', 'archived'))
);

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  category text not null,
  contact text,
  status text not null default 'active',
  notes text,
  constraint vendors_status_check check (status in ('active', 'inactive', 'archived'))
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  lead_id uuid references public.leads(id),
  customer_name text not null,
  invoice_number text not null,
  amount numeric not null default 0,
  status text not null default 'draft',
  due_date date,
  notes text,
  constraint invoices_status_check check (status in ('draft', 'sent', 'partial', 'paid', 'cancelled', 'archived'))
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  invoice_id uuid references public.invoices(id),
  amount numeric not null default 0,
  method text,
  paid_at timestamptz,
  status text not null default 'recorded',
  notes text,
  constraint payments_status_check check (status in ('recorded', 'verified', 'refunded', 'archived'))
);

alter table public.saved_designs enable row level security;
alter table public.price_rules enable row level security;
alter table public.content_calendar enable row level security;
alter table public.cms_items enable row level security;
alter table public.project_media enable row level security;
alter table public.team_members enable row level security;
alter table public.vendors enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;

drop policy if exists "service role can manage saved designs" on public.saved_designs;
drop policy if exists "service role can manage price rules" on public.price_rules;
drop policy if exists "service role can manage content calendar" on public.content_calendar;
drop policy if exists "service role can manage cms items" on public.cms_items;
drop policy if exists "service role can manage project media" on public.project_media;
drop policy if exists "service role can manage team members" on public.team_members;
drop policy if exists "service role can manage vendors" on public.vendors;
drop policy if exists "service role can manage invoices" on public.invoices;
drop policy if exists "service role can manage payments" on public.payments;

create policy "service role can manage saved designs" on public.saved_designs for all to service_role using (true) with check (true);
create policy "service role can manage price rules" on public.price_rules for all to service_role using (true) with check (true);
create policy "service role can manage content calendar" on public.content_calendar for all to service_role using (true) with check (true);
create policy "service role can manage cms items" on public.cms_items for all to service_role using (true) with check (true);
create policy "service role can manage project media" on public.project_media for all to service_role using (true) with check (true);
create policy "service role can manage team members" on public.team_members for all to service_role using (true) with check (true);
create policy "service role can manage vendors" on public.vendors for all to service_role using (true) with check (true);
create policy "service role can manage invoices" on public.invoices for all to service_role using (true) with check (true);
create policy "service role can manage payments" on public.payments for all to service_role using (true) with check (true);
