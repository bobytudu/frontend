import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
import snackReducer from './reducers/snack.reducer';
import cartReducer from './reducers/cart.reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    snack: snackReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
