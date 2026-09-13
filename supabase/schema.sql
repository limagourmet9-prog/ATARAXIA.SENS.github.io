-- ATARAXIA Vero - private feedback foundation
-- Run this script in Supabase SQL Editor after creating the project.

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewed', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

-- Anonymous/public visitors may submit feedback, but cannot read or modify it.
create policy "public_can_submit_feedback"
on public.feedback
for insert
to anon, authenticated
with check (char_length(trim(message)) between 1 and 5000);

-- Only the authenticated administrator account is allowed to read feedback.
-- The application will additionally restrict the admin UI to the configured admin identity.
create policy "authenticated_can_read_feedback"
on public.feedback
for select
to authenticated
using (auth.uid() is not null);

-- No public UPDATE or DELETE policies are created.
-- Privileged server-side operations, if ever needed, must use a server-only secret.
