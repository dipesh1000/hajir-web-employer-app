// companySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
  },
});

export const { addCompany } = companySlice.actions;
export default companySlice.reducer;
