-- Booking enquiries contain personal contact information. Anonymous visitors can submit
-- a booking, but they cannot read, update, or delete submitted rows.
create table if not exists public.booking_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 7 and 40),
  preferred_date date not null,
  property_type text not null check (property_type in ('Home', 'Workplace', 'Development')),
  message text not null check (char_length(message) between 1 and 5000),
  source text not null default 'Kavach Consultancy website',
  submitted_at timestamptz not null default now()
);

alter table public.booking_enquiries enable row level security;

-- Remove any broad table grants and any old insert-column grants before adding
-- the narrow set required by the public booking form.
revoke all on table public.booking_enquiries from anon, authenticated;
revoke insert (id, name, email, phone, preferred_date, property_type, message, source, submitted_at)
  on table public.booking_enquiries from anon, authenticated;
grant insert (name, email, phone, preferred_date, property_type, message)
  on table public.booking_enquiries to anon;

drop policy if exists booking_enquiries_public_insert on public.booking_enquiries;
create policy booking_enquiries_public_insert
  on public.booking_enquiries
  for insert
  to anon
  with check (
    char_length(btrim(name)) between 1 and 120
    and char_length(email) between 3 and 254
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and char_length(btrim(phone)) between 7 and 40
    and preferred_date >= current_date
    and property_type in ('Home', 'Workplace', 'Development')
    and char_length(btrim(message)) between 1 and 5000
    and source = 'Kavach Consultancy website'
  );
