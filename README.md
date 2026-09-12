# RVUNL Junior Assistant Exam Prep / RVUNL कनिष्ठ सहायक परीक्षा तैयारी

An offline-first, bilingual (English/Hindi) exam preparation app for **RVUNL Junior Assistant** and **Commercial Assistant-II**, built with React + TypeScript + Vite + Tailwind + Dexie (IndexedDB), packaged as an installable PWA and an Android app via Capacitor.

> ⚠️ This is an independent, unofficial study tool. It is **not affiliated with or endorsed by RVUNL or the Government of Rajasthan**, and uses no official logo or emblem. Always verify exam pattern, syllabus, typing rules and marking scheme against the latest official RVUNL recruitment notification.

---

## ⚠️ Important: read this before you build

This project was generated in an offline sandbox with **no internet access and no Android SDK**. That means:

- **The code has not been through `npm install`, `npm run build`, `npm run lint`, or `npm run test` by the tool that generated it.** It has been carefully hand-written and statically checked (import resolution, brace/paren balance, Zod-validated data), but you must run the commands below yourself before trusting it in production.
- **No `.apk` file is included.** The GitHub Actions workflow in `.github/workflows/android-debug-apk.yml` will build one automatically once you push this repo to GitHub.
- The built-in question bank has **153 unique bilingual sample questions** (not the full ~420 stretch target), covering all 6 main-exam subjects. This exceeds the spec's stated minimum fallback of 140. All are clearly labelled **"Sample Question / अभ्यास प्रश्न"** — none are official previous-year questions.

## Mobile UI redesign (latest pass)

Navigation, header, safe-area handling, theme tokens, and the Home/Practice/
Mock Test screens went through a mobile UI/UX pass. See
[`FIX-REPORT.md`](./FIX-REPORT.md) for exactly what changed and why, and
[`UI-VALIDATION-REPORT.md`](./UI-VALIDATION-REPORT.md) for a checklist-style
review (screenshots could not be captured in the sandbox this was built in —
verify visually with `npm run dev` once you have it running locally).

## Getting started locally

```bash
npm install
npm run dev        # start local dev server
npm run lint        # ESLint
npm run test        # Vitest unit tests
npm run build        # production build -> dist/
npm run preview      # preview the production build
```

Fix anything that surfaces (dependency version drift is the most likely issue, since versions were pinned by hand without a live registry to resolve against — if a version doesn't exist, bump it to the nearest available minor/patch).

## Deploying as a PWA

`npm run build` produces a `dist/` folder with a service worker (via `vite-plugin-pwa`) and web app manifest. Host `dist/` on any static host (GitHub Pages, Netlify, Vercel, etc.) — it is installable and works offline after first load.

## Building the Android APK

### Option A — GitHub Actions (recommended)
1. Push this repository to GitHub.
2. Go to **Actions → Android Debug APK → Run workflow** (or just push to `main`).
3. Download the `app-debug-apk` artifact once the workflow completes.

### Option B — locally (requires Android Studio / SDK)
```bash
npm run build
npx cap add android      # first time only
npx cap sync android
npx cap open android     # opens Android Studio; Build > Build APK
```

## Project structure

See the file tree in the repo root. Key folders:
- `src/data/` — bilingual syllabus (174 topics) and sample question bank (153 questions), both Zod-validated.
- `src/lib/examConfig.ts` — **single source of truth** for Pre/Main exam pattern, marking scheme, and typing test configuration. Change numbers here, not scattered in components.
- `src/db/` — Dexie (IndexedDB) schema and seeding logic. All study data is offline-first.
- `src/features/` — one folder per feature area (onboarding, practice, mock-test, ai-mock, typing, revision, planner, notes, bookmarks, wrong-questions, backup, settings).
- `src/app/router.tsx` — central route table; gates on onboarding completion.

## Data model & validation

Every question conforms to `src/lib/questionSchema.ts` (Zod). `public/question-bank-schema.json` is the equivalent JSON Schema for external tooling/import validation.

## AI Mock Test (optional, disabled by default)

The AI Mock Test screen (`src/features/ai-mock/AiMockTest.tsx`) calls the Gemini API **only if** `VITE_GEMINI_API_KEY` is set in your `.env` (copy `.env.example`). Without a key, the screen explains this clearly instead of failing silently. All AI-generated questions are stored with `sourceType: 'ai'` and are always labelled **"AI-generated — unverified"** in the UI — never presented as official.

## Supabase (optional, disabled by default)

Supabase is **not required** and not wired into the default build — the app is fully functional offline with Dexie/IndexedDB. `supabase/functions/generate-ai-mock/` and `.env.example` are placeholders for anyone who wants to add optional cloud sync/backend AI generation later.

## Known limitations / what to verify before relying on this for real exam prep

- Pre-Examination pattern (`PRE_EXAM_CONFIG`) is an **editable placeholder** — the official Pre-exam pattern was not available at generation time. Verify and edit `src/lib/examConfig.ts` against the latest official notification.
- The question bank (153 Qs) is a **starting point**, not a complete revision resource — treat it as seed content and keep adding your own via the JSON schema / bulk import pattern.
- This has not been tested inside an actual Android WebView — please test on a real device after your first APK build and file issues as you find them.

## License / attribution

No copyrighted third-party content, official logos, or government emblems are included. The app icon is an original neutral book + electricity themed design generated for this project.
