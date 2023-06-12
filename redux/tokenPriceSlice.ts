import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  woofPrice: 0,
};

export const tokenPriceSlice = createSlice({
  name: "tokenPrice",
  initialState: initialState,
  reducers: {
    setTokenPrice: (state, action) => {
      if (action.payload) {
        state = { ...state, ...action.payload };
      } else {
        state = { ...initialState };
      }
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTokenPrice } = tokenPriceSlice.actions;

export default tokenPriceSlice.reducer;
