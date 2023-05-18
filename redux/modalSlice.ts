import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletModal: false,
  bidsModal: false,
  listModal: false,
  propertiesModalValue: false,
};

export const modalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    walletModalShow: (state) => {
      state.walletModal = true;
    },
    walletModalHide: (state) => {
      state.walletModal = false;
    },
    bidsModalShow: (state) => {
      state.bidsModal = true;
    },
    bidsModalHide: (state) => {
      state.bidsModal = false;
    },
    listModalShow: (state) => {
      state.listModal = true;
    },
    listModalHide: (state) => {
      state.listModal = false;
    },
    showPropertiesModal: (state) => {
      state.propertiesModalValue = true;
    },
    closePropertiesModal: (state) => {
      state.propertiesModalValue = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  walletModalShow,
  walletModalHide,
  bidsModalShow,
  bidsModalHide,
  listModalShow,
  listModalHide,
  showPropertiesModal,
  closePropertiesModal,
} = modalSlice.actions;

export default modalSlice.reducer;
