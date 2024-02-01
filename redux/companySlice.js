// companySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { addEmployee } from './employeeSlice';
import { postRequest } from '@/services/ApiRequestService';

const initialState = {
  companies: [],
  pagination: {
    currentPage: 1,
    rowsPerPage: 5,
  },
  companyIdToEdit: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany: (state, action) => {
      const newCompany = {
        id: nanoid(),
        ...action.payload,
        employees: [], // Add an employees array
      };
      state.companies.push(newCompany);
    },
    toggleActiveState: (state, action) => {
      const companyId = action.payload;
      const company = state.companies.find((c) => c.id === companyId);

      if (company) {
        company.status = company.status === 'active' ? 'inactive' : 'active';
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
        const newCompany = {
          id: nanoid(),
          ...updatedCompany,
          employees: [],
        };
        state.companies.push(newCompany);
      }
    },
    addEmployeeToCompany: (state, action) => {
      const { companyId, employee } = action.payload;
      const company = state.companies.find((c) => c.id === companyId);

      if (company) {
        const employeeId = nanoid(); // Generate employeeId
        console.log('New employeeId:', employeeId); // Log employeeId

        const updatedEmployee = {
          id: employeeId,
          ...employee,
        };

        // Log the updated employee object
        console.log('Updated Employee:', updatedEmployee);

        // Add the employee to the company
        company.employees.push(updatedEmployee);
      }
    },
    changePage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.pagination.rowsPerPage = action.payload;
      state.pagination.currentPage = 1;
    },
    setCompanyIdToEdit: (state, action) => {
      state.companyIdToEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addEmployee, (state, action) => {
      const { companyId, employee } = action.payload;
      const company = state.companies.find((c) => c.id === companyId);

      if (company) {
        const updatedEmployee = {
          id: nanoid(),
          ...employee,
        };

        // Add the employee to the company
        company.employees.push(updatedEmployee);
      }
    });
  },
});

export const { reducer } = companySlice;

export const storeCompany = (payload) => async (dispatch) => {
  console.log(payload, 'from paylaod in line 110');
  const { data } = await postRequest('/employer/company/store/', payload);
  dispatch(slice.actions.addCompany(data.data));
};

export const {
  toggleActiveState,
  deleteCompany,
  editCompany,
  addEmployeeToCompany,
  changePage,
  setRowsPerPage,
  setCompanyIdToEdit,
} = companySlice.actions;

export default companySlice.reducer;
