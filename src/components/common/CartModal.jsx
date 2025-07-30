import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiX, HiTrash } from "react-icons/hi";
import { removeItem, clearCart } from "../../featured/cart/cartSlice";

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed overflow-y-auto">
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-full max-w-md transform rounded-lg bg-white shadow-xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Shopping Cart ({totalQuantity})
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 transition-colors hover:text-gray-600"
                aria-label="Close cart"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-96 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="py-8 text-center">
                  <HiOutlineShoppingBag className="mx-auto mb-4 text-4xl text-gray-300" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          ${item.totalPrice.toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-2 rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <HiTrash className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {items.length > 0 && (
              <div className="border-t p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-orange-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleClearCart}
                    className="flex-1 rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Clear Cart
                  </button>
                  <button className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-orange-600 hover:to-yellow-600">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
