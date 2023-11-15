import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getalltestRide } from "../../pages/admin/api";

export const getalltestride = createAsyncThunk(
  "enquiry/get-enquiries",
  async (thunkAPI) => {
    try {
      return await getalltestRide();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  bookingform: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const testrideSlice = createSlice({
  name: "testrides",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getalltestride.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getalltestride.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getalltestride.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

  },
});
export default testrideSlice.reducer;
