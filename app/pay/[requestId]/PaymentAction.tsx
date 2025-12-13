'use client';

interface Props {
  requestId: number;
  disabled?: boolean;
  onPaid?: () => void;
}

export default function PaymentAction({ requestId, disabled, onPaid }: Props) {
  const handlePay = async () => {
    const res = await fetch(`/api/requests/${requestId}/pay`, { method: 'POST' });
    if (res.ok) {
      onPaid?.();
      alert('Payment simulated successfully.');
    } else {
      alert('Unable to process payment.');
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={disabled}
      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
    >
      Pay Now
    </button>
  );
}
