import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./autApi";
import { toast } from "react-toastify";
import { getAlluserData } from "../../pages/admin/api";
const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  address: {},
  totalUser: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  token: "",
  role: "",
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("user");
    // window.location.reload();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const registration = createAsyncThunk(
  "user/registration",
  async (user, thunkAPI) => {
    try {
      return await authService.registration(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// address
export const address = createAsyncThunk(
  "user/address",
  async (user, thunkAPI) => {
    try {
      return await authService.address(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getOrder = createAsyncThunk(
  "order/get-order",
  async (thunkAPI) => {
    try {
      return await authService.getOrder();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forget_password_reset = createAsyncThunk(
  "user/forget_password_reset",
  async (data, thunkAPI) => {
    try {
      return authService.forget_password_reset(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const reset_password = createAsyncThunk(
  "user/password_reset",
  async (data, thunkAPI) => {
    try {
      return authService.reset_password(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "user/getallUserby-admin",
  async (id, status, thunkAPI) => {
    try {
      return getAlluserData();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const resetState = createAction("Reset_all");
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
        toast.info(action.payload.message);
        state.role = action?.payload?.role;
      })
      .addCase(login.rejected, (state) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = "Rejected";
        state.isLoading = false;
        toast.error("Please Confirm your Email And Password");
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Address
      .addCase(address.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(address.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(address.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(forget_password_reset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forget_password_reset.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        toast.info("Link Sent Your Email to reset password");
        state.token = action.payload;
        state.message = "success";
      })
      .addCase(forget_password_reset.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        toast.error("User Not find with this Email !");
      })
      .addCase(reset_password.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reset_password.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
        state.message = "success";
        toast.info("Your password reset successfully !");
      })
      .addCase(reset_password.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;

        state.adminOrders = action.payload;
        state.message = "success";
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Logout Successfully");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        toast.info("Server Error");
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        toast.info("taking time to load please wait...");
      })
      .addCase(getAllUsers.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
        toast.info("Server Error");
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
