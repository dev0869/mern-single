import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import ContactService from './ContactService'
export const createQuery = createAsyncThunk(
  "contact/post",
  async (contactData,thunkAPI) => {
    try {
      return await ContactService.postQuery(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



 


const contactState = {

contact:"",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  query: "",
pages:0
};

export const contactSlice = createSlice({
  name: "contact",
  initialState:contactState,
  reducers: {
    setQuery: (state, action) => {
       // parse the existing query string into an object
       const existingQuery = Object.fromEntries(new URLSearchParams(state.query).entries());
      
       // parse the new query string into an object
       const newQuery = Object.fromEntries(new URLSearchParams(action.payload).entries());
 
       // merge the two objects, overwriting any existing parameters with the new values
       const mergedQuery = { ...existingQuery, ...newQuery };
 
       // convert the merged query object back into a string
       const queryString = new URLSearchParams(mergedQuery).toString();
 
       // update the state with the new query string
       state.query = queryString;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contact = action.payload;

toast.success("form is submitted")


      })
      .addCase(createQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error("something went wrong")
         
            
      })
     
     

  },
});

export default contactSlice.reducer;
export const { setQuery } = contactSlice.actions;
