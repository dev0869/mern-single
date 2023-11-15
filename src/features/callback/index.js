import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getallcallback } from "../../pages/admin/api";

export const getallcalls = createAsyncThunk(
  "callback/get-callbacks",
  async (thunkAPI) => {
    try {
      return await getallcallback();
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
export const callBackSlice = createSlice({
  name: "callback",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getallcalls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallcalls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getallcalls.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

  },
});
export default callBackSlice.reducer;
