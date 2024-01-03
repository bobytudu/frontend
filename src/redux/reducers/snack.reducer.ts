import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SnackState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

const initialState: SnackState = {
  open: false,
  message: "",
  severity: "success",
};

export const snackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    openSnack: (state, payload: PayloadAction<any>) => {
      state.open = true;
      state.message = payload.payload.message;
      state.severity = payload.payload.severity;
    },
    closeSnack: (state) => {
      state.open = false;
    },
  },
});

export const { openSnack, closeSnack } = snackSlice.actions;
export default snackSlice.reducer;
