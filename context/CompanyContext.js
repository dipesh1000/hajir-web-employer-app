import { createContext, useContext, useReducer } from "react";

// Define the initial state
const initialState = {
  companies: [
    { id: 1, name: "Company A", members: 50, status: "Active" },
    { id: 2, name: "Company B", members: 30, status: "Inactive" },
    // Add more companies as needed
  ],
};

// Create a context
const CompanyContext = createContext();

// Create a context provider component
export const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  return (
    <CompanyContext.Provider value={{ state, dispatch }}>
      {children}
    </CompanyContext.Provider>
  );
};

// Custom hook for consuming the context
export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};

// Define a reducer for handling actions
const companyReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_COMPANY":
      // Implement your delete logic
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company.id !== action.payload
        ),
      };

    case "INACTIVATE_COMPANY":
      // Implement your inactivate/activate logic
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload
            ? {
                ...company,
                status: company.status === "Active" ? "Inactive" : "Active",
              }
            : company
        ),
      };

    // Add more cases for other actions as needed

    default:
      return state;
  }
};
