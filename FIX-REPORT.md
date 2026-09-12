# UI/UX Fix Report — Mobile Redesign Pass

Same project, same exam logic, same Dexie schema. This pass only touched
navigation, layout, theming and screen-level presentation for Practice,
Mock Tests, and Home. Nothing under `src/db`, `src/lib/scoring.ts`,
`src/lib/spacedRepetition.ts`, `src/hooks/*`, or `src/data/*` was changed.

## What was fixed

**Bottom navigation** (`src/components/layout/BottomNav.tsx`,
new `src/components/navigation/navigationConfig.ts`)
- Labels are now always compact and English (`Home`, `Syllabus`, `Mocks`,
  `Progress`, `More`) regardless of bilingual mode — the old version ran every
  label through the bilingual `translate()` helper, which produced
  `"Mock Tests / मॉक टेस्ट"` and wrapped onto two lines. Hindi-only mode still
  shows the short Hindi word.
- Single-line guaranteed via `whitespace-nowrap` + `truncate`.
- Added a pill + dot active-state indicator and `aria-current="page"`.
- Height ~68px + `env(safe-area-inset-bottom)`.
- Route list now lives in one file (`navigationConfig.ts`) shared by the
  bottom nav *and* the new desktop sidebar, so they can't drift apart.

**Desktop sidebar** (new `src/components/layout/DesktopSidebar.tsx`)
- Previously there was no desktop navigation at all — `AppShell` only ever
  rendered the mobile bottom nav. Added a fixed left sidebar (`md:` and up)
  reading the same nav config; bottom nav hides at that breakpoint.

**Header** (`src/components/layout/Header.tsx`)
- Title is now a single short line ("RVUNL Junior Assistant"); Hindi moved
  to the subtitle line only, so it never collides with the language toggle.
- Language toggle is a compact pill with a globe/languages icon instead of a
  wide text button.
- Respects `env(safe-area-inset-top)`.

**Layout / safe areas** (`src/components/layout/AppShell.tsx`, `index.css`)
- Added `.page-safe-bottom` (`padding-bottom: calc(70px + safe-area-inset-bottom
  + 16px)`) applied to the main content area, so content is never hidden
  behind the bottom nav or the Android gesture bar.
- Added `.sticky-bar-safe-bottom` for the mock-test action bar.
- `AppShell` now offsets content by the sidebar width at desktop widths.

**Theme tokens** (`tailwind.config.ts`)
- Added `surface`, `success`, `danger`, `warning`, `ai` color tokens (each
  with a `DEFAULT`/`bg`/`text` shade) instead of raw Tailwind grays/reds
  scattered per-component. Existing `brand` navy/blue palette is untouched.
- Added `Inter, "Noto Sans Devanagari", system-ui, sans-serif` as the base
  font stack (was previously unset, falling back to the browser default).

**Fixed real contrast/visibility bugs found in the existing code**
- `Progress.tsx` rendered its track as `bg-gray-100` (near-white) on a dark
  navy page — nearly invisible. Now uses a translucent white track that
  matches the dark theme, plus a `tone` prop (brand/success/warning/danger).
- `MockTestSetup.tsx`'s "active test" banner used `text-amber-800` (very
  dark brown) on a dark background — unreadable. Fixed to a light amber tone.
- `About.tsx` disclaimer and `Backup.tsx` "Reset All Data" / `AiMockTest.tsx`
  error text had the same dark-text-on-dark-background problem — fixed.
- `MockTestRunner.tsx` question-palette "answered" class was the invalid
  Tailwind class `bg-emerald-900/300` (opacity values only go to 100) — it
  silently did nothing. Replaced with proper `success`/`ai` tokens.

**Practice screen** (`src/features/practice/PracticeSession.tsx`)
- Setup screen: number/difficulty selectors are now full pill chips
  (44px+ tap height) instead of small bordered `<button>`s; added a proper
  "no questions match" `EmptyState` with a **Reset Filters** action instead
  of a bare red line of text.
- Question screen: options use the new shared `QuestionOption` component —
  labelled A/B/C/D, 52px minimum height, whole row tappable, disabled after
  reveal, green/red states.
- "Session complete" is now an `EmptyState` (icon + message + action) instead
  of a plain paragraph.
- Progress bar under the question counter.

**Mock Test screens**
- `MockTestSetup.tsx`: each exam-type card now has an icon in a tinted
  circle (blue for standard, amber for Important Mock) instead of text-only.
- `MockTestRunner.tsx`:
  - Timer changes color: white → amber under 10 min → red under 5 min →
    red + pulse under 1 min (respects `prefers-reduced-motion` via the
    global CSS override in `index.css`).
  - Sticky header now shows Answered / Unanswered / Marked counts under a
    thin progress bar.
  - Options use the shared `QuestionOption` component.
  - Bottom controls reflow into two rows (Previous/Save & Next, then Mark
    for Review / Clear / Palette) instead of one cramped row.
  - Question palette now opens as a mobile bottom sheet with a legend,
    6-column grid, 40px+ buttons, and a close button — previously it was a
    single horizontal scroll strip with an invalid CSS class.
  - Submit-confirmation dialog now states answered/unanswered/marked/
    remaining-time before submitting.

**Home screen** (`src/pages/Home.tsx`)
- Quick Actions are now icon tiles (Lucide icons in tinted circles, AI Mock
  gets the purple accent) instead of plain text rectangles.
- Daily-goal line uses `formatMinutes()` (`0m / 1h 0m` instead of the raw
  `0/480 min`) and the goal card shows a percentage + progress bar that
  turns green at 100%.
- "Recent activity" shows a proper empty state (icon, "No test attempted
  yet", **Start Main Mock** button) instead of `Latest test: 0/0…` when no
  result exists yet.
- Subject-progress section shows a loading empty-state instead of a bare
  heading if subjects haven't loaded yet.

## What was **not** changed / not fully covered

Given the size of the original spec (27 sections), this pass concentrated on
the items called out with screenshots — navigation, header, Home, Practice,
Mock Test runner/setup — plus every dark-on-dark contrast bug found by
grepping the codebase. The following spec sections were **not** touched in
this pass and are still using the pre-existing implementation:
Syllabus screen filters/accordion, Important Questions screen, AI Mock
generation-progress UI, Typing Test screen, Progress/analytics charts,
Results screen. They already share the same `Card`/`Button`/`Badge`
primitives that were fixed here, so the contrast fixes (Progress bar,
color tokens) apply to them automatically, but their layouts were not
individually redesigned. Say which of these you want next and they can be
done the same way.

## Build verification

This sandbox has **no network access**, so `npm install` / `npm run build`
could not actually be executed here (`npm install` fails with a 403 from
the registry). Instead every changed and touched file was run through the
TypeScript compiler in syntax-only mode (`tsc --noEmit`, ignoring
"cannot find module" noise from the missing `node_modules`) to catch brace/
JSX/syntax errors, and one real bug was caught and fixed this way (a
`React.ReactNode` type reference with no `React` import). You should still
run the full pipeline yourself before shipping:

```bash
npm install
npm run lint
npm run test
npm run build
```

If `npm run lint` or `npm run build` surface anything (most likely: unused
Tailwind class typos or the strict TS config catching something the syntax
check couldn't), send me the exact error output and it can be fixed in a
follow-up pass.
