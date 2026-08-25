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


## Milestone 2 — Entry Form — _pending_
- What was built:
- Key decisions / deviations from docs:
- Known issues / TODO carried forward:

## Milestone 3 — Metrics + Grid — _pending_
- What was built:
- Key decisions / deviations from docs:
- Known issues / TODO carried forward:

## Milestone 4 — Pause/Active Behavior — _pending_
- What was built:
- Key decisions / deviations from docs:
- Known issues / TODO carried forward:

## Milestone 5 — Styling Polish — _pending_
- What was built:
- Key decisions / deviations from docs:
- Known issues / TODO carried forward:

## Milestone 6 — Final QA + README — _pending_
- What was built:
- Key decisions / deviations from docs:
- Known issues / TODO carried forward:
