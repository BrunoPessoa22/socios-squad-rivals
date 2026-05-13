# Squad Rivals

Frontend prototype for **Socios Squad Rivals** — a fan-token-powered fantasy game.

Built as the UX/UI workstream deliverable: 7 screens, dark mode, mock data.

## Screens

| Route          | Page                                        |
| -------------- | ------------------------------------------- |
| `/onboarding`  | 3-card onboarding with wallet auto-fill     |
| `/squad`       | 5-slot pitch builder with captain & boosts  |
| `/rivals`      | Rivals lobby with scout drawer & challenge  |
| `/matchup`     | Pre-match preview & post-match settlement   |
| `/leaderboard` | League with promotion / relegation zones    |
| `/rewards`     | Pack inventory, tier ladder, open animation |
| `/profile`     | Stats, wallet, trophy cabinet               |

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS (custom dark theme, no AI-generic gradients)
- Lucide icons (no emoji)
- Framer Motion for transitions
- React Router DOM v7

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Auto-deploys to Vercel on push to `main`.
