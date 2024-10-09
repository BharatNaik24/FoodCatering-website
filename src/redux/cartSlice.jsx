import { createSlice } from "@reduxjs/toolkit";

// Initialize cart from localStorage or default to an empty array
const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

// Helper function to save cart state to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the item exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
      saveCartToLocalStorage(state); // Persist the updated cart
    },
    deleteFromCart(state, action) {
      const updatedCart = state.filter((item) => item.id !== action.payload.id);
      saveCartToLocalStorage(updatedCart); // Persist the updated cart
      return updatedCart;
    },
    clearCart(state) {
      saveCartToLocalStorage([]); // Clear localStorage
      return []; // Reset state
    },
    incrementItem(state, action) {
      const updatedCart = state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 }; // Only increment the specific item
        }
        return item; // Return other items unchanged
      });
      saveCartToLocalStorage(updatedCart); // Persist the updated cart
      return updatedCart;
    },
    decrementItem(state, action) {
      const updatedCart = state.map((item) => {
        if (item.id === action.payload.id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }; // Only decrement if quantity > 1
        }
        return item; // Return other items unchanged
      });
      saveCartToLocalStorage(updatedCart); // Persist the updated cart
      return updatedCart;
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  clearCart,
  incrementItem,
  decrementItem,
} = cartSlice.actions;

export default cartSlice.reducer;
