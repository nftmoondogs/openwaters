import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  collection: {
    royalty: 0,
    address: "",
    creator: {
      address: "",
      name: "",
    },
  },
  tokenId: "",
  owner: {
    name: "",
    address: "",
  },
  metadataUrl: "",
  metaData: "",
  price: "",
  currency: "",
  isListed: false,
};

export const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    setNft: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    setInitial: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setNft, setInitial } = nftSlice.actions;

export default nftSlice.reducer;
