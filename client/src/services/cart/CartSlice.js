import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : "";

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

const initialState = {
  cartItems: cartItemsFromStorage,
  loading: true,
  error: null,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
    setItemsPrice: (state, action) => {
      state.itemsPrice= action.payload;
    },
    setShippingPrice: (state, action) => {
      state.shippingPrice= action.payload;
    },
    setTaxPrice: (state, action) => {
      state.taxPrice= action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice= action.payload;
    },
  },
});

export const { addCartItems, removeItem, setShippingAddress,setItemsPrice,setPaymentMethod,setShippingPrice,setTaxPrice,setTotalPrice } =
  CartSlice.actions;

export default CartSlice.reducer;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  console.log("data", data);
  dispatch(
    addCartItems({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      qty: qty,
      countInStock: data.countInStock,
    })
  );
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (id) => async (dispatch, getState) => {
  dispatch(removeItem(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
