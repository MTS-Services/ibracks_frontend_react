import React, { useMemo } from "react"; // <-- useEffect, useState er poriborte useMemo
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { clearCart, removeItem } from "../../../featured/cart/cartSlice";
import axios from "../../../utils/axiosInstance";
import PayPalCheckoutButton from "./components/PaystackCheckoutButton";

function CheckoutView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const ownedSongIds = useSelector((state) => state.auth.ownedSongIds || []);

  // --- FINAL FIX: Using useMemo to prevent infinite loops ---
  const { validItems, invalidItems, total } = useMemo(() => {
    const valid = [];
    const invalid = [];
    for (const item of items) {
      const songId = item.id.split("-license-")[0];
      if (ownedSongIds.includes(songId)) {
        invalid.push(item);
      } else {
        valid.push(item);
      }
    }
    const newTotal = valid.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return { validItems: valid, invalidItems: invalid, total: newTotal };
  }, [items, ownedSongIds]);

  const handleSuccessfulPayment = async (paypalDetails) => {
    const orderDetails = validItems.map((item) => {
      const match = item.id.match(/^(.+)-license-(.+)$/);
      return { songId: match[1], licenseId: match[2] };
    });

    if (orderDetails.length === 0) {
      alert("There are no new items to purchase.");
      return;
    }

    const apiOrderPayload = {
      orderDetails,
      paymentMethod: "PAYPAL",
      transactionId: paypalDetails.id,
      metadata: {
        gateway: "paypal",
        currency: paypalDetails.purchase_units[0].amount.currency_code,
        totalAmount: paypalDetails.purchase_units[0].amount.value,
        payerEmail: paypalDetails.payer.email_address,
        payerId: paypalDetails.payer.payer_id,
      },
    };

    try {
      await axios.post("/payments/orders", apiOrderPayload);
      alert(
        `🎉 Order placed successfully! You will now be redirected to your order history.`,
      );
      dispatch(clearCart());
      // Fetch owned songs again to instantly update the library
      // dispatch(fetchOwnedSongs()); // You need to import this if you use it
      navigate("/order-history");
    } catch (error) {
      console.error("❌ Failed to send order to backend:", error);
      const errorMessage =
        error?.response?.data?.message || "An unknown error occurred.";
      alert(
        `Payment was successful, but we failed to save your order. Reason: ${errorMessage}`,
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
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
              You have <strong>{items.length}</strong> item(s) in your cart
            </p>
          </div>

          {invalidItems.length > 0 && (
            <div className="rounded-lg border border-red-500 bg-red-900/50 p-4">
              <h3 className="font-bold text-red-300">Already Purchased</h3>
              <p className="mb-2 text-sm text-red-200">
                The following items are in your library and will not be charged:
              </p>
              {invalidItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-2">
                  <img
                    src={item.songThumbnail}
                    alt={item.songTitle}
                    className="h-10 w-10 rounded-md"
                  />
                  <span className="text-sm opacity-80">{item.songTitle}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-6">
            <h3 className="text-md font-semibold text-gray-200">
              Items to Purchase
            </h3>
            {validItems.length > 0 ? (
              validItems.map((item) => (
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
              ))
            ) : (
              <div className="rounded-lg bg-neutral-800 p-6 text-center">
                <p className="text-gray-300">
                  {invalidItems.length > 0
                    ? "No new items to purchase."
                    : "Your cart is empty."}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 rounded-2xl bg-white/20 p-6 backdrop-blur-md lg:w-96">
          <h2 className="text-xl font-semibold text-gray-300">Order Summary</h2>
          <hr className="border-t border-indigo-500 opacity-30" />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Total for new items</span>
              <span className="text-white">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4">
            {total > 0 ? (
              <PayPalCheckoutButton
                currency="USD"
                amount={total}
                onSuccess={handleSuccessfulPayment}
              />
            ) : (
              <div className="rounded-lg bg-neutral-700 p-4 text-center text-gray-300">
                Please add new items to your cart to proceed.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutView;
