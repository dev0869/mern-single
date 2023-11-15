import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bookingtestride: {},
};

export const dummySlice = createSlice({
  name: "dummy",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookingtestride = action.payload;
    },
  },
});

export const { addBooking } = dummySlice.actions;
export default dummySlice.reducer;
