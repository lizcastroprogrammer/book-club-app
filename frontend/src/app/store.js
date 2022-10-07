import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bankAccountReducer from "../features/bankAccounts/bankAccountSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bankAccounts: bankAccountReducer,
    users: userReducer,
  },
});
