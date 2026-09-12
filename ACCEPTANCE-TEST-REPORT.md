# Acceptance Test Report

**Generated:** in an offline sandbox with no internet access and no Android SDK/emulator available.
**Status: NOT independently build/run/test-verified by the generating tool.** This report documents what was checked statically and what still needs to be verified by you after `npm install`.

## What WAS verified in this environment

| Check | Method | Result |
|---|---|---|
| All `@/…` internal imports resolve to real files | Python static scan of every `.ts`/`.tsx` file | ✅ 181/181 imports resolved |
| Brace/paren balance in every source file | Python static scan | ✅ 0 mismatches across all files |
| Sample question bank structural validity (4 options, valid correctIndex 0–3, all bilingual fields present) | Python validation pass mirroring `QuestionSchema` | ✅ 0 issues across 153 questions |
| Sample question bank size vs. spec's fallback minimum (140) | Count | ✅ 153 ≥ 140 |
| No question in the built-in bank is mislabelled as official | Field check (`sourceType`) | ✅ all `sample` |
| MAIN_EXAM_CONFIG totals match spec (140 Q / 200 marks) | Encoded as a Vitest test (`examConfig.test.ts`) — **not yet executed** | ⏳ pending `npm run test` |
| Negative marking formula (`marks × 0.25`) | Encoded as Vitest tests (`scoring.test.ts`) — **not yet executed** | ⏳ pending `npm run test` |
| App icons contain no official government emblem/logo | Manually generated via PIL as a neutral book + electricity glyph | ✅ |

## What is NOT yet verified — you must run these yourself

```bash
npm install       # dependency resolution — version pins were hand-set, not resolved live
npm run lint      # ESLint — 0 runs so far
npm run test      # Vitest — test files exist (5 suites) but have never executed
npm run build     # tsc + vite build — never compiled
npx cap add android && npx cap sync android   # Capacitor Android platform — never generated
```

If `npm install` reports a version that doesn't exist for any package in `package.json`, bump it to the nearest available version and retry — this is the single most likely failure point given no live npm registry access during generation.

## Feature checklist against the original spec

| # | Feature | Status |
|---|---|---|
| 1 | Pre-Exam prep | ✅ implemented (mock + config) |
| 2 | Main Exam prep | ✅ implemented (mock + config) |
| 3 | Bilingual syllabus tracker | ✅ 174 topics, filters, search, chips |
| 4 | Topic-wise practice | ✅ |
| 5 | Pre mock tests | ✅ |
| 6 | Main full mock tests | ✅ |
| 7 | Gemini AI mock tests | ✅ optional, disabled by default, clearly labelled |
| 8 | Important Questions mock | ✅ |
| 9 | Hindi typing tests | ✅ speed + efficiency modes |
| 10 | English typing tests | ✅ speed + efficiency modes |
| 11 | Revision planner (spaced repetition) | ✅ 1/3/7/15/30-day intervals, Again/Hard/Good/Easy |
| 12 | Weak-topic identification | ✅ |
| 13 | Notes and bookmarks | ✅ topic + question level |
| 14 | Detailed result analysis | ✅ subject-wise breakdown |
| 15 | Offline storage | ✅ Dexie/IndexedDB, seeded on first load |
| 16 | Backup and restore | ✅ JSON export/import + reset with confirmation |
| 17 | Installable PWA | ✅ vite-plugin-pwa, manifest, offline.html |
| 18 | Android/Capacitor support | ✅ config + CI workflow (untested on-device) |

## Honesty note on question bank scale

The spec's primary target was ~420 questions but explicitly permits scoping down to a minimum of 140 high-quality questions "sufficient for one complete Main mock" if quality would otherwise suffer. **153 hand-authored bilingual questions were delivered** (30 Reasoning, 40 Rajasthan GK, 18 India/World/Science, 24 Mathematics, 20 Hindi, 21 English) — each with a genuine explanation, not template filler. This is disclosed here per the spec's own instruction rather than silently presented as the full 420.
