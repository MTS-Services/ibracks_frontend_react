import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  clearCart,
  addItem,
} from "../../../featured/cart/cartSlice";

const CartTestView = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );

  // Handle removing one quantity of an item
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  // Handle adding more of an item
  const handleAddMore = (item) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
      }),
    );
  };

  if (items.length === 0) {
    return (
      <div>
        <h2>Shopping Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Shopping Cart ({totalQuantity} items)</h2>
      <p>Total: ${totalPrice.toFixed(2)}</p>

      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>

      <div className="cart-items">
        {items.map((item) => (
          <div
            key={item.id}
            className="cart-item"
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${item.totalPrice.toFixed(2)}</p>

            <div>
              <button onClick={() => handleAddMore(item)}>+</button>
              <button onClick={() => handleRemoveItem(item.id)}>-</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartTestView;
