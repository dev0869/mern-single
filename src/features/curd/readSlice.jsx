import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
};
export const readSlice = createSlice({
  name: "read",
  initialState,
  reducers: {
    readUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { readUser } = readSlice.actions;
export default readSlice.reducer;
