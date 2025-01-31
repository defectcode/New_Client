import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import PayPalButton from './PayPal/PayPalButton';
import Image from 'next/image';
import CheckoutButton from "@/components/checkout";


const SupportFormCrowdfunding = ({selectedRewardName, selectedRewardPrice}) => {
  const [amount, setAmount] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [customAmount, setCustomAmount] = useState(null);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);


  const stripe = useStripe();
  const elements = useElements();

  const CLIENT_SECRET = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'; 

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

  const rewardPrice = parseFloat(
    selectedRewardPrice.replace(/[^0-9.]/g, '') || '0'
  );

  const total = rewardPrice + customAmount;

  const handleCustomAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setCustomAmount(value);
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    setIsPaymentSuccessful(true);
  
    const email = paymentIntent.charges.data[0].billing_details.email; 
    const firstName = paymentIntent.charges.data[0].billing_details.name?.split(' ')[0];
  
    try {
      const response = await fetch('/api/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName }),
      });
  
      if (!response.ok) {
        console.error('Failed to send thank-you email');
      }
    } catch (error) {
      console.error('Error sending thank-you email:', error);
    }
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
    <div className="flex flex-col justify-center items-center min-h-[350px] h-auto w-full font-heebo">
      <div className='w-full max-w-md'>
        <p className="text-[#6F6F6F] text-[12px] font-light">Reward</p>
        <div className="flex flex-col justify-between gap-2 mb-5 text-sm">

          <div className='flex items-center justify-between text-[15px]'>
            <h2 className='text-[#1E1E1E] font-semibold '>{selectedRewardName}</h2>
            <button className='bg-[#1E1E1E] text-[#FFFFFF] h-[45px] w-[98px] rounded-[10px] font-bold'>
              <span style={{ marginRight: '2px' }}>$</span>{selectedRewardPrice.replace('$', '').trim()}
            </button>
          </div>

          <div className="relative flex items-center justify-between flex-grow mt-[26px]">
            <h2 className='text-[#6F6F6F] font-light'>Bonus Support</h2>
            <input
              type="number"
              pattern="\d*"
              value={customAmount}
              onClick={handleCustomAmountClick} 
              onChange={handleCustomAmountChange}
              className={`px-3 py-[10px] border-[#979797]/50 rounded-xl font-normal max-w-[80px] w-full max-sm:w-[70px] flex-grow h-[45px] ${
                isCustomAmount
                  ? 'bg-[#1E1E1E] border-transparent' 
                  : 'bg-[#E8E8ED] border-2' 
              }`}
              placeholder="$Other"
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
          <p className="text-[#1E1E1E] text-[14px]">Total:</p>
          <div className="flex-grow border-t border-dotted border-gray-600 mx-6"></div>
          <p className="text-[#1E1E1E] mr-1 flex gap-[3px]">${total.toFixed(2)}</p>
        </div>
        <p className="mt-10 mb-4 text-[#6F6F6F] text-[12px] font-light flex justify-start ml-1">Select a Payment Method:</p>
        <div className="flex items-center justify-between mb-4 gap-5">
          {['stripe', 'paypal'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`rounded-xl font-bold flex items-center justify-center flex-grow h-[45px] mb-5 ${
                paymentMethod === method ? 'bg-[#1E1E1E] text-white ' : 'bg-[#E8E8ED] text-[#979797] border-2 border-[#979797]'
              }`}
            >
              {method === 'paypal' ? (
                <div className="flex items-center px-5 max-md:px-2">
                  {paymentMethod === 'paypal' ? (
                    <Image src="/icons/paypal.svg" width={48} height={1} alt="paypal" />
                  ) : (
                    <Image src="/icons/paypal-gray.svg" width={48} height={1} alt="paypal-gray" />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {paymentMethod === 'stripe' ? (
                    <Image src="/icons/card.svg" width={64} height={1} alt="card" />
                  ) : (
                    <Image src="/icons/card-gray.svg" width={64} height={1} alt="card-gray" />
                  )}
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

export default SupportFormCrowdfunding;
