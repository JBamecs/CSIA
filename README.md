# Cross-Border Concierge MVP

A lightweight Next.js + SQLite MVP that lets Ghanaian shoppers submit product requests, receive manual pricing, and pay via a simulated link.

## Getting started
1. Install dependencies (Node 18+):
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000.

## Admin access
- Visit `/admin` and enter the password `concierge-admin` (override by setting `NEXT_PUBLIC_ADMIN_PASSWORD`).
- Create pricing to generate totals and a payment link for each request.

## Payment simulation
- Customers visit `/pay/{requestId}`.
- Clicking **Pay Now** calls a mock endpoint, marks the request as paid, and stores a payment reference.

## Environment
- Currency conversion uses `EXCHANGE_RATE_GHS_PER_USD` (defaults to `12`).
- SQLite database is stored in `data/app.db`.

## Deploying
- Works on platforms that support Next.js (e.g., Vercel). Ensure the `data` directory is writable or connect to a managed Postgres/SQLite equivalent.
- Set environment variables in your host to match the ones above.
