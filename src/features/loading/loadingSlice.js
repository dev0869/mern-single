import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  show: false,  
};
export const LoadingSlice = createSlice({
  name: "Loading",
  initialState,
  reducers: {
    toggleLoading:(state,action)=>{
        state.show=action.payload
    },
  }
});
export const { toggleLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
