import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import Image from 'next/image';


const StripePayment = ({ amount, onPaymentSuccess }) => {
  const [paymentRequest, setPaymentRequest] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  // Valoare hardcodată pentru CLIENT_SECRET (Numai pentru testare)
  const CLIENT_SECRET = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'; // Înlocuiește cu cheia ta de test

  useEffect(() => {
    if (stripe && amount > 0) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Support Amount',
          amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (event) => {
        const { error } = await stripe.confirmCardPayment(
          CLIENT_SECRET,
          {
            payment_method: event.paymentMethod.id,
          },
          {
            handleActions: false,
          }
        );
        if (error) {
          event.complete('fail');
        } else {
          event.complete('success');
          const { error: confirmError } = await stripe.confirmCardPayment(CLIENT_SECRET);
          if (confirmError) {
            console.log('Payment failed', confirmError);
          } else {
            onPaymentSuccess();
          }
        }
      });
    }
  }, [stripe, amount]);

  return (
    <>
      {paymentRequest && (
        <PaymentRequestButtonElement
          options={{ paymentRequest }}
          className="PaymentRequestButton"
        />
      )}
      <div className="flex justify-center items-end">
        <button
          onClick={() => {
            const width = 600;
            const height = 800;
            const left = (window.screen.width / 2) - (width / 2);
            const top = (window.screen.height / 2) - (height / 2);

            const stripeDonateUrl = `https://donate.stripe.com/14kaFlb407Nu76weUV?amount=${amount}`;

            window.open(
              stripeDonateUrl,
              'Stripe Donation',
              `width=${width},height=${height},top=${top},left=${left}`,
            );
          }}
          className="flex items-center justify-center w-full h-[45px] bg-white text-[#1E1E1E] text-[16px] rounded-lg gap-1 font-bold"
          style={{ fontFamily: 'Avenir Heavy, sans-serif' }}
        >
          <Image src="/icons/heart.svg" width={16} height={1} alt="heart" className="w-[16px] h-auto" />
          Support
        </button>
      </div>
    </>
  );
};

export default StripePayment;
