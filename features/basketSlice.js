import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const id = action.payload.id;
      const object = state.items.find((obj) => obj.item.id === id);
      if (object) {
        state.items = [
          ...state.items.filter((obj) => obj.item.id !== id),
          { item: { ...object.item }, quantity: object.quantity + 1 },
        ];
      } else {
        state.items = [
          ...state.items,
          { item: { ...action.payload }, quantity: 1 },
        ];
      }
    },
    removeFromBasket: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((obj) => obj.item.id === id);
      if (index !== -1) {
        const object = state.items[index];
        if (object.quantity > 1) {
          state.items.splice();
          state.items = [
            ...state.items.slice(0, index),
            { item: { ...object.item }, quantity: object.quantity - 1 },
            ...state.items.slice(index + 1),
          ];
        } else {
          state.items = [
            ...state.items.filter((item) => item.item.id !== object.item.id),
          ];
        }
      } else {
        console.warn("Cant remove product as its not in your basket");
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemWithId = (state, id) =>
  state.basket.items.find((item) => item.item.id === id);
const selectTotal = (state) => {
  return state.basket.items;
};
export const selectBasketTotal = createSelector([selectTotal], (items) =>
  items.reduce(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.totalPrice += item.item.price * item.quantity;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 }
  )
);
export default basketSlice.reducer;
