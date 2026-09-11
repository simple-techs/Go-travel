# GO - Free Stays for Backpackers

A platform connecting young backpackers around the world. Spin the interactive 3D globe, select a destination, and find travelers who share your interests and offer free stays.

## Features

- Interactive 3D globe with country markers (Three.js / React Three Fiber)
- Interest-based profile matching (partying, tech, beach, hiking, etc.)
- User profiles with hosting status and stay requests
- Country exploration with interest filtering
- Search by country/continent
- Auth pages (sign up / sign in)
- Dashboard with stay request management
- Dark theme with modern UI

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **3D Globe:** Three.js + React Three Fiber + Drei
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend (ready):** Supabase (Auth + Database)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables (optional, for Supabase integration)

Copy `.env.example` to `.env.local` and set the anon key from the
[Go-travel Supabase project](https://supabase.com/dashboard/project/qeabwuqdulihjagboicw/settings/api-keys):

```
NEXT_PUBLIC_SUPABASE_URL=https://qeabwuqdulihjagboicw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

The app runs in demo mode with mock data when Supabase is not configured.
