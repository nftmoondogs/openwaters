import { createSlice } from "@reduxjs/toolkit";

enum TokenType {
  ERC721 = "erc721",
  ERC1155 = "erc1155",
}

const initialState: Collection = {
  id: "",
  address: "",
  creator: {
    id: "",
    address: "",
    email: "",
    name: "",
    bio: "",
    profileImage: "",
    bannerImage: "",
    createdAt: "",
    updatedAt: "",
  },
  type: TokenType.ERC721,
  name: "",
  symbol: "",
  bio: "",
  profileImage: "",
  bannerImage: "",
  discord: "",
  website: "",
  twitter: "",
  volume: 0,
  totalSupply: 0,
  royalty: 0,
  verified: false,
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState: initialState,
  reducers: {
    setCollectionInfo: (state, action) => {
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
export const { setCollectionInfo } = collectionSlice.actions;

export default collectionSlice.reducer;
