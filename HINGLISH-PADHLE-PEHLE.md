# Pehle Ye Padhle Bhai 👋

## Kya Bana Rahe Hain?
Ek **Subscription Tracker Dashboard** — jaise Netflix, Spotify, ChatGPT jaisi services ka tumhara monthly kharcha track karega. Kitna paisa jaa raha hai, kaunsi subscription kab renew hogi, aur agar kisi ko "Pause" kar do toh usse calculation se hata dega — bina delete kiye.

## Kaam Kaise Hoga?
Hum **Antigravity** (vibe-coding agent) use kar rahe hain, jo humare docs/*.md files padh ke khud code likhega. UI design ke liye **Stitch MCP** use hoga. Har `.md` file ek alag kaam karti hai:

- **`prd.md`** — Product Requirement Doc. Yaani "kya banana hai" ka poora spec. Agent isse padh ke samjhega features kya hain.
- **`design.md`** — UI/UX ka blueprint (colors, layout, components). Stitch MCP isse follow karke screens generate karega.
- **`agents.md`** — Rules for the coding agent: kaise kaam karna hai, PowerShell commands ka format, milestone-wise workflow (build → test → error check → commit → push).
- **`milestones.md`** — Project chhote-chhote steps (milestones) mein todha hua hai, taaki 1 hour mein complete ho sake, aur har step ke baad checkpoint ho.
- **`review.md`** — Har milestone ke baad ek checklist — bugs check karo, test karo, tabhi commit karo.
- **`memory.md`** — Agent ka "diary" — jo bhi decisions liye, jo bhi progress hui, wo yahan likhta jayega, taaki agent context na bhoole (especially since Antigravity may run in multiple prompts/sessions).

## Stack (Simple Rakha Hai)
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express (simple JSON file storage — no DB setup, koi headache nahi)
- **Design:** Stitch MCP (Antigravity ke andar)

## Workflow
1. Agent `prd.md` + `design.md` padhega
2. `milestones.md` ke hisaab se ek-ek milestone banayega
3. Har milestone ke baad — error check + testing (`review.md` checklist follow karega)
4. Sab sahi hua toh PowerShell commands se commit + push karega repo mein:
   `https://github.com/Kingslaye-varun/vibe-code-round.git`
5. `memory.md` update hota rahega taaki agent ko pata rahe ab tak kya hua

## Time Target
Poora project ~1 hour mein complete — kyunki milestones chhote hain aur stack simple hai.

Bas ab neeche docs folder mein saari files hain, unhe apne repo mein daal do aur Antigravity ko point kar do `docs/agents.md` se start karne ke liye. Chalo shuru karte hain! 🚀
