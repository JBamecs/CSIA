# Cross-Border Concierge MVP

A Ghana-first concierge shopping flow (Next.js + Firestore) with brand browsing, Easy Mode carts, and Hubtel-ready payments.

## Getting started
1. Use Node 18 or 20 (recommended: Node 20 LTS). If you have `nvm`, run:
   ```bash
   nvm install 20 && nvm use 20
   ```
   The project root includes an `.nvmrc` pinning Node `20.17.0` for convenience.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy env template and fill in secrets:
   ```bash
   cp .env.example .env.local
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000.

## Admin access
- Visit `/admin` and enter the password `concierge-admin` (override by setting `NEXT_PUBLIC_ADMIN_PASSWORD`).
- Select an order, add quote fields (USD), set FX, and copy the pay link.
- Update status milestones (submitted → quoted → paid → ordered → shipped → delivered).

## Payments (Hubtel-ready)
- `/pay/{orderId}` shows invoice and starts Hubtel checkout (Mobile Money + card) from the server.
- If Hubtel keys are missing, payments are simulated and the order is marked paid.
- Webhook endpoint: `/api/payments/hubtel/webhook` (configure in Hubtel dashboard).

## Environment
- Firestore Admin (service account):
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY` (escape newlines as `\n`)
- Hubtel (optional for live payments):
  - `HUBTEL_API_KEY`
  - `HUBTEL_MERCHANT_ACCOUNT`
  - `NEXT_PUBLIC_BASE_URL` (e.g., `http://localhost:3000` or your deployed URL)
- Admin password: `NEXT_PUBLIC_ADMIN_PASSWORD` (default `concierge-admin`).

### If `npm install` fails on macOS (Apple Silicon)
- Stick to Node 20 (`nvm install 20 && nvm use 20`).
- Ensure Xcode Command Line Tools: `xcode-select --install`.

## Deploying
- Works on Vercel/Node hosts. Provide env vars above. Firestore is managed; no local DB file required.
