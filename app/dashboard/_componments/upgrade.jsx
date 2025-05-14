import { useRouter } from 'next/router';

export default function Upgrade() {
  const router = useRouter();

  const handleStripe = async () => {
    const res = await fetch('/api/stripe');
    const data = await res.json();
    router.push(data.url);
  };

  const handleRazorpay = async () => {
    const res = await fetch('/api/razorpay');
    const data = await res.json();
    const rzp = new window.Razorpay(data);
    rzp.open();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Choose Payment Method</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
        onClick={handleStripe}
      >
        Pay with Stripe
      </button>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleRazorpay}
      >
        Pay with Razorpay
      </button>
    </div>
  );
}
