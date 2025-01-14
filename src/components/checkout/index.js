import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ amount }) => {
  const router = useRouter();

  const handleClick = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/stripe/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      console.error('Eroare la crearea sesiunii Stripe:', response.statusText);
      router.push('/error');
      return;
    }

    const { sessionId } = await response.json();
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Eroare la redirecționarea către Stripe:', error);
      router.push('/error');
    }
  };

  return (
    <button
      className="flex items-center justify-center w-full h-[45px] bg-white text-[#1E1E1E] text-[16px] rounded-lg gap-1 font-bold"
      onClick={handleClick}
    >
      <Image src="/icons/heart.svg" width={16} height={1} alt="heart" className="w-[16px] h-auto" />
      Support
    </button>
  );
};

export default CheckoutButton;