// employeeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  employees: [],
  pagination: {
    currentPage: 1,
    rowsPerPage: 5,
  },
  employeeIdToEdit: null, // Change companyIdToEdit to employeeIdToEdit
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
      state.employees.push(newEmployee); // Change newCompany to newEmployee
    },
    toggleActiveState: (state, action) => {
      const employeeId = action.payload; // Change companyId to employeeId
      const employee = state.employees.find((e) => e.id === employeeId); // Change company to employee

      if (employee) {
        employee.status = employee.status === "active" ? "inactive" : "active";
      }
    },
    deleteEmployee: (state, action) => {
      // Change deleteCompany to deleteEmployee
      const employeeId = action.payload;
      state.employees = state.employees.filter((e) => e.id !== employeeId); // Change company to employee
    },
    editEmployee: (state, action) => {
      // Change editCompany to editEmployee
      const { id, updatedEmployee } = action.payload; // Change id and updatedCompany to id and updatedEmployee
      const index = state.employees.findIndex((e) => e.id === id); // Change company to employee

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
      // Change setCompanyIdToEdit to setEmployeeIdToEdit
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
