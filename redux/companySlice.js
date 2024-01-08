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
      }
    },
  },
});

export const { addCompany, toggleActiveState, deleteCompany, editCompany } =
  companySlice.actions;
export default companySlice.reducer;
