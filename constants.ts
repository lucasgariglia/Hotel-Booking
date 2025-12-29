/*
  SUPABASE SQL SCHEMA
  -------------------
  
  -- Create Rooms Table
  create table public.rooms (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    description text,
    price_per_night numeric not null,
    capacity integer default 2,
    image_url text,
    features text[]
  );

  -- Create Bookings Table
  create table public.bookings (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    guest_name text not null,
    guest_email text not null,
    check_in_date date not null,
    check_out_date date not null,
    room_id uuid references public.rooms(id),
    total_price numeric,
    status text default 'pending' -- pending, confirmed, cancelled
  );

  -- Enable Row Level Security (RLS)
  alter table public.rooms enable row level security;
  alter table public.bookings enable row level security;

  -- Create Policies (Simplified for demo)
  create policy "Public rooms are viewable by everyone" on public.rooms for select using (true);
  create policy "Anyone can insert bookings" on public.bookings for insert with check (true);
*/

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'Services', path: '/services' },
  { name: 'Reserve', path: '/reserve' },
];

export const MOCK_ROOMS = [
  {
    id: '1',
    name: 'Executive Room',
    description: 'Rooms of 35m2, spacious and elegant, characterized by an exclusive interior design that combines original decorative elements and a contemporary design.',
    price: 450,
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
    features: ['Queen Bed', 'Street View', 'Marble Bath'],
    category: 'room'
  },
  {
    id: '2',
    name: 'Superior Room',
    description: '45m2. Designed with an updated interpretation of the classic French decoration from the 50s. Bright room due to the use of monochromatic contrasts.',
    price: 550,
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop',
    features: ['King Bed', 'City View', 'Work Desk'],
    category: 'room'
  },
  {
    id: '3',
    name: 'Superior Room with Terrace',
    description: 'Executive rooms of 25m2, spacious and elegant, with a private balcony overlooking the pool. They have 1 double bed or 2 twin beds.',
    price: 650,
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
    features: ['Private Terrace', 'Pool View', 'Lounge Area'],
    category: 'room'
  },
  {
    id: '4',
    name: 'Junior Suite Deluxe',
    description: 'These spacious and bright 60m2 rooms offer an experience of luxury and comfort. Designed to provide a sense of space and privacy.',
    price: 850,
    capacity: 3,
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
    features: ['60m2', 'Living Area', 'Butler Service'],
    category: 'suite'
  },
  {
    id: '5',
    name: 'The Obsidian Suite',
    description: 'Our signature suite offering panoramic views of the skyline, featuring a private terrace and black marble bath.',
    price: 1250,
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
    features: ['Penthouse', 'Panoramic View', 'Jacuzzi'],
    category: 'club'
  },
  {
    id: '6',
    name: 'Suite Courtyard',
    description: 'Three 95m2 suites with traditional and elegant decor offer our guests the luxury of an oasis of light. Overlooking a bright inner courtyard.',
    price: 950,
    capacity: 4,
    imageUrl: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop',
    features: ['95m2', 'Courtyard View', 'Two Bedrooms'],
    category: 'club'
  }
];