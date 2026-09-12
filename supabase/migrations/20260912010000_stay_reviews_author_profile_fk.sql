alter table public.stay_reviews
  add constraint stay_reviews_author_id_profiles_fkey
  foreign key (author_id) references public.profiles(id) on delete cascade;
