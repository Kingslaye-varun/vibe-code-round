# review.md — Post-Milestone Checklist

Run this checklist after implementing EVERY milestone, before committing/pushing. If any item fails, fix before moving on.

## 1. Error Check
- [ ] No errors/red text in terminal for backend (`node server.js` / `npm run dev`)
- [ ] No errors/red text in terminal for frontend (`npm run dev`)
- [ ] No unresolved console errors in browser dev tools
- [ ] No TypeScript/lint errors if applicable

## 2. Functional Test (pick relevant items per milestone)
- [ ] Backend endpoints return expected JSON shape (`GET`, `POST`, `PATCH`)
- [ ] Monthly burn rate math correct: yearly cost / 12, summed only for active subs
- [ ] Renewal countdown correct: days until date matches manual calculation
- [ ] "Renewing Soon" badge appears only when `daysUntilRenewal` is 0–7 and status is active
- [ ] Add-subscription form validates required fields and submits correctly
- [ ] New subscription appears in grid without full page reload
- [ ] Toggle switch changes status via PATCH, does not delete the row
- [ ] Paused row visually greys out immediately
- [ ] Burn rate updates immediately after pause/unpause
- [ ] UI matches `design.md` intent (colors, layout, badges)

## 3. Git Hygiene
- [ ] `git status` shows only intended files changed
- [ ] Commit message follows `milestone-N: <short description>` format
- [ ] Push succeeds to `origin main` with no conflicts

## 4. Final-Only Checks (Milestone 6)
- [ ] Fresh clone + `npm install` + `npm run dev` works for both `backend/` and `frontend/`
- [ ] `README.md` present, accurate, includes setup + run instructions
- [ ] All docs (`prd.md`, `design.md`, `agents.md`, `milestones.md`, `memory.md`) still reflect final implementation (update if drifted)
- [ ] No leftover placeholder/test data committed unless intentional (seed data ok if documented)
