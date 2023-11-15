import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data: [],
    bookingData:[]
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state,action) => {
            state.data.push(action.payload)
        } ,
        bookUser: (state, action) => {
            state.bookingData.push(action.payload)
        }
    }
})

export const { addUser,bookUser } = userSlice.actions
export default userSlice.reducer
