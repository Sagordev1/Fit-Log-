# 💪 FitLog — Workout Library

FitLog is a responsive, dark-mode workout library built from the Programming Hero B14-A6 Fit Log brief. Browse the exercise library, open detailed workout instructions, build a five-lift daily plan, save workouts for later, and track completed lifts.

## 🔗 API
- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

The app fetches the API in the browser and includes the supplied 12-workout dataset as a graceful fallback if the API is temporarily unavailable.

## 🛠️ Technologies
- Next.js App Router
- React 19 + TypeScript
- Tailwind CSS
- Lucide React icons
- Vercel-ready deployment
- LocalStorage for plan/saved persistence

## ✨ Key Features
1. Responsive workout library with loading state and 3-column desktop grid.
2. Workout detail pages with specs, instructions, images, and CTAs.
3. Today's Plan with a five-lift cap, live exercise/minute/calorie totals, and completion state.
4. Saved workouts with persistent localStorage data.
5. Duration / calories / rating sorting plus workout/tag search.
6. Toast notifications for add, save, complete, and remove actions.
7. Custom 404 page and deployment-safe App Router routes.
8. Mobile-friendly navigation, hero section, footer, and cards.

## 🚀 Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## 📦 Production
```bash
npm run build
npm start
```

Deploy the project root to Vercel. Next.js App Router handles direct route requests for `/workout/:id` and `/my-plan` without client-side routing configuration.

## 📁 Included design source
The supplied Figma and Penpot files are kept under `design/`, and the supplied logo/banner assets are under `public/assets/`.

## 📬 Submission
- Live Link: _add after deployment_
- GitHub Repository Link: _add after pushing_
