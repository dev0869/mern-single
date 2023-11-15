import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getallContactus } from "../../pages/admin/api";

export const getEnquiries = createAsyncThunk(
  "contact/get-contacts",
  async (thunkAPI) => {
    try {
      return await getallContactus();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  requests: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const enquirySlice = createSlice({
  name: "contactus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (typeof action.payload !=="string"){ state.requests = action.payload;}
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});
export default enquirySlice.reducer;
