import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signMessage } from "@wagmi/core";
import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;

const initialState: GetUserInfoResponse = {
  id: "",
  address: "",
  name: "",
  bio: "",
  email: "",
  bannerImage: "",
  profileImage: "",
  createdAt: "",
  updatedAt: "",
};

export const getUser = createAsyncThunk(
  "user/get",
  async (address: string, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${apiUrl}/user/info`, {
        params: { address },
      });
      return result.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue("");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (
    {
      address,
      updateUserData,
      profileImage,
      bannerImage,
    }: {
      address: string;
      updateUserData: UserUpdateData;
      profileImage: File;
      bannerImage: File;
    }
  ) => {
    try {
      const signature = await signMessage({ message: address });
      const data = new FormData();
      data.append("id", updateUserData.id);
      data.append("email", updateUserData.email ?? "");
      data.append("bio", updateUserData.bio ?? "");
      data.append("name", updateUserData.name ?? "");
      if (profileImage) {
        data.append("profileImage", profileImage);
      }
      if (bannerImage) {
        data.append("bannerImage", bannerImage);
      }
      const result = await axios.put(`${apiUrl}/user`, data, {
        params: { userAddress: address, signature },
      });
      toast.success("Successfully updated!");
      return result.data;
    } catch (error: any) {
      toast.error(
        error.name === "AxiosError"
          ? error.response.data.message
          : error.message
      );
      throw new Error(error);
    }
  }
);

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserDefault: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    });
  },
});
// Action creators are generated for each case reducer function
export const { setUserDefault } = userSlice.actions;

export default userSlice.reducer;
