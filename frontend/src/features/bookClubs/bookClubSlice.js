import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookClubsService from "../bankAccounts/bankAccountService";

const initialState = {
  bookClubs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new book club
export const createBookClub = createAsyncThunk(
  "bookClubs/create",
  async (bookClubData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookClubsService.createBookClub(bookClubData, token);
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

// Get users book clubs
export const getBookClubs = createAsyncThunk(
  "bookClubs/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const result = await bookClubsService.getBookClubs(token);
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

// Delete users book clubs
export const deleteBookClub = createAsyncThunk(
  "bookClubs/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookClubsService.deleteBookClub(id, token);
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
//TODO: Add updateBookClub thunk for admins
// create a thunk for allowing the user to turn on and off a modal and show the bank account edit form
export const updateBookClub = createAsyncThunk(
  "bookClubs/updateBookClub",
  async (bookClub, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookClubsService.updateBookClub(bookClub, token);
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

export const bookClubSlice = createSlice({
  name: "bookClub",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBookClub.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBookClub.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bankAccounts.push(action.payload);
      })
      .addCase(createBookClub.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBookClubs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookClubs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bankAccounts = action.payload;
      })
      .addCase(getBookClubs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBookClub.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBookClub.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bankAccounts = state.bankAccounts.filter(
          (bankAccount) => bankAccount._id !== action.payload.id
        );
      })
      .addCase(deleteBookClub.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookClubSlice.actions;
export default bookClubSlice.reducer;
