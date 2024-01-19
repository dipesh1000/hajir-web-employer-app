// employeeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  employees: [],
  pagination: {
    currentPage: 1,
    rowsPerPage: 5,
  },
  employeeIdToEdit: null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmployee = {
        id: nanoid(),
        ...action.payload,
      };
      state.employees.push(newEmployee);
    },
    toggleActiveState: (state, action) => {
      const employeeId = action.payload;
      const employee = state.employees.find((e) => e.id === employeeId);

      if (employee) {
        employee.status = employee.status === "active" ? "inactive" : "active";
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
      } else {
        const newEmployee = {
          id: nanoid(),
          ...updatedEmployee,
        };
        state.employees.push(newEmployee);
      }
    },
    changePage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.pagination.rowsPerPage = action.payload;
      state.pagination.currentPage = 1;
    },
    setEmployeeIdToEdit: (state, action) => {
      state.employeeIdToEdit = action.payload;
    },
  },
});

export const {
  addEmployee,
  toggleActiveState,
  deleteEmployee,
  editEmployee,
  changePage,
  setRowsPerPage,
  setEmployeeIdToEdit,
} = employeeSlice.actions;

export default employeeSlice.reducer;
