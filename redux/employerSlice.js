// employerSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const employerSlice = createSlice({
  name: "employer",
  initialState: {
    companies: [],
  },
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { setCompanies } = employerSlice.actions;

export default employerSlice.reducer;
