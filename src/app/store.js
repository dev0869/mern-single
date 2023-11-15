import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import cartSlice from "../features/cart/cartSlice";
import dummySlice from "../features/Dummy/dummySlice";
import readSlice from "../features/curd/readSlice";
import blogeSlice from "../features/blogs/blogeSlice";
import testrideSlice from "./../features/testride/index";
import LoadingSlice from "../features/loading/loadingSlice";
import callBackSlice from "../features/callback";
import dealershipSLice from "../features/dealership";
import userListSlice from "../features/userList";
import enquirySlice from "../features/enquiry/enquirySlice";
import productSlice from "../features/Product/productSlice";
import configSlice from "../features/Website/configSlice";
import authSlice from "../features/auth/authSlice";
import otpSlice from "../features/otp/otpSlice";
import appointmentSlice from "../features/appointment/appointmentSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    opt: otpSlice,
    users: userSlice,
    blog: blogeSlice,
    readuser: readSlice,
    dummy: dummySlice,
    cart: cartSlice,
    testrides: testrideSlice,
    callback: callBackSlice,
    loading: LoadingSlice,
    dealer: dealershipSLice,
    userlist: userListSlice,
    contactus: enquirySlice,
    product: productSlice,
    site: configSlice,
    appointment: appointmentSlice,
  },
});
