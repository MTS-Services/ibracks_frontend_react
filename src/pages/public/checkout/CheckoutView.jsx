// import { IoIosArrowBack } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import { FaTrashAlt, FaArrowRight } from "react-icons/fa";
// import { clearCart, removeItem } from "../../../featured/cart/cartSlice";
// import PayPalCheckoutButton from "./components/PaystackCheckoutButton";

// function CheckoutView() {
//   const dispatch = useDispatch();

//   const { items, totalQuantity } = useSelector((state) => state.cart);
//   const user = useSelector((state) => state.auth?.user);

//   const userEmail = user?.email || "customer@example.com";

//   const subtotal = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );
//   const shipping = 0.0;
//   const total = subtotal + shipping;

//   // This function will be called after a successful PayPal payment
//   const handleSuccessfulPayment = async (paypalDetails) => {
//     console.log(
//       "✅ Handling successful payment. PayPal Details:",
//       paypalDetails,
//     );

//     const orderDetails = items.map((item) => {
//       const match = item.id.match(/^(.+)-license-(.+)$/);
//       if (!match) throw new Error(`Invalid item ID format: ${item.id}`);
//       return { songId: match[1], licenseId: match[2] };
//     });

//     const apiOrderPayload = {
//       orderDetails,
//       paymentMethod: "PAYPAL",
//       transactionId: paypalDetails.id, // Use the transaction ID from PayPal
//       metadata: {
//         gateway: "paypal",
//         currency: paypalDetails.purchase_units[0].amount.currency_code,
//         totalAmount: paypalDetails.purchase_units[0].amount.value,
//         customerEmail: userEmail,
//         payerId: paypalDetails.payer.payer_id,
//         createdAt: paypalDetails.create_time,
//       },
//     };

//     try {
//       // আপনার ব্যাকএন্ডে অর্ডার পাঠানোর কোড
//       // await axios.post("/payments/orders", apiOrderPayload);
//       console.log("Order payload sent to backend:", apiOrderPayload);
//       alert(
//         `🎉 Order placed successfully!\nTransaction ID: ${paypalDetails.id}`,
//       );
//       dispatch(clearCart());
//     } catch (error) {
//       console.error("❌ Failed to place order after payment:", error);
//       alert(
//         "Payment successful, but order confirmation failed. Please contact support.",
//       );
//     }
//   };

//   const handleRemoveItem = (itemId) => {
//     dispatch(removeItem(itemId));
//   };

//   const handleClearCart = () => {
//     if (items.length > 0) {
//       dispatch(clearCart());
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white">
//         <p className="text-xl font-semibold">Your cart is empty</p>
//       </div>
//     );
//   }

//   return (
//     <section
//       className="flex min-h-screen items-center justify-center bg-neutral-900 py-6 lg:py-20"
//       style={{
//         background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
//       }}
//     >
//       <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 rounded-2xl p-4 text-white backdrop-blur-sm lg:flex-row lg:p-8">
//         {/* Left Section: Shopping Cart */}
//         <div className="flex flex-1 flex-col gap-6">
//           <button
//             onClick={() => window.history.back()}
//             className="flex w-fit items-center gap-2 text-lg font-semibold text-white hover:text-yellow-200"
//           >
//             <IoIosArrowBack className="h-5 w-5" />
//             <span className="hover:underline">Continue Shopping</span>
//           </button>
//           <hr className="border-t border-stone-300 opacity-30" />
//           <div>
//             <h2 className="text-lg font-medium text-gray-300">Shopping Cart</h2>
//             <p className="text-sm text-gray-300">
//               You have <strong>{totalQuantity}</strong> item(s) in your cart
//             </p>
//           </div>
//           <div className="flex flex-col gap-6">
//             {items.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center gap-4 rounded-2xl bg-white p-4 pr-6 shadow-md"
//               >
//                 <img
//                   className="h-20 w-20 rounded-lg border border-gray-300 object-cover"
//                   src={item.songThumbnail}
//                   alt={item.songTitle}
//                 />
//                 <div className="flex flex-1 flex-col gap-1">
//                   <div className="text-lg font-semibold text-[#3B3B3B] capitalize">
//                     {item.songTitle}
//                   </div>
//                   <div className="text-base font-normal text-neutral-700 capitalize">
//                     {item.planTier}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="text-right text-sm font-medium text-[#393939]">
//                     ${item.price.toFixed(2)}
//                   </div>
//                   <button
//                     onClick={() => handleRemoveItem(item.id)}
//                     className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50"
//                   >
//                     <FaTrashAlt className="text-xl text-gray-500 hover:text-red-500" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//             <div className="mt-4 text-right">
//               <button
//                 onClick={handleClearCart}
//                 className="text-red-400 hover:underline"
//               >
//                 Remove all items
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Section: Order Summary & Checkout */}
//         <div className="flex w-full flex-col gap-6 rounded-2xl bg-white/20 p-6 backdrop-blur-md lg:w-96">
//           <h2 className="text-2xl font-semibold text-gray-300">
//             Order Summary
//           </h2>
//           <hr className="border-t border-indigo-500 opacity-30" />
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-white">Subtotal</span>
//               <span className="text-white">${subtotal.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* --- Using the new PayPal button component --- */}
//           <div className="mt-4">
//             <PayPalCheckoutButton
//               currency="USD"
//               amount={total}
//               onSuccess={handleSuccessfulPayment}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CheckoutView;

