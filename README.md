# 💪 FitLog — Workout Library


## 📖 About

**FitLog** is a responsive, dark-mode workout library built from the Programming Hero B14-A6 *Fit Log* brief. Browse a curated exercise library, open detailed workout pages with step-by-step instructions, build a five-lift daily plan, save workouts for later, and track your completed lifts — all in one clean, no-nonsense interface.

The app fetches live data from the API and gracefully falls back to a bundled 12-workout dataset if the API is temporarily unavailable, so the experience never breaks.

🔗 **Live demo:** [fitlog-sooty.vercel.app](https://fitlog-sooty.vercel.app/)

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Persistence | LocalStorage (plan & saved data) |
| Deployment | Vercel |

---

## ✨ Key Features

1. **🏋️ Responsive Workout Library** — Loading states and a clean 3-column desktop grid that adapts down to mobile.
2. **📋 Detailed Workout Pages** — Full specs (equipment, difficulty, sets, reps, duration, calories), step-by-step instructions, and hero imagery.
3. **📅 Today's Plan** — Build a plan with a 5-lift cap, live exercise/minute/calorie totals, and per-lift completion tracking.
4. **🔖 Saved Workouts** — Bookmark workouts for later with data that persists across sessions via localStorage.
5. **🔍 Sort & Search** — Filter and sort the library by duration, calories, or rating, and search by workout name or muscle tag.

---

## 🎁 Extras

- 🔔 Toast notifications for add, save, complete, and remove actions
- 🚫 Custom 404 page with deployment-safe App Router routing
- 📱 Fully responsive navigation, hero section, footer, and workout cards

---

## 📁 Project Structure

├── app/                # App Router pages & routes
├── components/         # Reusable UI components
├── context/             # FitLog context (plan/saved state)
├── lib/                 # Data fetching & fallback dataset
├── design/              # Supplied Figma & Penpot design files
└── public/assets/       # Logo, banner, and other static assets

> The supplied **Figma** and **Penpot** design files are kept under `design/`, and the supplied logo/banner assets live under `public/assets/`.

---

## 🚀 Getting Started

npm install
npm run dev

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

<p align="center">Built with 💛 as part of the Programming Hero B14-A6 curriculum.</p>