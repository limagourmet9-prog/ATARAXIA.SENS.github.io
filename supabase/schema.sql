-- ATARAXIA Vero - private feedback foundation
-- Run in Supabase SQL Editor after creating the project.

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewed', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

drop policy if exists "public_can_submit_feedback" on public.feedback;
drop policy if exists "authenticated_can_read_feedback" on public.feedback;
drop policy if exists "admin_can_read_feedback" on public.feedback;

create policy "public_can_submit_feedback"
on public.feedback
for insert
to anon, authenticated
with check (char_length(trim(message)) between 1 and 5000);

create policy "admin_can_read_feedback"
on public.feedback
for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- No UPDATE or DELETE policies are created for the public client.
-- Keep the Supabase service-role key server-side only if privileged operations are added later.
