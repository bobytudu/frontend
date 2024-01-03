import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import snackReducer from "./reducers/snack.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snack: snackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
