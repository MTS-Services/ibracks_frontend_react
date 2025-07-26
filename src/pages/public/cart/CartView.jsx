// src/pages/CartView.jsx
import { useState, useContext } from "react"; // useContext import করুন
import { FaTrashAlt, FaEllipsisV, FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import PurchaseSuccessModal from "../../../components/PurchaseSuccessModal"; // আপনার মডাল কম্পোনেন্টের সঠিক পাথ নিশ্চিত করুন
import { Link } from "react-router-dom"; // Link কম্পোনেন্ট import করুন "Shopping Continue" এর জন্য
import { CartContext } from "../../../utils/CartContextDefinition";

function CartView() {
  // CartContext থেকে প্রয়োজনীয় ডেটা এবং ফাংশনগুলো নিন
  const { cartItems, removeFromCart, subtotal, shipping, tax, total } =
    useContext(CartContext);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckout = () => {
    // এখানে আপনার আসল পেমেন্ট প্রসেসিং লজিক আসবে (যেমন, একটি পেমেন্ট গেটওয়ে API কল)।
    // সফল হলে setShowSuccessModal(true) কল করবেন।
    console.log("Proceeding to checkout with items:", cartItems);
    // For demonstration, simply show the modal:
    setShowSuccessModal(true);
    // Note: In a real application, you might clear the cart only AFTER the payment is confirmed by the backend.
    // If you add a clearCart function to your context, you could call it here:
    // clearCart();
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div>
      <div
        className={`m-auto flex min-h-screen items-center justify-center bg-neutral-900 px-2 py-10 sm:px-6 lg:px-8`}
        style={{
          background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
        }}
      >
        <div className="flex w-full max-w-6xl flex-col gap-8 rounded-2xl p-6 md:p-10 lg:flex-row">
          {/* Left Section: Shopping Cart */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Shopping Continue Button - Link ব্যবহার করা হয়েছে */}
            <Link to="/tracks" className="flex items-center gap-2">
              <IoIosArrowBack className="h-6 w-6 cursor-pointer font-[600] text-white" />{" "}
              <span className="font-['Poppins'] text-lg font-[600] text-white">
                Shopping Continue
              </span>
            </Link>

            <hr className="border-t border-stone-300 opacity-50" />

            {/* Shopping cart title */}
            <div>
              <h2 className="mt-2 font-['Poppins'] text-lg font-[500] text-white">
                Shopping cart
              </h2>
              <p className="font-['Nunito'] text-sm font-[500] text-white">
                You have {cartItems.length} item
                {cartItems.length !== 1 ? "s" : ""} in your cart
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {cartItems.length === 0 ? (
                // যদি কার্ট খালি থাকে
                <p className="text-center text-lg text-white">
                  Your cart is empty.
                </p>
              ) : (
                // কার্ট আইটেমগুলো ম্যাপ করে দেখানো
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 pr-6 shadow-md"
                  >
                    <img
                      className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20"
                      src={item.thumbnail || "/shoppingcart/default.jpg"} // ট্র্যাক ডেটা থেকে thumbnail ব্যবহার করুন
                      alt={item.title} // alt text item.title ব্যবহার করবে
                    />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="font-['Poppins'] text-base font-[600] text-[#3B3B3B] capitalize sm:text-lg">
                        {item.title} {/* ট্র্যাকের title ব্যবহার করুন */}
                      </div>
                      <div className="font-['Poppins'] text-sm font-[400] text-neutral-700 capitalize sm:text-base">
                        {/* Assuming genre is the first tag, or handle it as per your data */}
                        {item.tags && item.tags.length > 0
                          ? item.tags[0]
                          : "N/A"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      {/* প্রতিটি আইটেমের মূল্য (quantity সহ) */}
                      <div className="text-right font-['Poppins'] text-xs font-[500] text-[#393939] sm:text-sm">
                        ${(item.price * item.quantity).toFixed(2)}{" "}
                      </div>
                      <FaEllipsisV className="cursor-pointer text-sm text-[#393939] sm:text-base" />
                      {/* ট্র্যাশ আইকন ক্লিক করলে আইটেমটি সরিয়ে দেবে */}
                      <FaTrashAlt
                        className="cursor-pointer text-lg text-gray-500 sm:text-xl"
                        onClick={() => removeFromCart(item.id)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Section: Card Details */}
          <div className="flex w-full flex-col gap-4 rounded-[20px] bg-white/30 p-4 lg:w-96">
            <div className="flex items-center justify-between">
              <h2 className="font-['Poppins'] text-[22px] font-[600] text-white">
                Card Details
              </h2>
              <img
                className="h-12 w-12 rounded-lg object-cover"
                src="/shoppingcart/cart1.jpg"
                alt="User Avatar"
              />
            </div>

            {/* Card Type section (unchanged) */}
            <div className="flex flex-col gap-2">
              <span className="font-['Nunito'] text-base font-[500] text-white">
                Card type
              </span>
              <div className="flex gap-4">
                <img
                  className="h-[55px] w-[75px] rounded-[5px] object-contain"
                  style={{ background: "rgba(217, 217, 217, 0.2)" }}
                  src="/shoppingcart/cart2.png"
                  alt="Mastercard"
                />
                <img
                  className="h-[55px] w-[75px] rounded-[5px] object-contain"
                  style={{ background: "rgba(217, 217, 217, 0.2)" }}
                  src="/shoppingcart/cart3.png"
                  alt="Mastercard"
                />
                <img
                  className="h-[55px] w-[75px] rounded-[5px] object-contain"
                  style={{ background: "rgba(217, 217, 217, 0.2)" }}
                  src="/shoppingcart/cart4.png"
                  alt="Mastercard"
                />

                <div className="flex h-[55px] w-[75px] items-center justify-center rounded-[5px] bg-zinc-300/20">
                  <span className="font-['Open_Sans'] text-sm font-[700] text-white">
                    See all
                  </span>
                </div>
              </div>
            </div>

            {/* Name on card input field (unchanged) */}
            <label
              htmlFor="nameOnCard"
              className="bottom-0 mt-1 mb-0 pb-0 font-['Poppins'] text-sm font-[500] text-white"
            >
              Name on card
            </label>
            <div className="relative top-0 m-0 -mt-2 gap-0 p-0">
              <input
                type="text"
                id="nameOnCard"
                defaultValue="Name"
                className="mt-0 h-10 w-full rounded-md bg-white p-2 font-['Poppins'] text-xs font-medium text-stone-300 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            {/* Card Number ইনপুট (unchanged) */}
            <label
              htmlFor="cardNumber"
              className="bottom-0 mt-1 mb-0 pb-0 font-['Poppins'] text-sm font-[500] text-white"
            >
              Card Number
            </label>
            <div className="relative top-0 m-0 -mt-2 gap-0 p-0">
              <input
                type="text"
                id="cardNumber"
                defaultValue="1111 2222 3333 4444"
                className="h-10 w-full rounded-md bg-white p-3 font-['Poppins'] text-xs font-medium text-stone-300 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            {/* Expiration date and CVV input (unchanged) */}
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expirationDate"
                  className="bottom-0 mt-1 mb-0 pb-0 font-['Poppins'] text-sm font-[500] text-white"
                >
                  Expiration date
                </label>
                <input
                  type="text"
                  id="expirationDate"
                  defaultValue="mm/yy"
                  className="mt-1 h-10 w-full rounded-md bg-white p-3 font-['Poppins'] text-xs font-medium text-stone-300 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="bottom-0 mt-1 mb-0 pb-0 font-['Poppins'] text-sm font-[500] text-white"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  defaultValue="123"
                  className="mt-1 h-10 w-full rounded-md bg-white p-3 font-['Poppins'] text-xs font-medium text-stone-300 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                />
              </div>
            </div>

            <hr className="mt-4 border-t border-indigo-500 opacity-50" />

            {/* Subtotal, Shipping, Total - Context থেকে প্রাপ্ত মান ব্যবহার করা হয়েছে */}
            <div className="gap-2">
              <div className="flex items-center justify-between p-0 pt-1">
                <span className="font-['Poppins'] text-sm font-[500] text-white">
                  Subtotal
                </span>
                <span className="font-['Poppins'] text-sm font-[500] text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="top-0 bottom-0 flex items-center justify-between py-2">
                <span className="font-['Poppins'] text-sm font-[500] text-white">
                  Shipping
                </span>
                <span className="font-['Poppins'] text-sm font-[500] text-white">
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Poppins'] text-sm font-[500] text-white">
                  Tax
                </span>
                <span className="font-['Poppins'] text-sm font-[500] text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Poppins'] text-sm font-[500] text-white">
                  Total (Tax incl.)
                </span>
                <span className="font-['Poppins'] text-sm font-[500] text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button - onClick handler যোগ করা হয়েছে */}
            <button
              onClick={handleCheckout}
              className="mt-4 flex items-center justify-between rounded-xl bg-[#DAA520] px-6 py-4 transition-colors duration-200 hover:bg-yellow-600"
            >
              <span className="font-['Poppins'] text-base font-[500] text-white">
                ${total.toFixed(2)}
              </span>
              <span className="font-['Poppins'] text-base font-[500] text-white">
                Checkout
              </span>
              <FaArrowRight className="text-lg text-white" />
            </button>
          </div>
        </div>

        {/* Purchase Success Modal */}
        {showSuccessModal && (
          <PurchaseSuccessModal onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default CartView;
