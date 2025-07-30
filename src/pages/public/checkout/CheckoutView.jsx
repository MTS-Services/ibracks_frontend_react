import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaArrowRight } from "react-icons/fa";
import { clearCart, removeItem } from "../../../featured/cart/cartSlice";

import axios from "../../../utils/axiosInstance";

function CheckoutView() {
  const dispatch = useDispatch();

  // Get cart state from Redux
  const { items, totalQuantity } = useSelector((state) => state.cart);

  // Local state for form inputs (can later connect to backend)
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Calculate dynamic values
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = items.length > 0 ? 0.0 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty. Add some licenses first.");
      return;
    }

    if (!cardName || !cardNumber || !expiry || !cvv) {
      alert("Please fill in all card details.");
      return;
    }

    // ✅ Extract songId and licenseId (supports alphanumeric or UUID)
    const orderDetails = items.map((item) => {
      const match = item.id.match(/^(.+)-license-(.+)$/);
      if (!match) {
        throw new Error(`Invalid item ID format: ${item.id}`);
      }
      const songId = match[1];
      const licenseId = match[2];
      return { songId, licenseId };
    });

    // 🧾 Generate a fake transaction ID for demo/testing
    const transactionId = `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // 📨 Final payload to send to backend
    const apiOrderPayload = {
      orderDetails,
      paymentMethod: "CREDIT_CARD",
      transactionId,
      metadata: {
        gateway: "stripe", // mock or real gateway
        currency: "USD",
        cardLast4: cardNumber.slice(-4),
        cardExpiry: expiry,
        cardholderName: cardName,
        totalAmount: total,
        createdAt: new Date().toISOString(),
      },
    };

    try {
      const response = await axios.post("/payments/orders", apiOrderPayload);
      console.log("✅ Order submitted:", response.data);
      alert(`🎉 Order placed successfully!\nTotal: $${total.toFixed(2)}`);
      dispatch(clearCart());
    } catch (error) {
      console.error(
        "❌ Failed to place order:",
        error?.response?.data || error.message,
      );
      alert("Something went wrong while placing the order.");
    }
  };

  // Handlers
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
    alert(`Removed item from cart`);
  };

  const handleClearCart = () => {
    if (items.length > 0) {
      dispatch(clearCart());
      alert("Cart cleared");
    }
  };

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl bg-green-800/10 p-8 text-center text-white shadow-inner">
        <p className="text-xl font-semibold">Your cart is empty</p>
        <p className="mt-2 text-gray-300">
          Looks like you haven't added any licenses yet.
        </p>
        <button
          onClick={handleClearCart}
          className="mt-4 hidden rounded bg-gray-100 px-6 py-2 text-sm text-white opacity-0"
        >
          Clear Cart
        </button>
      </div>
    );
  }

  return (
    <section
      className="flex items-center justify-center bg-neutral-900 py-6 lg:py-20"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 rounded-2xl p-0 text-white backdrop-blur-sm md:p-0 lg:flex-row">
        {/* Left Section: Shopping Cart */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Back Link */}
          <button
            onClick={() => window.history.back()}
            className="flex w-55 items-center gap-2 text-lg font-semibold text-white hover:text-yellow-200"
            aria-label="Go back to shopping"
          >
            <IoIosArrowBack className="h-5 w-5" />
            <span className="hover:underline">Continue Shopping</span>
          </button>

          <hr className="border-t border-stone-300 opacity-30" />

          {/* Cart Title */}
          <div>
            <h2 className="text-lg font-medium text-gray-300">Shopping Cart</h2>
            <p className="text-sm text-gray-300">
              You have <strong>{totalQuantity}</strong> item(s) in your cart
            </p>
          </div>

          {/* Cart Items */}
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
                  {/* Price */}
                  <div className="text-right text-sm font-medium text-[#393939]">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50"
                    aria-label={`Remove ${item.songTitle} from cart`}
                  >
                    <FaTrashAlt className="text-xl text-gray-500 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
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

        {/* Right Section: Card Details */}
        <div className="flex w-full flex-col gap-6 rounded-2xl bg-white/20 p-6 backdrop-blur-md lg:w-96">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-300">
              Card Details
            </h2>
            <img
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white/50"
              src="/shoppingcart/cart1.jpg"
              alt="User avatar"
            />
          </div>

          {/* Card Type */}
          <div className="flex flex-col gap-3">
            <label className="text-base font-medium text-white">
              Card Type
            </label>
            <div className="flex gap-3">
              {["Mastercard", "Visa", "PayPal"].map((type, i) => (
                <div
                  key={type}
                  className="flex h-14 w-20 items-center justify-center rounded bg-white/20 p-1"
                >
                  <img
                    src={`/shoppingcart/cart${2 + i}.png`}
                    alt={type}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
              <div className="flex h-14 w-20 items-center justify-center rounded bg-zinc-300/30">
                <span className="text-xs font-bold text-white">See all</span>
              </div>
            </div>
          </div>

          {/* Name on Card */}
          <label
            htmlFor="nameOnCard"
            className="text-sm font-medium text-white"
          >
            Name on Card
          </label>
          <input
            type="text"
            id="nameOnCard"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            className="h-10 w-full rounded-lg bg-white px-3 text-sm text-gray-800 ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* Card Number */}
          <label
            htmlFor="cardNumber"
            className="text-sm font-medium text-white"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1111 2222 3333 4444"
            className="h-10 w-full rounded-lg bg-white px-3 text-sm text-gray-800 ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* Expiry & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expirationDate"
                className="text-sm font-medium text-white"
              >
                Expiration Date
              </label>
              <input
                type="text"
                id="expirationDate"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="h-10 w-full rounded-lg bg-white px-3 text-sm text-gray-800 ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="text-sm font-medium text-white">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className="h-10 w-full rounded-lg bg-white px-3 text-sm text-gray-800 ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <hr className="border-t border-indigo-500 opacity-30" />

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="mt-4 flex items-center justify-between rounded-xl bg-yellow-600 px-6 py-4 font-semibold text-white transition-colors hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400"
          >
            <span>${total.toFixed(2)}</span>
            <span>Checkout</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CheckoutView;
