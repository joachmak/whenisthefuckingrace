# When is the F*cking Race?

A Next.js application that displays the next Formula 1 race and event schedule with real-time updates.

Visit [whenisthefuckingrace.com](https://whenisthefuckingrace.com) to see it in action.

## Features

- Real-time F1 race schedule display
- Shows next upcoming event (race, practice, qualifying, sprint)
- Live event indicator when races are in progress
- User location detection for personalized experience
- Automatic timezone conversion to local time
- Responsive design optimized for all devices
- Server-side rendering with Next.js 16
- Periodic data updates via server actions

## Tech Stack

- **Framework:** Next.js 16.0.3
- **Runtime:** React 19.2.0
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4.1
- **Analytics:** Vercel Analytics
- **Data Source:** F1 Ergast API

## Prerequisites

- Node.js 18+ or later
- npm, pnpm, yarn, or bun package manager

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Build & Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

## Project Structure

```
src/app/
├── page.tsx              # Root page (Server Component)
├── main.tsx              # Main UI logic (Client Component)
├── layout.tsx            # Root layout with metadata
├── error.tsx             # Error boundary component
├── actions.ts            # Server actions for data fetching
├── utils.ts              # Data transformation utilities
├── response.json         # F1 race data cache
├── middleware.ts         # Request/response middleware
├── components/           # Reusable React components
│   ├── LocalTime.tsx     # Timezone-aware time display
│   ├── MainWrapper.tsx   # Layout wrapper component
│   └── TextTypes.tsx     # Typography components
└── fonts/                # Custom font files
    └── adam-cg-pro.regular.otf
```

## Key Components

### Server Components
- **page.tsx**: Fetches race data via server actions and passes to client components
- **layout.tsx**: Defines HTML structure, fonts, and metadata

### Client Components
- **main.tsx**: Core UI logic, state management, and event display
- **LocalTime.tsx**: Converts and displays times in user's local timezone

### Server Actions
- **getRaceData()**: Fetches and processes F1 race schedule data

## Data Flow

1. Server fetches race data via `getRaceData()` server action
2. Data is transformed using utility functions in `utils.ts`
3. Events are sorted chronologically and passed to client components
4. Client components display next event and handle real-time updates
5. Middleware processes requests and adds custom headers

## Environment Variables

No environment variables are required for basic functionality.

## Deployment

This application is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

The app automatically deploys from the `master` branch.

## Motivation

![Formula 1 timezone confusion](https://user-images.githubusercontent.com/55885044/182022906-d7f5af13-1a1a-47d4-916c-752c6627c2a4.png)

Created to solve the eternal problem of timezone conversion for F1 race times.

## Support

<a href="https://www.buymeacoffee.com/joachimmaksim" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## License

MIT
