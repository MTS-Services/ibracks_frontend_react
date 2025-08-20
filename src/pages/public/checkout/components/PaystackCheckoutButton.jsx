import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PropTypes from "prop-types";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

if (!PAYPAL_CLIENT_ID) {
  throw new Error(
    "❌ PayPal Client ID is missing. Please define VITE_PAYPAL_CLIENT_ID in your .env file.",
  );
}

const PayPalCheckoutButton = ({ currency = "USD", amount, onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency }}>
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "pay",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order.capture();
            console.log("✅ PayPal payment successful:", details);
            if (onSuccess) onSuccess(details);
          } catch (error) {
            console.error("❌ Error capturing PayPal payment:", error);
            alert("Something went wrong while capturing the payment.");
          }
        }}
        onError={(err) => {
          console.error("❌ PayPal Checkout Error:", err);
          alert("An error occurred with the PayPal payment. Please try again.");
        }}
        onCancel={() => {
          alert("PayPal payment was cancelled.");
        }}
      />
    </PayPalScriptProvider>
  );
};

PayPalCheckoutButton.propTypes = {
  currency: PropTypes.string,
  amount: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default PayPalCheckoutButton;
