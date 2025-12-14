"use client";

interface Props {
  orderId: string;
  disabled?: boolean;
  onPaid?: () => void;
}

export default function PaymentAction({ orderId, disabled, onPaid }: Props) {
  const handlePay = async () => {
    const res = await fetch(`/api/orders/${orderId}/pay`, { method: "POST" });
    const data = await res.json();
    if (res.ok) {
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        onPaid?.();
        alert("Payment simulated.");
      }
    } else {
      alert(data.error || "Unable to process payment.");
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
