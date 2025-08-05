import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity += newItem.quantity;

      if (!existingItem) {
        state.items.push({ ...newItem });
      } else {
        // If already in cart, increase quantity
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.totalPrice; // or newItem.price * newItem.quantity
      }

      state.totalPrice += newItem.price * newItem.quantity;
    },

    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectIsItemInCart = (id) => (state) =>
  state.cart.items.some((item) => item.id === id);

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
