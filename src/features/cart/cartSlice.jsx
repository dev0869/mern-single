import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    product: {

 }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.product=action.payload
        }
    }



})
export const { addCart } = cartSlice.actions;
export default cartSlice.reducer