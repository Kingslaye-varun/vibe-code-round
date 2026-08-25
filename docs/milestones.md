# milestones.md — Build Plan (~1 hour total)

Each milestone = one focused prompt to the agent. After each: error-check → test → update memory.md → commit → push (see agents.md Section 4).

---

## Milestone 0 — Project Setup (~5 min)
- Init repo structure: `backend/`, `frontend/` (Vite + React + Tailwind), `docs/` (already present).
- Backend: Express server boilerplate, `data/subscriptions.json` starts as `[]`.
- Frontend: Vite React app runs on `npm run dev` with a placeholder "Subscription Tracker" heading.
- **Acceptance**: `npm run dev` works on both frontend and backend without errors.

## Milestone 1 — Backend API & Logic (~10 min)
- Implement `GET /api/subscriptions`, `POST /api/subscriptions`, `PATCH /api/subscriptions/:id`.
- Implement Cost Uniformity Engine (monthly normalization) and Date Intersect Calculator (days until renewal, `isRenewingSoon` flag) per `prd.md`.
- Response for GET should include computed fields: `monthlyEquivalent`, `daysUntilRenewal`, `isRenewingSoon`.
- **Acceptance**: Test endpoints with a REST client or curl-equivalent; correct values returned for a sample monthly and yearly subscription.

## Milestone 2 — Entry Form (Frontend) (~10 min)
- Build the onboarding form per `design.md`: service name, cost, billing cycle dropdown, date picker.
- On submit, POST to backend, clear form, refresh grid.
- **Acceptance**: Submitting a valid subscription adds it to backend data and appears in UI list (basic list ok even before grid styling).

## Milestone 3 — Metrics Row + Subscription Grid (~10 min)
- Build the two metric cards (Total Monthly Burn Rate, Upcoming Renewals Alert Count), driven by backend computed data.
- Build the table grid with all columns, amber "Renewing Soon" badge/row highlight logic, and the Active/Paused toggle switch (wired to PATCH endpoint).
- **Acceptance**: Adding subscriptions updates metrics correctly; a subscription with renewal ≤7 days shows amber badge.

## Milestone 4 — Pause/Active "Vibe Check" Behavior (~5 min)
- Confirm toggling to Paused: row greys out instantly, item stays in table (not deleted), Monthly Burn Rate recalculates excluding it in real time.
- Toggling back to Active reverses all of the above.
- **Acceptance**: Manual test — pause a subscription, verify burn rate drops by correct normalized amount; row visually greyed.

## Milestone 5 — Styling Polish via Stitch MCP (~10 min)
- Use Stitch MCP to generate/refine visual styling per `design.md` (colors, spacing, card design).
- Apply generated styles as Tailwind classes to existing components — don't restructure component logic.
- **Acceptance**: UI visually matches design.md intent (cards, amber highlight, greyed paused rows, toggle switch).

## Milestone 6 — Final QA + README (~10 min)
- Run full `review.md` checklist end-to-end.
- Write final `README.md` (see review.md for required sections).
- Final commit + push.
- **Acceptance**: Fresh `npm install` + `npm run dev` on both frontend/backend works from a clean clone; README accurately reflects the project.

---
**Total estimated time: ~50-60 min** (leaves buffer for the mandatory error-check/test/commit cycle after each milestone).
