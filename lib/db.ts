import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'app.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_url TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  size_color TEXT,
  delivery_location TEXT,
  phone TEXT,
  email TEXT,
  status TEXT DEFAULT 'submitted',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pricing (
  request_id INTEGER PRIMARY KEY,
  item_price_usd REAL,
  shipping_cost REAL,
  customs_estimate REAL,
  service_fee REAL,
  total_ghs REAL,
  FOREIGN KEY(request_id) REFERENCES requests(id)
);

CREATE TABLE IF NOT EXISTS payments (
  request_id INTEGER PRIMARY KEY,
  payment_status TEXT,
  payment_reference TEXT,
  FOREIGN KEY(request_id) REFERENCES requests(id)
);
`);

export interface RequestInsert {
  product_url: string;
  quantity?: number;
  size_color?: string;
  delivery_location: string;
  phone: string;
  email: string;
}

export interface PricingInsert {
  item_price_usd: number;
  shipping_cost: number;
  customs_estimate: number;
  service_fee: number;
  total_ghs: number;
}

export function createRequest(payload: RequestInsert) {
  const stmt = db.prepare(
    `INSERT INTO requests (product_url, quantity, size_color, delivery_location, phone, email, status) VALUES (?, ?, ?, ?, ?, ?, 'submitted')`
  );
  const info = stmt.run(
    payload.product_url,
    payload.quantity ?? 1,
    payload.size_color ?? '',
    payload.delivery_location,
    payload.phone,
    payload.email
  );
  return info.lastInsertRowid as number;
}

export function listRequests() {
  const rows = db
    .prepare(
      `SELECT r.*, p.item_price_usd, p.shipping_cost, p.customs_estimate, p.service_fee, p.total_ghs, pay.payment_status
       FROM requests r
       LEFT JOIN pricing p ON p.request_id = r.id
       LEFT JOIN payments pay ON pay.request_id = r.id
       ORDER BY r.created_at DESC`
    )
    .all();
  return rows.map((row) => ({
    id: row.id,
    product_url: row.product_url,
    quantity: row.quantity,
    size_color: row.size_color,
    delivery_location: row.delivery_location,
    phone: row.phone,
    email: row.email,
    status: row.status,
    created_at: row.created_at,
    pricing:
      row.item_price_usd != null
        ? {
            item_price_usd: row.item_price_usd,
            shipping_cost: row.shipping_cost,
            customs_estimate: row.customs_estimate,
            service_fee: row.service_fee,
            total_ghs: row.total_ghs,
          }
        : undefined,
    payment_status: row.payment_status,
  }));
}

export function getRequestById(id: number) {
  const row = db
    .prepare(
      `SELECT r.*, p.item_price_usd, p.shipping_cost, p.customs_estimate, p.service_fee, p.total_ghs, pay.payment_status, pay.payment_reference
       FROM requests r
       LEFT JOIN pricing p ON p.request_id = r.id
       LEFT JOIN payments pay ON pay.request_id = r.id
       WHERE r.id = ?`
    )
    .get(id);
  if (!row) return null;
  return {
    id: row.id,
    product_url: row.product_url,
    quantity: row.quantity,
    size_color: row.size_color,
    delivery_location: row.delivery_location,
    phone: row.phone,
    email: row.email,
    status: row.status,
    created_at: row.created_at,
    pricing:
      row.item_price_usd != null
        ? {
            item_price_usd: row.item_price_usd,
            shipping_cost: row.shipping_cost,
            customs_estimate: row.customs_estimate,
            service_fee: row.service_fee,
            total_ghs: row.total_ghs,
          }
        : undefined,
    payment_status: row.payment_status,
    payment_reference: row.payment_reference,
  };
}

export function savePricing(requestId: number, pricing: PricingInsert) {
  const stmt = db.prepare(
    `INSERT INTO pricing (request_id, item_price_usd, shipping_cost, customs_estimate, service_fee, total_ghs)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(request_id) DO UPDATE SET
      item_price_usd=excluded.item_price_usd,
      shipping_cost=excluded.shipping_cost,
      customs_estimate=excluded.customs_estimate,
      service_fee=excluded.service_fee,
      total_ghs=excluded.total_ghs`
  );
  stmt.run(
    requestId,
    pricing.item_price_usd,
    pricing.shipping_cost,
    pricing.customs_estimate,
    pricing.service_fee,
    pricing.total_ghs
  );
  db.prepare(`UPDATE requests SET status = 'priced' WHERE id = ?`).run(requestId);
}

export function recordPayment(requestId: number, reference: string) {
  const stmt = db.prepare(
    `INSERT INTO payments (request_id, payment_status, payment_reference)
     VALUES (?, 'paid', ?)
     ON CONFLICT(request_id) DO UPDATE SET payment_status='paid', payment_reference=excluded.payment_reference`
  );
  stmt.run(requestId, reference);
  db.prepare(`UPDATE requests SET status = 'paid' WHERE id = ?`).run(requestId);
}
