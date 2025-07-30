import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineShoppingBag, HiTrash, HiX } from "react-icons/hi";
import { removeItem, clearCart } from "../../featured/cart/cartSlice";
import { Link } from "react-router-dom";

const CartDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );
  console.log(items);
  console.log(totalPrice);
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
    alert("removed id " + itemId);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    alert("removed all ");
    onClose();
  };

  const handleCheckout = () => {
    // Add your checkout logic here
    console.log("Proceeding to checkout");
    onClose();
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
      {/* Dropdown Header */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
        <p className="font-semibold text-gray-900">
          your cart ({totalQuantity})
        </p>
        <button
          onClick={onClose}
          className="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Close cart"
        >
          <HiX className="text-lg" />
        </button>
      </div>

      {/* Dropdown Body */}
      <div className="max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-8 text-center">
            <HiOutlineShoppingBag className="mx-auto mb-3 text-3xl text-gray-300" />
            <p className="text-sm text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-2 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.songThumbnail}
                      alt=""
                      className="w-12 rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-medium text-gray-900">
                        {item.songTitle} ({item.planTier} licens)
                      </h4>

                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">
                          ${item.totalPrice}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="rounded-full p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <HiTrash className="text-md" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Dropdown Footer */}
            <div className="border-t bg-gray-50 px-4 py-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-orange-600">
                  ${totalPrice}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleClearCart}
                  className="flex-1 rounded-lg border border-red-300 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Clear
                </button>
                <Link
                  to="/check-out"
                  onClick={handleCheckout}
                  className="flex-1 rounded-lg bg-gradient-to-r from-orange-300 to-yellow-500 px-3 py-2 text-center text-xs font-medium text-white transition-colors hover:from-orange-600 hover:to-yellow-600"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
