import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
import bankAccountReducer from "../features/bankAccounts/bankAccountSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    bankAccounts: bankAccountReducer,
    users: userReducer,
  },
});
