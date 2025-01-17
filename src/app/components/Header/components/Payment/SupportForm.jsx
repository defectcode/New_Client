import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import PayPalButton from './PayPal/PayPalButton';
import Image from 'next/image';
import CheckoutButton from "@/components/checkout";


const SupportForm = () => {
  const [amount, setAmount] = useState(50); // Setare valoare inițială la 50
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
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
          CLIENT_SECRET, // Înlocuiește cu valoarea hardcodată sau obținută din backend
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
            handlePaymentSuccess();
          }
        }
      });
    }
  }, [stripe, amount]);

  const handleAmountChange = (amt) => {
    setIsCustomAmount(false);
    setAmount(amt);
  };

  const handleCustomAmountClick = () => {
    setIsCustomAmount(true);
    setAmount(customAmount === '' ? 0 : parseFloat(customAmount));
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value === '' ? 0 : parseFloat(value));
  };

  const handlePaymentSuccess = () => {
    setIsPaymentSuccessful(true);
  };

  const handleSupportClick = async () => {
    if (paymentMethod === 'stripe') {
      const width = 600;
      const height = 800;
      const left = (window.screen.width / 2) - (width / 2);
      const top = (window.screen.height / 2) - (height / 2);

      const stripeDonateUrl = `https://donate.stripe.com/14kaFlb407Nu76weUV?amount=`;

      window.open(
        stripeDonateUrl,
        'Stripe Donation',
        `width=${width},height=${height},top=${top},left=${left}`,
      );
    } else if (paymentMethod === 'paypal') {
      document.querySelector('.paypal-button-container button').click();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[350px] h-auto w-full">
      <div className='w-full max-w-md'>
        <p className="mb-5 text-[#6F6F6F] text-[12px] font-light ml-1">Select your support amount:</p>
        <div className="flex justify-between gap-2 mb-5 text-sm">
          <button
            onClick={() => handleAmountChange(1)}
            className={`flex items-center justify-center border-[#979797]/50 rounded-[10px] max-w-[80px] w-full max-sm:w-[75px] flex-grow h-[45px] ${amount === 1 && !isCustomAmount ? 'bg-[#1E1E1E] text-[#FFFFFF] font-bold' : 'bg-[#E8E8ED] text-[#979797] border-2 border-[#3e3d3d] flex flex-row gap-[1px] font-ekMukta'}`}
          >
            $
            <span style={{ fontWeight: amount === 1 && !isCustomAmount ? 700 : 400 }}>1</span>
          </button>

          <button
            onClick={() => handleAmountChange(50)}
            className={`flex items-center justify-center border-[#979797]/50 rounded-xl max-w-[80px] w-full max-sm:w-[75px] flex-grow h-[45px] ${amount === 50 && !isCustomAmount ? 'bg-[#1E1E1E] text-[#FFFFFF] font-bold' : 'bg-[#E8E8ED] text-[#979797] border-2 border-[#3e3d3d] flex flex-row gap-[1px] font-ekMukta'}`}
          >
            $
            <span style={{ fontFamily: 'Ek Mukta, sans-serif', fontWeight: amount === 50 && !isCustomAmount ? 700 : 400 }}>50</span>
          </button>

          <button
            onClick={() => handleAmountChange(500)}
            className={`flex items-center justify-center border-[#979797]/50 rounded-xl max-w-[80px] w-full max-sm:w-[70px] flex-grow h-[45px] ${amount === 500 && !isCustomAmount ? 'bg-[#1E1E1E] text-[#FFFFFF] font-bold' : 'bg-[#E8E8ED] text-[#979797] border-2 border-[#3e3d3d] flex flex-row gap-[1px] font-ekMukta'}`}
          >
            $
            <span style={{ fontFamily: 'Ek Mukta, sans-serif', fontWeight: amount === 500 && !isCustomAmount ? 700 : 400 }}>500</span>
          </button>

          <div className="relative flex items-center justify-center flex-grow">
            <div
              className={`absolute left-[12px] top-1/2 transform -translate-y-1/2 w-[7px] font-heebo ${
                isCustomAmount ? 'text-[#FFFFFF]' : 'text-[#5B5B5B]'
              }`}
            >
              $
            </div>
            <input
              type="number"
              pattern="\d*"
              value={customAmount}
              onClick={handleCustomAmountClick} 
              onChange={handleCustomAmountChange}
              className={`pl-5 pr-2 py-[10px] border-[#979797]/50 rounded-xl font-normal max-w-[80px] w-full max-sm:w-[70px] flex-grow h-[45px] ${
                isCustomAmount
                  ? 'bg-[#1E1E1E] border-transparent' // Stiluri când este selectat
                  : 'bg-[#E8E8ED] border-2' // Stiluri când NU este selectat
              }`}
              placeholder="Other"
              style={{
                appearance: 'textfield',
                fontSize: '16px',
                '::placeholder': {
                  color: isCustomAmount ? '#FFFFFF' : '#5B5B5B',
                },
              }}
            />
            <style jsx>{`
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }

              input[type='number'] {
                -moz-appearance: textfield;
              }
            `}</style>
          </div>

        </div>
        <div className="my-5 mt-10 flex justify-between items-center w-full mx-auto">
          <p className="text-[#1E1E1E] font-ek-mukta text-[14px]">Total:</p>
          <div className="flex-grow border-t border-dotted border-gray-600 mx-6"></div>
          <p className="text-[#1E1E1E] font-ek-mukta mr-1 flex gap-[3px] font-ekMukta">${amount}</p>
        </div>
        <p className="mt-10 mb-4 text-[#6F6F6F] text-[12px] font-light flex justify-start ml-1">Select a Payment Method:</p>
        <div className="flex items-center justify-between mb-4 gap-4"> {/* Modificat gap la 4 (16px) */}
          {['stripe', 'paypal'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`rounded-xl font-bold flex items-center justify-center flex-grow h-[45px] mb-5 ${paymentMethod === method ? 'bg-[#1E1E1E] text-white ' : 'bg-[#E8E8ED] text-[#979797] border-2 border-[#979797]'}`}
            >
              {method === 'paypal' ? (
                <div className='flex items-center px-5 max-md:px-2'>
                  <Image src="/icons/paypal.svg" width={48} height={1} alt="paypal"/>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 ">
                  <Image src="/icons/card.svg" width={64} height={1} alt="card"/>
                </div>
              )}
            </button>
          ))}
        </div>

        {paymentMethod === 'paypal' && (
          <div className="paypal-button-container">
            <PayPalButton amount={amount} onSuccess={handlePaymentSuccess} />
          </div>
        )}
        {paymentMethod === 'stripe' && (
          <div className="flex justify-center items-end h-[48px]">
            <CheckoutButton amount={amount} />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default SupportForm;
