import React, { useEffect, useState, useCallback } from 'react';
import './PayPal.css';

const PayPalButton = ({ totalAmount }) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isButtonRendered, setIsButtonRendered] = useState(false);

  const navigateTo = (url) => {
    window.location.href = url;
  };

  const loadPayPalScript = useCallback(() => {
    const scriptId = 'paypal-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=ASOxDBySChHRQPQC0EICF5vMRWfVp-73bRtt8wVOjApc-7OggX1GtvgRas0BwM6thvDslDte3OrezYQ1&currency=USD';
      script.id = scriptId;
      script.async = true;

      script.onload = () => {
        console.log('PayPal script loaded successfully.');
        setIsScriptLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load PayPal script. Please check the client ID or network.');
        alert('Failed to load PayPal script. Please try again later.');
      };

      document.body.appendChild(script);
    } else {
      console.log('PayPal script already exists.');
      setIsScriptLoaded(true);
    }
  }, []);

  const renderPayPalButton = useCallback(() => {
    if (window.paypal && isScriptLoaded && !isButtonRendered) {
      try {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalAmount.toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const order = await actions.order.capture();
              console.log('Payment approved:', order);

              await fetch('/api/orders/paypal/capture', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId: order.id }),
              });

              alert('Payment successful!');
              navigateTo('/thankyou');
            } catch (error) {
              console.error('Error capturing the payment:', error);
              alert('Payment failed during capture. Please try again.');
              navigateTo('/error');
            }
          },
          onError: (err) => {
            console.error('Error with PayPal:', err);
            alert('Payment failed. Please contact support.');
            navigateTo('/error');
          },
          onCancel: () => {
            console.log('Payment cancelled by user.');
            navigateTo('/cancel');
          },
        }).render('#paypal-button-container');

        setIsButtonRendered(true);
      } catch (error) {
        console.error('Error rendering PayPal button:', error);
        alert('Failed to render PayPal button. Please try again later.');
      }
    }
  }, [isScriptLoaded, totalAmount, isButtonRendered]);

  useEffect(() => {
    loadPayPalScript();

    return () => {
      const script = document.getElementById('paypal-script');
      if (script) {
        script.remove();
        console.log('PayPal script removed.');
      }
      setIsScriptLoaded(false);
      setIsButtonRendered(false);
    };
  }, [loadPayPalScript]);

  useEffect(() => {
    renderPayPalButton();
  }, [renderPayPalButton]);

  return (
    <div className="w-full flex justify-center mt-4">
      <div id="paypal-button-container"></div>
      {!isScriptLoaded && <p>Loading PayPal...</p>}
    </div>
  );
};

export default PayPalButton;
