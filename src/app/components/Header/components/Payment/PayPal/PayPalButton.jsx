import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "AfEnL4qp83rEaCb7asE6vWs6LnXEyUvf5z7hGvzEui7faHLUyz3WIEsCbC4qpsV9SrSY2GivGQpL0eSK" }}>
      <div className="w-full rounded-lg overflow-hidden">
        <PayPalButtons
          style={{ layout: 'vertical', color: 'white', shape: 'rect', label: 'paypal', height: 45 }}
          fundingSource="paypal"
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount.toString(),
                },
              }],
            }).then((orderID) => {
              console.log('Order created with ID:', orderID);
              return orderID;
            }).catch(error => {
              console.error('Error creating order:', error);
              alert('Error creating order. Please try again.');
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(details => {
              const orderID = data.orderID;
              console.log('Order approved with ID:', orderID);
              alert("Transaction completed by " + details.payer.name.given_name);
              onSuccess();

              // Only log here as you're focusing on frontend
              console.log("Order ID to be sent to backend:", orderID);
            }).catch(error => {
              console.error('Error capturing order:', error);
              alert('Error capturing order. Please try again.');
            });
          }}
          onError={(err) => {
            console.error('Error in PayPal button:', err);
            alert('Error with PayPal transaction. Please try again.');
          }}
        />
      </div>

      {/* Add some custom CSS to target the PayPal button */}
      <style jsx>{`
        .paypal-buttons {
          border-radius: 1rem !important; /* Equivalent to rounded-lg */
          overflow: hidden;
        }
      `}</style>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
