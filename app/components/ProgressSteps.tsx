"use client";

const steps = [
  { label: "Add Items", description: "Shop brands or paste links" },
  { label: "Checkout", description: "Share delivery + contact" },
  { label: "Pay & Track", description: "Mobile Money or card" },
];

export function ProgressSteps({ current }: { current: number }) {
  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-5xl px-4 py-3 flex flex-wrap gap-3 items-center">
        {steps.map((step, idx) => {
          const active = idx === current;
          return (
            <div
              key={step.label}
              className={`flex-1 min-w-[200px] rounded-lg border px-3 py-2 ${
                active ? "border-black bg-black text-white" : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Step {idx + 1}</div>
                <div className="text-xs uppercase tracking-wide">{step.label}</div>
              </div>
              <div className="text-xs mt-1 opacity-80">{step.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
