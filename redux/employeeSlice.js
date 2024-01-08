import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    toggleActiveState: (state, action) => {
      const employeeId = action.payload;
      const employee = state.employees.find((e) => e.id === employeeId);

      if (employee) {
        employee.active = !employee.active;
      }
    },
    deleteEmployee: (state, action) => {
      const employeeId = action.payload;
      state.employees = state.employees.filter((e) => e.id !== employeeId);
    },
    editEmployee: (state, action) => {
      const { id, updatedEmployee } = action.payload;
      const index = state.employees.findIndex((e) => e.id === id);

      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...updatedEmployee,
        };
      }
    },
  },
});

export const { addEmployee, toggleActiveState, deleteEmployee, editEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
