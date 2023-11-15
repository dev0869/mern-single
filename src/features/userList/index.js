import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAlluserData } from "../../pages/admin/api";

export const getallUserList = createAsyncThunk(
  "enquiry/get-alluserlist",
  async (thunkAPI) => {
    try {
      return await getAlluserData();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const userListSlice = createSlice({
  name: "userlist",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getallUserList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallUserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getallUserList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});
export default userListSlice.reducer;
