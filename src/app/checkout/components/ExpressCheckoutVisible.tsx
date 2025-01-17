import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useState } from "react";
import Modal from "./order/ModalPayPal";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import PayPalButton from '@/app/components/Header/components/Payment/PayPal/PayPalButton';

const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export default function ExpressCheckoutVisible() {
  const { items } = useCart();
  const [isExpressCheckoutVisible, setExpressCheckoutVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.2; 
  const totalAmount = subtotal + subtotal * taxRate;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentSuccessful(true);
    setIsModalOpen(false);
    alert('Payment successful!');
  };

  const handleStripeCheckout = async (paymentMethod: string) => {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Stripe failed to initialize.');
    }

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        paymentMethod,
      }),
    });

    const data = await response.json();

    if (!data.sessionId) {
      throw new Error('No sessionId returned from Stripe API');
    }

    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <>
      <h2 className="w-full text-left pb-5 font-Heebo-24 text-[#1e1e1e] md:mt-0 mt-10 md:block hidden">
        Want to check out faster?
      </h2>
      <h2 className="w-full text-left pb-5 font-Heebo-18-med text-[#424242] md:mt-0 mt-10 md:hidden">
        Want to check out faster?
      </h2>

      {isExpressCheckoutVisible && (
        <>
          <div className="flex flex-col gap-5 mb-6">
            <div className="flex gap-[15px] md:h-[56px] h-12">

              {/* PayPal Button */}
              <div className="w-full">
                <button
                  className="w-full py-2 border rounded-[10px] bg-[#00457C] flex items-center justify-center md:h-[56px] h-12"
                  onClick={handleOpenModal}
                >
                  <img
                    src="/images/paypal.svg"
                    alt="PayPal"
                    className="md:w-[69px] md:h-[18px] w-[48px] h-[13px]"
                  />
                </button>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <h2 className="text-lg font-semibold mb-4">Complete Payment</h2>
                  <PayPalButton amount={totalAmount} onSuccess={handlePaymentSuccess} />
                </Modal>
              </div>

              {/* Stripe Apple Pay */}
              <div className="w-full">
                <button
                  className="w-full py-2 border rounded-[10px] bg-[#000000] flex items-center justify-center md:h-[56px] h-12"
                  onClick={() => handleStripeCheckout('apple_pay')}
                >
                  <Image
                    src="/images/applepay.svg"
                    alt="Apple Pay"
                    width={54}
                    height={20}
                    className="md:w-[54px] md:h-[20px] w-[42px] h-[16px]"
                  />
                </button>
              </div>

              {/* Stripe Amazon Pay */}
              <div className="w-full">
                <button
                  className="w-full py-2 border rounded-[10px] bg-[#333E48] flex items-center justify-center md:h-[56px] h-12"
                  onClick={() => handleStripeCheckout('amazon_pay')}
                >
                  <Image
                    src="/images/amazonpay.svg"
                    alt="Amazon Pay"
                    width={102}
                    height={20}
                    className="mt-1 md:w-[102px] md:h-[20px] w-[81px] h-[15px]"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:mt-5 mt-10">
            <div className="flex-1 border-t border-gray-300"></div>
            <h1 className="mx-2 font-Heebo-16 text-[#424242]">OR</h1>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        </>
      )}
    </>
  );
}
