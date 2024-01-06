// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import companyReducer from "./companySlice";
import employeeReducer from "./employeeSlice";

const rootReducer = combineReducers({
  company: companyReducer,
  employee: employeeReducer,
});

export default rootReducer;
