# UI Validation Report

⚠️ **Honesty note:** this sandbox has no network access and no browser/
Android device, so the screenshots and viewport tests requested in the
original spec (320×568 up to tablet/desktop, at each of the 7 listed
screens) could **not** actually be captured or run here. What follows is a
manual code-level check of the same 22 items instead — please re-verify
visually once you build locally (`npm run dev` and resize the viewport, or
`npm run build` + open on a phone).

| # | Check | Status | Notes |
|---|---|---|---|
| 1 | Bottom-nav labels stay on one line at 320px | ✅ by construction | `whitespace-nowrap`/`truncate`, always-compact labels (see FIX-REPORT) |
| 2 | All 5 nav items fit at 320px | ✅ by construction | Equal-width flex-1 items, 10px font, 44px+ touch target |
| 3 | Android gesture bar doesn't overlap nav | ✅ | `env(safe-area-inset-bottom)` padding added |
| 4 | Page content not hidden behind nav | ✅ | `.page-safe-bottom` on `<main>` |
| 5 | Home shows subject cards even at zero progress | ✅ | Cards render from `subjects` list, not from progress %; only shows an empty-state if subjects haven't loaded |
| 6 | Home doesn't show `0/0 latest test` | ✅ | Replaced with `EmptyState` when `results.length === 0` |
| 7 | Practice options fit at 360px | ⚠️ likely, not device-tested | Chips wrap via `flex-wrap`, no fixed widths |
| 8 | Practice sticky controls don't cover content | ⚠️ not device-tested | Controls are inline (not `fixed`) in Practice; only the Mock Test runner uses a sticky bar, which has safe-area padding |
| 9 | Mock runner hides normal bottom nav | ✅ | `MockTestRunner` renders outside `AppShell` in the router (pre-existing, confirmed unchanged) |
| 10 | Test header stays visible while scrolling | ✅ | Header + progress + counts are outside the scrollable question area |
| 11 | Timer changes warning color correctly | ✅ | White → amber (<10m) → red (<5m) → red+pulse (<1m) |
| 12 | Palette opens/closes correctly | ✅ code-reviewed | Bottom sheet closes via `×` button, backdrop tap, or selecting a question |
| 13 | Submit dialog shows answer summary | ✅ | Now includes answered/unanswered/marked/remaining time |
| 14 | Result screen fits without horizontal scroll | ⚠️ not touched this pass | `Results.tsx` unchanged |
| 15 | Syllabus filters work on mobile | ⚠️ not touched this pass | `Syllabus.tsx` unchanged |
| 16 | Typing screen usable with keyboard open | ⚠️ not touched this pass | `TypingTest.tsx` unchanged |
| 17 | Hindi renders correctly | ✅ | Font stack includes Noto Sans Devanagari fallback |
| 18 | English mode renders correctly | ✅ | `bi()`/`lang==='en'` paths unchanged |
| 19 | Bilingual content renders correctly | ✅ | Bottom nav intentionally exempted (compact-only); page content still uses full `bi()` |
| 20 | Desktop sidebar still works | ✅ new | Didn't exist before; added and wired to the same routes as bottom nav |
| 21 | Dark theme contrast accessible | ✅ | Fixed 5 concrete dark-on-dark bugs found by grep (see FIX-REPORT) |
| 22 | No native `alert`/`confirm` for normal UI | ✅ | Confirmed `Dialog.tsx` (custom) is used for exit/submit; no `window.confirm` calls found in `src/` |

## Screens not re-verified visually

Since no build/browser was available, the 7 screenshots requested
(Home, Syllabus, Practice question, Main Mock runner, Question palette,
Result screen, Typing test — all at 390×844) could not be produced. Once
you run `npm run dev` locally, worth spot-checking Home, Practice, and the
Mock Test runner + palette first, since those had the most changes.
