import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/baseUrl";
import { toast } from "react-toastify";

const initialState = {
  data: {},
  loading: true,
  error: false,
};
export const getSiteConfig = createAsyncThunk(
  "getSiteConfiguration",
  async () => {
    const res = await axios.get(`${base_url}config/`, config);
    return res.data;
  }
);
export const updateSiteConfig = createAsyncThunk(
  "updateSiteConfiguration",
  async (siteCfg) => {
    const res = await axios.post(`${base_url}config`, siteCfg, config);
    toast.success(res.data.message)
    return res.data;
  }
);

export const configSlice = createSlice({
  name: "WebsiteConfiguration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSiteConfig.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getSiteConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSiteConfig.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateSiteConfig.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateSiteConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSiteConfig.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default configSlice.reducer;
