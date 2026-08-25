# Design.md — UI/UX Spec (for Stitch MCP)

## 1. Design Intent
Clean, modern personal-finance dashboard. Minimal, card-based, trustworthy fintech feel. Not playful — functional and legible.

## 2. Screens

### Screen 1: Dashboard (single page app)
Layout, top to bottom:

1. **Header**: App title "Subscription Tracker" + subtitle "Renewal Dashboard"
2. **Entry Form** (top card or collapsible panel):
   - Service Name (text input)
   - Cost (number input, currency prefix ₹ or $)
   - Billing Cycle (dropdown: Monthly / Yearly)
   - Next Renewal Date (date picker, calendar popup)
   - "Add Subscription" button (primary color, right-aligned)
3. **Metrics Row** (2 cards side by side, full width on mobile stacked):
   - Card A: "Total Monthly Burn Rate" — large number, currency formatted
   - Card B: "Upcoming Renewals" — large number + "in next 7 days" subtext
4. **Subscription Grid** (table):
   - Columns: Service | Cost | Cycle | Next Renewal | Status | Active/Paused
   - Row states:
     - Default: white/neutral background
     - Renewing soon (≤7 days, active): amber-tinted background + badge chip "Renewing Soon"
     - Paused: greyed out (opacity ~50%, muted text, toggle in "off" position)
   - Toggle switch: right-most column, standard on/off switch component

## 3. Color Palette
- Primary: Indigo/Blue (`#4F46E5` or similar) — buttons, active states
- Success/Neutral: Slate greys for base UI
- Warning (Renewing Soon): Amber (`#F59E0B`) background tint `#FEF3C7`
- Paused: Grey (`#9CA3AF`) at reduced opacity
- Background: `#F9FAFB`
- Cards: white with subtle shadow, rounded-lg corners

## 4. Typography
- Font: Inter or system-ui sans-serif
- Headings: semi-bold
- Metric numbers: large, bold (e.g. text-3xl/text-4xl)
- Body/table text: regular, text-sm/base

## 5. Components Needed
- `Card` (metrics + form container)
- `Input` (text, number)
- `Select` (billing cycle dropdown)
- `DatePicker` (calendar popup)
- `Button` (primary)
- `Table` with row-level conditional styling
- `Badge` (amber "Renewing Soon")
- `ToggleSwitch` (active/paused)

## 6. Interaction Notes
- Adding a subscription: form clears after submit, new row appears at top of grid.
- Toggle click: instant visual feedback (no page reload), row greys out/ungreys immediately.
- Metrics update live whenever grid data changes.

## 7. Stitch MCP Usage Notes
When generating screens via Stitch MCP in Antigravity:
- Generate the Dashboard screen first as one composite view (form + metrics + table).
- Prompt Stitch with: "fintech dashboard, subscription tracker, entry form + 2 metric cards + data table with status toggle, indigo primary color, clean minimal style"
- Export generated component styling/tokens and adapt into TailwindCSS classes in the React build — do not hand-copy raw Stitch HTML if it conflicts with the component structure in `agents.md`.
