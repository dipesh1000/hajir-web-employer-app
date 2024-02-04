// companySlice.js
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { addEmployee } from './employeeSlice';
import { postRequest } from '@/services/ApiRequestService';

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    createdCompany: null,
  },
  reducers: {
    setCreatedCompany: (state, action) => {
      state.createdCompany = action.payload;
    },
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
