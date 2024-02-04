// store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import rootReducer from "./rootReducer";
import { api } from "@/services/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    root: rootReducer, // assuming rootReducer is the combined reducer from rootReducer.js
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
