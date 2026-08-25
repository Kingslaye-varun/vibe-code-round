# Subscription Tracker & Renewal Dashboard

A lightweight personal-finance dashboard that tracks recurring SaaS/streaming subscriptions, normalizes billing cycles into a single monthly burn rate, flags upcoming renewals, and lets you pause a subscription (without deleting it) to instantly simulate savings.

Built as a vibe-coding exercise using **Antigravity** (agentic coding tool) with **Stitch MCP** for UI generation, guided entirely by the spec docs in `/docs`.

## Features
- Add a subscription: name, cost, billing cycle (monthly/yearly), next renewal date
- Two live metric cards: **Total Monthly Burn Rate** and **Upcoming Renewals (next 7 days)**
- Subscription grid with amber **"Renewing Soon"** badge for renewals within 7 days
- **Active / Paused** toggle per subscription — pausing greys out the row and instantly removes its cost from the burn rate, without deleting the record

## Tech Stack
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express, JSON file storage (no database needed)
- **Design**: Stitch MCP (via Antigravity)

## Project Structure
```
vibe-code-round/
  docs/            # spec docs that drove the build (prd, design, agents, milestones, review, memory)
  backend/         # Express API + JSON data store
  frontend/        # React + Vite + Tailwind app
  README.md
```

## Getting Started

### Backend
```
cd backend
npm install
npm run dev
```
Runs on `http://localhost:5000` (or configured port).

### Frontend
```
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/subscriptions` | List all subscriptions with computed `monthlyEquivalent`, `daysUntilRenewal`, `isRenewingSoon` |
| POST | `/api/subscriptions` | Add a new subscription |
| PATCH | `/api/subscriptions/:id` | Toggle `status` between `active` / `paused` |

## Core Logic
- **Cost Uniformity Engine**: `monthlyEquivalent = cycle === 'yearly' ? cost / 12 : cost`
- **Date Intersect Calculator**: `daysUntilRenewal = renewalDate - today`, flags `isRenewingSoon` when between 0 and 7 days
- **Burn Rate**: sum of `monthlyEquivalent` across all `active` subscriptions only

## How This Was Built
This project was built milestone-by-milestone using the docs in `/docs`:
- `prd.md` — feature spec
- `design.md` — UI/UX spec for Stitch MCP
- `agents.md` — coding agent rules & PowerShell workflow
- `milestones.md` — the build plan, one milestone per prompt
- `review.md` — QA checklist run after every milestone before commit
- `memory.md` — running log of what was built/decided at each step

Each milestone followed: **build → error check → test → commit → push**.

## Repo
https://github.com/Kingslaye-varun/vibe-code-round
