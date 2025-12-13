import Link from 'next/link';

const steps = [
  {
    title: 'Tell us what you want',
    description: 'Share the product link, size, and quantity. We handle US/UK stores and more.',
  },
  {
    title: 'Get one clear price',
    description: 'We combine item cost, shipping, customs, and service fee—no surprise bills later.',
  },
  {
    title: 'Pay and we deliver',
    description: 'Checkout via our payment link. We purchase abroad and deliver to you in Ghana.',
  },
];

const reasons = [
  'No US address needed—just send the link.',
  'We quote everything up front in GHS.',
  'Local team to keep you updated until delivery.',
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-wide text-emerald-700 font-semibold">Ghana-first cross-border shopping</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Buy from Amazon, Nike & global stores. Delivered to Ghana. One final price.
          </h1>
          <p className="text-lg text-slate-700">
            Send us the item link and we handle the rest—pricing, purchase, shipping, customs, and delivery. Clear communication, no hidden charges.
          </p>
          <div className="flex gap-4">
            <Link
              href="/request"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md"
            >
              Request an Item
            </Link>
            <a
              href="#how"
              className="px-6 py-3 rounded-lg border border-slate-300 text-slate-800 hover:border-slate-400"
            >
              See how it works
            </a>
          </div>
          <div className="text-sm text-slate-600">
            <p>Trusted by shoppers in Accra for sneakers, electronics, and hard-to-find items.</p>
          </div>
        </div>
        <div className="card p-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Transparent pricing, Ghana-focused</h2>
          <ul className="space-y-3 text-slate-700">
            <li>• We quote in Ghana Cedis with today&apos;s FX.</li>
            <li>• Customs and service fees included before you pay.</li>
            <li>• Pay once. We update you until the item arrives.</li>
          </ul>
          <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-emerald-900 text-sm">
            We operate like a concierge—no automation yet. Every request is handled by a real person.
          </div>
        </div>
      </section>

      <section id="how" className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.title} className="card p-6 space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="text-slate-700">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Why this beats forwarding services</h2>
        <div className="card p-6 space-y-3 text-slate-700">
          {reasons.map((reason) => (
            <p key={reason}>• {reason}</p>
          ))}
        </div>
      </section>

      <section className="card p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Ready to buy from abroad?</h3>
          <p className="text-slate-700">Send your product link and get a full price in minutes.</p>
        </div>
        <Link
          href="/request"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md"
        >
          Request an Item
        </Link>
      </section>
    </div>
  );
}
