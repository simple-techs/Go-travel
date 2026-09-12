alter table public.profiles
  add column socials jsonb not null default '{}'::jsonb;
