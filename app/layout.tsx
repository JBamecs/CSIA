import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shop Abroad to Ghana | Concierge MVP',
  description: 'Request items from Amazon, Nike, and global stores. Delivered to Ghana with one final price.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <nav className="container-width px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-slate-900">
              Cross-Border Concierge
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
              <Link href="/request" className="hover:text-emerald-700">
                Request
              </Link>
              <Link href="/admin" className="hover:text-emerald-700">
                Admin
              </Link>
            </div>
          </nav>
        </header>
        <main className="container-width px-4 py-10">{children}</main>
        <footer className="border-t border-slate-200 bg-white/80">
          <div className="container-width px-4 py-6 text-sm text-slate-600 flex justify-between">
            <p>Built for Ghanaian shoppers who want transparent overseas buying.</p>
            <p>Contact: support@crossborder-gh.com</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
