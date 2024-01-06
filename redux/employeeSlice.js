// employeeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [], // Make sure it's employees instead of companies
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
