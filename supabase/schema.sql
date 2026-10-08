-- Booking enquiries contain personal contact information. Keep browser roles out of this table.
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
revoke all on table public.booking_enquiries from anon, authenticated;
grant insert on table public.booking_enquiries to service_role;
