import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  companies: [],
  pagination: {
    currentPage: 1,
    rowsPerPage: 5, // Set your default rows per page
  },
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state, action) => {
      const newCompany = {
        id: nanoid(), // Generate a unique ID
        ...action.payload,
      };
      state.companies.push(newCompany);
    },
    toggleActiveState: (state, action) => {
      const companyId = action.payload;
      const company = state.companies.find((c) => c.id === companyId);

      if (company) {
        company.active = !company.active;
      }
    },
    deleteCompany: (state, action) => {
      const companyId = action.payload;
      state.companies = state.companies.filter((c) => c.id !== companyId);
    },
    editCompany: (state, action) => {
      const { id, updatedCompany } = action.payload;
      const index = state.companies.findIndex((c) => c.id === id);

      if (index !== -1) {
        state.companies[index] = {
          ...state.companies[index],
          ...updatedCompany,
        };
      } else {
        // If the company with the provided ID doesn't exist, add a new one
        const newCompany = {
          id: nanoid(), // Generate a unique ID
          ...updatedCompany,
        };
        state.companies.push(newCompany);
      }
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },

    setRowsPerPage: (state, action) => {
      state.pagination.rowsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset current page when changing rows per page
    },
  },
});

export const {
  addCompany,
  toggleActiveState,
  deleteCompany,
  editCompany,
  setPage,
  setRowsPerPage,
} = companySlice.actions;
export default companySlice.reducer;
