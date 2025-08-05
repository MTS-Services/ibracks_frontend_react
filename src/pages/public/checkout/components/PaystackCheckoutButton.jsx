// import React, { useState, useEffect } from "react";
// import { FaArrowRight } from "react-icons/fa";

// const PaystackCheckoutButton = ({ email, amount, onSuccessfulPayment }) => {
//   const [scriptStatus, setScriptStatus] = useState("loading");

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://js.paystack.co/v1/inline.js";
//     script.async = true;

//     const onScriptLoad = () => setScriptStatus("ready");
//     const onScriptError = () => {
//       console.error("Paystack script failed to load.");
//       setScriptStatus("error");
//     };

//     script.addEventListener("load", onScriptLoad);
//     script.addEventListener("error", onScriptError);

//     document.body.appendChild(script);

//     return () => {
//       script.removeEventListener("load", onScriptLoad);
//       script.removeEventListener("error", onScriptError);
//     };
//   }, []);

//   const initializePayment = () => {
//     if (scriptStatus !== "ready" || typeof window.PaystackPop === "undefined") {
//       alert("Paystack is not ready. Please try again.");
//       return;
//     }

//     const amountInKobo = Math.round(amount * 100);

//     if (amountInKobo <= 0) {
//       alert("Invalid amount. Total must be greater than zero.");
//       return;
//     }

//     const paymentConfig = {
//       key: "pk_test_d71e3f12a34238b0c4416c4bc6002b5a49956972",
//       email: "mdridoyhasankamrul@gmail.com",
//       amount: amountInKobo,
//       currency: "NGN", // FIX: Changed back to NGN as USD is not supported by the merchant account
//       ref: "txn_" + Date.now(),
//       channels: ["card"],
//       callback: (reference) => {
//         onSuccessfulPayment(reference);
//       },
//       onClose: () => {
//         alert("Transaction was not completed.");
//       },
//     };

//     console.log("Final Payment Config:", paymentConfig);

//     const handler = window.PaystackPop.setup(paymentConfig);
//     handler.openIframe();
//   };

//   const commonClasses =
//     "mt-4 flex w-full items-center justify-between rounded-xl px-6 py-4 font-semibold text-white transition-colors";

//   if (scriptStatus === "loading") {
//     return (
//       <button
//         disabled
//         className={`${commonClasses} cursor-not-allowed bg-gray-500`}
//       >
//         <span>${amount.toFixed(2)}</span>
//         <span>Loading Payment...</span>
//         <FaArrowRight />
//       </button>
//     );
//   }

//   if (scriptStatus === "error") {
//     return (
//       <button
//         disabled
//         className={`${commonClasses} cursor-not-allowed bg-red-600`}
//       >
//         <span>Error</span>
//         <span>Payment Unavailable</span>
//         <FaArrowRight />
//       </button>
//     );
//   }

//   return (
//     <button
//       onClick={initializePayment}
//       className={`${commonClasses} bg-yellow-600 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400`}
//     >
//       <span>${amount.toFixed(2)}</span>
//       <span>Checkout with Paystack</span>
//       <FaArrowRight />
//     </button>
//   );
// };

// export default PaystackCheckoutButton;

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// This is a new, self-contained component for the PayPal button.
const PayPalCheckoutButton = ({ currency, amount, onSuccess }) => {
  // IMPORTANT: Replace this with your own client ID from your PayPal Developer Dashboard
  const PAYPAL_CLIENT_ID =
    "AdUa_Fvt0tf9rYbd1412hS_ChPoSbTP9fGj1PblIXwwOsBzLTyD8I2xnRDmT6eNgdBRMtiAAl9yVYYjW";

  return (
    <PayPalScriptProvider
      options={{ "client-id": PAYPAL_CLIENT_ID, currency: currency }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "pay",
        }}
        createOrder={(data, actions) => {
          // This function sets up the details of the transaction.
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount.toFixed(2), // Ensure amount is a string with 2 decimal places
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          // This function captures the funds from the transaction.
          const details = await actions.order.capture();
          console.log("✅ PayPal payment successful. Details:", details);
          // Call the success handler passed from the parent component
          onSuccess(details);
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

export default PayPalCheckoutButton;
