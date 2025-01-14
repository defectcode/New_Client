import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ amount, onPaymentSuccess }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "BAA9lD-ce_NPiSOAr6nu0x147qCJmHVcPqpOX8OsTlnL52cBuXKpyGVcxc1i3pZRwPZnGVVXEmylJtD5SM", "currency": "EUR" }}>
      <div>
        <PayPalButtons
          style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount.toString(),
                },
              }],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(details => {
              alert(`Transaction completed by ${details.payer.name.given_name}`);
              onPaymentSuccess();
            });
          }}
          onError={(err) => {
            console.error('PayPal Checkout onError', err);
            alert('An error occurred with PayPal. Please try again.');
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
