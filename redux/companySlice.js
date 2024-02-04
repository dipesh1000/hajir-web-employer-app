// companySlice.js
import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    createdCompany: null,
  },
  reducers: {
    setCreatedCompany: (state, action) => {
      state.createdCompany = action.payload;
    },
  },
});

export const { setCreatedCompany } = companySlice.actions;

export default companySlice.reducer;
