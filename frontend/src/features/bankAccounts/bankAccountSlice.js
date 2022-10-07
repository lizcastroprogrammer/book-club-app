import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bankAccountsService from "./bankAccountService";

const initialState = {
  bankAccounts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new bank account
export const createBankAccount = createAsyncThunk(
  "bankAccounts/create",
  async (bankAccountData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bankAccountsService.createBankAccount(
        bankAccountData,
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get users bank accounts
export const getBankAccounts = createAsyncThunk(
  "bankAccounts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const result = await bankAccountsService.getBankAccounts(token);
      return result;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete users bank accounts
export const deleteBankAccount = createAsyncThunk(
  "bankAccounts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bankAccountsService.deleteBankAccount(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create a thunk for allowing the user to turn on and off a modal and show the bank account edit form
export const updateBankAccount = createAsyncThunk(
  "bankAccounts/updateBankAccount",
  async (bankAccount, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bankAccountsService.updateBankAccount(bankAccount, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bankAccountSlice = createSlice({
  name: "bankAccount",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBankAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBankAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bankAccounts.push(action.payload);
      })
      .addCase(createBankAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBankAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBankAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bankAccounts = action.payload;
      })
      .addCase(getBankAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBankAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBankAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bankAccounts = state.bankAccounts.filter(
          (bankAccount) => bankAccount._id !== action.payload.id
        );
      })
      .addCase(deleteBankAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bankAccountSlice.actions;
export default bankAccountSlice.reducer;
