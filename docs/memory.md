# memory.md — Agent Progress Log

> Update this file after every milestone (per agents.md Section 4, step 5). Keep entries short. This is how the agent (and human) recalls context across sessions/prompts.

## Format
```
## Milestone N — <name> — <date/time>
- What was built:
- Key decisions / deviations from docs:
- Known issues / TODO carried forward:
```

---

## Milestone 0 — Project Setup — Completed (2026-08-25)
- What was built: Set up Express backend API with JSON data store (`data/subscriptions.json`) and React + Vite + TailwindCSS frontend structure.
- Key decisions / deviations from docs: Configured Vite proxy to backend port 5000.
- Known issues / TODO carried forward: Backend endpoints and full UI to be implemented in subsequent milestones.


## Milestone 1 — Backend API & Logic — Completed (2026-08-25)
- What was built: Implemented `GET /api/subscriptions`, `POST /api/subscriptions`, and `PATCH /api/subscriptions/:id`. Built the Cost Uniformity Engine (yearly / 12) and Date Intersect Calculator (0-7 days renewal flag).
- Key decisions / deviations from docs: `GET` returns enriched items with computed `monthlyEquivalent`, `daysUntilRenewal`, `isRenewingSoon`, plus top-level `metrics`.
- Known issues / TODO carried forward: Frontend UI components (EntryForm, MetricsRow, SubscriptionGrid) to be built in Milestones 2-3.


## Milestone 2 — Entry Form — Completed (2026-08-25)
- What was built: Created `EntryForm.jsx` component with inputs for service name, cost, billing cycle dropdown, and next renewal date picker. Integrated with backend POST API.
- Key decisions / deviations from docs: Added form field validations and inline error state.
- Known issues / TODO carried forward: Top metrics row and structured table grid to be built in Milestone 3.


## Milestone 3 — Metrics + Grid — Completed (2026-08-25)
- What was built: Created `MetricsRow.jsx` (Total Monthly Burn Rate & Upcoming Renewals Alert Count) and `SubscriptionGrid.jsx` (table grid with amber "Renewing Soon" badge and row highlight for renewals <= 7 days).
- Key decisions / deviations from docs: Designed responsive cards and clean table styling with Lucide icons.
- Known issues / TODO carried forward: Final styling polish in Milestone 5.

## Milestone 4 — Pause/Active Behavior — Completed (2026-08-25)
- What was built: Integrated "Vibe Check" pause/active toggle with optimistic local state updates and backend `PATCH /api/subscriptions/:id` persistence.
- Key decisions / deviations from docs: Toggling to paused instantly greys out row and excludes monthly cost from top burn rate without record deletion.
- Known issues / TODO carried forward: Styling polish & Stitch MCP alignment in Milestone 5.


## Milestone 5 — Styling Polish — Completed (2026-08-25)
- What was built: Generated Kinetic Ledger design tokens via Stitch MCP. Refined Tailwind styling, typography (Inter + tabular-nums), amber badge highlights, and glassmorphic card elevation.
- Key decisions / deviations from docs: Aligned color palette and card hover transitions with Stitch MCP specs while preserving component architecture.
- Known issues / TODO carried forward: Final QA and README documentation in Milestone 6.


## Milestone 6 — Final QA + README — Completed (2026-08-25)
- What was built: Performed full QA review against `docs/review.md` checklist. Verified backend and frontend builds, API math, date calculations, active/paused status toggles, and README accuracy.
- Key decisions / deviations from docs: Verified end-to-end functionality and git hygiene across all milestones. Fixed manual date input parsing to support `DD/MM/YYYY` and `YYYY-MM-DD` typing along with calendar picker trigger.
- Known issues / TODO carried forward: None. All milestones complete!