import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaArrowRight } from "react-icons/fa";
import { clearCart, removeItem } from "../../../featured/cart/cartSlice";
import PayPalCheckoutButton from "./components/PaystackCheckoutButton";
import axios from "../../../utils/axiosInstance";

function CheckoutView() {
  const dispatch = useDispatch();

  const { items, totalQuantity } = useSelector((state) => state.cart);
  // We no longer need the user object here, as PayPal provides the email.

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 0.0;
  const total = subtotal + shipping;

  // This function will be called after a successful PayPal payment
  const handleSuccessfulPayment = async (paypalDetails) => {
    console.log(
      "✅ Handling successful payment. PayPal Details:",
      paypalDetails,
    );

    // 1. Prepare orderDetails from the cart
    const orderDetails = items.map((item) => {
      const match = item.id.match(/^(.+)-license-(.+)$/);
      if (!match) throw new Error(`Invalid item ID format: ${item.id}`);
      return { songId: match[1], licenseId: match[2] };
    });

    // 2. Create the final payload for your backend, matching your required structure
    const apiOrderPayload = {
      orderDetails,
      paymentMethod: "PAYPAL", // Changed from "CREDIT_CARD"
      transactionId: paypalDetails.id, // Use the real transaction ID from PayPal
      metadata: {
        gateway: "paypal", // Changed from "stripe"
        currency: paypalDetails.purchase_units[0].amount.currency_code,
        // You can add more metadata from paypalDetails if needed
        totalAmount: paypalDetails.purchase_units[0].amount.value,
        payerEmail: paypalDetails.payer.email_address, // Get email directly from PayPal response
        payerId: paypalDetails.payer.payer_id,
      },
    };

    try {
      // 3. Send the payload to your backend endpoint
      console.log("Sending order to backend with payload:", apiOrderPayload);
      const response = await axios.post("/payments/orders", apiOrderPayload);

      console.log("✅ Backend response:", response.data);
      alert(
        `🎉 Order placed successfully!\nTransaction ID: ${paypalDetails.id}`,
      );
      dispatch(clearCart());
    } catch (error) {
      console.error(
        "❌ Failed to send order to backend:",
        error?.response?.data || error.message,
      );
      alert(
        "Your payment was successful, but we failed to save your order. Please contact support with your transaction ID.",
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleClearCart = () => {
    if (items.length > 0) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white">
        <p className="text-xl font-semibold">Your cart is empty</p>
      </div>
    );
  }

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-neutral-900 py-6 lg:py-20"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 rounded-2xl p-4 text-white backdrop-blur-sm lg:flex-row lg:p-8">
        {/* Left Section: Shopping Cart */}
        <div className="flex flex-1 flex-col gap-6">
          <button
            onClick={() => window.history.back()}
            className="flex w-fit items-center gap-2 text-lg font-semibold text-white hover:text-yellow-200"
          >
            <IoIosArrowBack className="h-5 w-5" />
            <span className="hover:underline">Continue Shopping</span>
          </button>
          <hr className="border-t border-stone-300 opacity-30" />
          <div>
            <h2 className="text-lg font-medium text-gray-300">Shopping Cart</h2>
            <p className="text-sm text-gray-300">
              You have <strong>{totalQuantity}</strong> item(s) in your cart
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 pr-6 shadow-md"
              >
                <img
                  className="h-20 w-20 rounded-lg border border-gray-300 object-cover"
                  src={item.songThumbnail}
                  alt={item.songTitle}
                />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="text-lg font-semibold text-[#3B3B3B] capitalize">
                    {item.songTitle}
                  </div>
                  <div className="text-base font-normal text-neutral-700 capitalize">
                    {item.planTier}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm font-medium text-[#393939]">
                    ${item.price.toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50"
                  >
                    <FaTrashAlt className="text-xl text-gray-500 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 text-right">
              <button
                onClick={handleClearCart}
                className="text-red-400 hover:underline"
              >
                Remove all items
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary & Checkout */}
        <div className="flex w-full flex-col gap-6 rounded-2xl bg-white/20 p-6 backdrop-blur-md lg:w-96">
          <h2 className="text-2xl font-semibold text-gray-300">
            Order Summary
          </h2>
          <hr className="border-t border-indigo-500 opacity-30" />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4">
            <PayPalCheckoutButton
              currency="USD"
              amount={total}
              onSuccess={handleSuccessfulPayment}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutView;
