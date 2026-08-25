# PRD — Subscription Tracker & Renewal Dashboard

## 1. Overview
A personal finance dashboard that tracks recurring SaaS/streaming subscriptions, monitors renewal dates, and calculates monthly cash-flow burn in real time.

## 2. Goals
- Let a user add, view, and manage subscriptions.
- Show total monthly burn rate (normalized across billing cycles).
- Flag subscriptions renewing within 7 days.
- Allow pausing a subscription without deleting it, instantly excluding it from burn calculations.

## 3. Users
Single-user, no auth required (local/demo scope). Data persists via backend JSON storage.

## 4. Functional Requirements

### 4.1 Entry Form (Add Subscription)
- Text input: Service Name (required)
- Number input: Cost (currency, required, > 0)
- Dropdown: Billing Cycle → `Monthly` | `Yearly`
- Date picker: Next Renewal Date (required, calendar UI)
- Submit button adds subscription to the grid instantly (optimistic UI ok)

### 4.2 Metrics Row (Top Cards)
- **Total Monthly Burn Rate**: Sum of all `Active` subscriptions' cost, with Yearly costs normalized to monthly (`yearly_cost / 12`). Paused subscriptions excluded.
- **Upcoming Renewals Alert Count**: Count of `Active` subscriptions with renewal date within next 7 days (inclusive) of today.

### 4.3 Subscription Grid (Table)
Columns: Service Name | Cost | Billing Cycle | Next Renewal Date | Status Badge | Active/Paused Toggle

- Row highlights amber + "Renewing Soon" badge if `days_until_renewal <= 7 && days_until_renewal >= 0` and status is Active.
- Paused rows render visually greyed out (reduced opacity / muted colors).
- Toggle switches status between `active` and `paused` — never deletes the row.

### 4.4 Cost Uniformity Engine (Backend Logic)
- Input: `{ cost, billingCycle }`
- Output: `monthlyEquivalent = billingCycle === 'yearly' ? cost / 12 : cost`
- Used for all burn-rate aggregation.

### 4.5 Date Intersect Calculator (Backend Logic)
- Input: `nextRenewalDate` (ISO string), reference `currentDate = today`
- Output: `daysUntilRenewal = diffInDays(nextRenewalDate, currentDate)`
- Flags `isRenewingSoon = daysUntilRenewal >= 0 && daysUntilRenewal <= 7`

### 4.6 Toggle Behavior ("The Vibe Check")
- PATCH request updates subscription `status` field only (`active` | `paused`).
- Item stays in the data store permanently (no delete).
- Frontend re-renders row greyed out immediately (optimistic update).
- Metrics row recalculates burn rate excluding paused items in real time.

## 5. Non-Functional Requirements
- Simple stack, runnable locally in minutes (`npm install`, `npm run dev`).
- No external DB — JSON file storage on backend.
- Responsive basic layout (desktop-first is fine).

## 6. Out of Scope
- Authentication / multi-user
- Payment integration
- Email/push notifications
- Editing existing subscription details (only add + toggle status for v1)

## 7. Success Criteria
- Adding a subscription updates the grid and metrics instantly.
- Toggling Paused greys out row and reduces Monthly Burn Rate correctly.
- Subscriptions within 7 days show amber "Renewing Soon" badge.
- Yearly subscriptions correctly normalized to monthly in burn total.
