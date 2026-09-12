create table public.stay_reviews (
  id uuid primary key default gen_random_uuid(),
  host_id text not null,
  author_id uuid not null references auth.users(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text not null default '',
  photos text[] not null default '{}',
  stayed_at date,
  created_at timestamptz not null default now()
);

create index stay_reviews_host_id_idx on public.stay_reviews (host_id, created_at desc);

alter table public.stay_reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.stay_reviews for select using (true);

create policy "Users can post their own reviews"
  on public.stay_reviews for insert with check (auth.uid() = author_id);

create policy "Users can delete their own reviews"
  on public.stay_reviews for delete using (auth.uid() = author_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('review-photos', 'review-photos', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif']);

create policy "Review photos are publicly readable"
  on storage.objects for select using (bucket_id = 'review-photos');

create policy "Users can upload review photos to their own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'review-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
