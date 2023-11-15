import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { toast } from "react-toastify";

export const sendOtp = createAsyncThunk("otp/send", async (email) => {
  try {
    const res = await axios.post(`${base_url}otp/send`, {
      email,
    });
    const {success}= res.data
    if(success){
      toast.success(res.data.success)
    }else{
      toast.error(res.data.success)
    }
  } catch (error) {
    toast.error(error.message)
  }
});

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(sendOtp.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export default otpSlice.reducer;
