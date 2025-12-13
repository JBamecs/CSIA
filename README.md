# Cross-Border Concierge MVP

A lightweight Next.js + SQLite MVP that lets Ghanaian shoppers submit product requests, receive manual pricing, and pay via a simulated link.

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

### If `npm install` fails on macOS (Apple Silicon)
- Node 24+ requires a C++20 toolchain; macOS command-line tools often default to C++17, which can break native addons like `better-sqlite3`.
- Fix by switching to Node 20 via `nvm install 20 && nvm use 20` (matches `.nvmrc`).
- Ensure the Xcode Command Line Tools are present: `xcode-select --install`.
- Retry `npm install` afterward.

## Deploying
- Works on platforms that support Next.js (e.g., Vercel). Ensure the `data` directory is writable or connect to a managed Postgres/SQLite equivalent.
- Set environment variables in your host to match the ones above.
