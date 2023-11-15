import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";
import { toast } from "react-toastify";
const initialState = {
  data: [],
  schedule: null,
  success: true,
  error: false,
};

export const getAppointmentSchedule = createAsyncThunk(
  "getappointmentSchedule",
  async () => {
    const res = await axios.get(`${base_url}appointment/schedule`, config);
    return res.data;
  }
);

export const getAllAppointments = createAsyncThunk(
  "getappointmentsAdmin",
  async () => {
    const res = await axios.get(`${base_url}appointment`, config);
    return res.data;
  }
);

export const updateAppointment = createAsyncThunk(
  "updateAppointments",
  async (payload, thunkApi) => {
    try {
      const res = await axios.put(
        `${base_url}appointment/${payload.id}`,
        payload.data,
        config
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const postAppointment = createAsyncThunk(
  "postappointment",
  async (payload, thunkApi) => {
    try {
      const res = await axios.post(`${base_url}appointment`, payload, config);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const createAppointmentSchedule = createAsyncThunk(
  "createAppointmentSchedule",
  async (payload, thunkApi) => {
    try {
      const res = await axios.post(
        `${base_url}appointment/schedule`,
        payload,
        config
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointmentSchedule.fulfilled, (state, action) => {
        state.success = true;
        state.schedule = action.payload;
      })
      .addCase(postAppointment.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(postAppointment.rejected, (state, action) => {
        state.error = true;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.success = true;
        state.data = action.payload;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.error = true;
      })
      .addCase(createAppointmentSchedule.fulfilled, (state) => {
        state.success = true;
        toast.success("AppointSchedule is Created Sucessfully");
      })
      .addCase(createAppointmentSchedule.rejected, (state, action) => {
        toast.error(action.payload.message);
      });
  },
});

export default appointmentSlice.reducer;
