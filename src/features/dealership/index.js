import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getalldealershiprequest } from "../../pages/admin/api";

export const getalldealrship = createAsyncThunk(
  "dealer/get-dealer-request",
  async (thunkAPI) => {
    try {
      return await getalldealershiprequest();
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
export const dealershipSLice = createSlice({
  name: "testrides",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getalldealrship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getalldealrship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getalldealrship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

  },
});
export default dealershipSLice.reducer;
