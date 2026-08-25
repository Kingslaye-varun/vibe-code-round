# agents.md — Instructions for the Coding Agent (Antigravity)

## 0. Read Order
1. `docs/prd.md` — what to build
2. `docs/design.md` — how it should look (use with Stitch MCP)
3. `docs/milestones.md` — build order, one milestone per prompt/session
4. `docs/review.md` — checklist to run after EVERY milestone before commit
5. `docs/memory.md` — update this after every milestone with what was done/decided

## 1. Tech Stack (fixed — do not change)
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express, JSON file (`data/subscriptions.json`) as storage — no database
- **Package manager**: npm
- **OS / Shell**: Windows PowerShell — see Section 3 for command rules

## 2. Project Structure
```
vibe-code-round/
  docs/
    prd.md, design.md, agents.md, milestones.md, review.md, memory.md
  backend/
    server.js
    data/subscriptions.json
    package.json
  frontend/
    src/ (React app)
    package.json
  README.md
```

## 3. PowerShell Command Rules (IMPORTANT)
- Windows PowerShell does **not** support `&&` to chain commands.
- Run commands **one at a time**, OR chain with `;` (semicolon) if truly needed, e.g.:
  `cd backend; npm install`
- Prefer separate tool calls per command over chaining — cheaper to debug, cheaper on tokens.
- Never use bash-only syntax (`&&`, `||`, `export VAR=`, `rm -rf` for deletes — use `Remove-Item -Recurse -Force` instead).
- Use `npm install`, `npm run dev`, `npm run build` as-is (these work fine in PowerShell).

## 4. Workflow Per Milestone (STRICT — repeat for every milestone in milestones.md)
1. Implement only the scope defined for that milestone — do not jump ahead.
2. Run the app locally / run relevant tests to confirm it works.
3. **Error check**: read terminal output, fix any errors/warnings before proceeding.
4. **Test**: manually verify the specific feature/behavior described in the milestone's acceptance criteria.
5. If everything passes → update `docs/memory.md` with a short entry (what was built, any decisions/deviations).
6. Only then, run these PowerShell git commands one by one:
   ```
   git add .
   git commit -m "milestone-N: <short description>"
   git push origin main
   ```
7. If something fails at step 3/4, fix it first — do NOT commit broken code.

## 5. Coding Conventions
- Keep components small and function-based (React functional components + hooks).
- Backend: simple REST endpoints, no over-engineering.
  - `GET /api/subscriptions`
  - `POST /api/subscriptions`
  - `PATCH /api/subscriptions/:id` (toggle status only)
- Normalize costs and compute renewal-day logic on the backend (per prd.md sections 4.4/4.5), frontend just displays what backend returns — keep single source of truth.
- No unnecessary libraries — keep it lightweight (axios or fetch is fine, no Redux needed for this scope).

## 6. Repo
`https://github.com/Kingslaye-varun/vibe-code-round.git`
Assume it's already cloned locally and `git remote` is set. If not, first-time setup:
```
git init
git remote add origin https://github.com/Kingslaye-varun/vibe-code-round.git
git branch -M main
```

## 7. Definition of Done (whole project)
- All milestones in `milestones.md` complete and checked off.
- `review.md` checklist passes fully on the final state.
- `README.md` is written and accurate.
- Final commit pushed to `main`.
