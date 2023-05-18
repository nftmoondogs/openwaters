import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mblMenu: false,
  dropdown: false,
  collection_activity_item_data: [],
  trendingCategoryItemData: [],
  sortedTrendingCategoryItemData: [],
  collectionData: [],
  sortedCollectionData: [],
  rankingData: [],
  filteredRankingData: [],
  trendingCategorySorText: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    openMblMenu: (state) => {
      state.mblMenu = true;
    },
    closeMblMenu: (state) => {
      state.mblMenu = false;
    },

    openDropdown: (state) => {
      state.dropdown = true;
    },
    closeDropdown: (state) => {
      state.dropdown = false;
    },
    handle_collection_activity_item_data: (state, action) => {
      state.collection_activity_item_data = action.payload;
    },
    updateTrendingCategoryItemData: (state, action) => {
      state.trendingCategoryItemData = action.payload;
      state.sortedTrendingCategoryItemData = action.payload;
    },
    updateTrendingCategorySortText: (state, action) => {
      const sortText = action.payload;
      if (sortText === "Price: Low to High") {
        state.sortedTrendingCategoryItemData =
          state.trendingCategoryItemData.sort(
            (a: any, b: any) => a.sortPrice - b.sortPrice
          );
      } else if (sortText === "Price: high to low") {
        state.sortedTrendingCategoryItemData =
          state.trendingCategoryItemData.sort(
            (a: any, b: any) => b.sortPrice - a.sortPrice
          );
      } else if (sortText === "Recently Added") {
        state.sortedTrendingCategoryItemData =
          state.trendingCategoryItemData.sort(
            (a: any, b: any) => a.addDate - b.addDate
          );
      } else if (sortText === "Auction Ending Soon") {
        state.sortedTrendingCategoryItemData =
          state.trendingCategoryItemData.sort(
            (a: any, b: any) => b.addDate - a.addDate
          );
      } else {
        state.sortedTrendingCategoryItemData = state.trendingCategoryItemData;
      }
    },
    updateTrendingCategoryItemByInput: (state, action) => {
      const text = action.payload;
      if (text === "Verified Only") {
        state.sortedTrendingCategoryItemData =
          state.trendingCategoryItemData.filter((item: any) => {
            return item.verified;
          });
      } else if (text === "NFSW Only") {
        state.sortedTrendingCategoryItemData =
          state.trendingCategoryItemData.filter((item: any) => {
            return item.nfsw;
          });
      } else if (text === "Show Lazy Minted") {
        state.sortedTrendingCategoryItemData =
          state.trendingCategoryItemData.filter((item: any) => {
            return item.lazyMinted;
          });
      } else {
        state.sortedTrendingCategoryItemData = state.trendingCategoryItemData;
      }
    },
    collectCollectionData: (state, action) => {
      const data = action.payload;
      state.collectionData = data;
      state.sortedCollectionData = data;
    },
    updateCollectionData: (state, action) => {
      const text = action.payload;
      if (text === "trending") {
        const tampItem = state.collectionData.filter(
          (item: any) => item.trending
        );
        state.sortedCollectionData = tampItem;
      }
      if (text === "top") {
        const tampItem = state.collectionData.filter((item: any) => item.top);
        state.sortedCollectionData = tampItem;
      }
      if (text === "recent") {
        const tampItem = state.collectionData.filter(
          (item: any) => item.recent
        );
        state.sortedCollectionData = tampItem;
      }
      // state.sortedCollectionData = state.collectionData;
    },
    collectRankingData: (state, action) => {
      state.rankingData = action.payload;
      state.filteredRankingData = action.payload;
    },
    updateRankingData: (state, action) => {
      const text = action.payload;
      let tempItem = state.rankingData.filter(
        (item: any) => item.category === text
      );
      if (text === "All") {
        tempItem = state.rankingData;
      }
      state.filteredRankingData = tempItem;
    },
    updateRankingDataByBlockchain: (state, action) => {
      const text = action.payload;
      let tempItem = state.rankingData.filter(
        (item: any) => item.blockchain === text
      );
      if (text === "All") {
        tempItem = state.rankingData;
      }
      state.filteredRankingData = tempItem;
    },
    updateRankingDataByPostdate: (state, action) => {
      const text = action.payload;
      let tempItem = state.rankingData.filter(
        (item: any) => item.postDate === text
      );
      if (text === "All Time" || text === "Last Year") {
        tempItem = state.rankingData;
      }
      state.filteredRankingData = tempItem;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openMblMenu,
  closeMblMenu,
  openDropdown,
  closeDropdown,
  updateTrendingCategorySortText,
  updateTrendingCategoryItemData,
  updateTrendingCategoryItemByInput,
  collectCollectionData,
  updateCollectionData,
  collectRankingData,
  updateRankingData,
  updateRankingDataByBlockchain,
  updateRankingDataByPostdate,
} = counterSlice.actions;

export default counterSlice.reducer;
