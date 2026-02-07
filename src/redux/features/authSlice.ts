import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { AppwriteException, type Models } from "appwrite";
import authService from "../../appwrite/authService";

interface AuthState {
  userData: Models.User<Models.Preferences> | null;
  userStatus: boolean;
}

const initialState: AuthState = {
  userData: null,
  userStatus: false,
};

const ERROR = {
  LOGIN: "Failed to log in user",
  SIGNUP: "Failed to sign up user",
  LOGOUT: "Failed to log out user",
} as const;

// Use methods directly from the authService instance to preserve `this` binding
// (destructuring the methods would lose `this` and make `this.account` undefined).

const loginThunk = createAsyncThunk<
  Models.User<Models.Preferences>,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginThunk", async (data, { rejectWithValue }) => {
  try {
    await authService.login(data);
    return await authService.getCurrentUser();
  } catch (error) {
    return rejectWithValue(
      error instanceof AppwriteException ? error.message : ERROR.LOGIN,
    );
  }
});

const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutThunk",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.logout();
    } catch (error) {
      return rejectWithValue(
        error instanceof AppwriteException ? error.message : ERROR.LOGOUT,
      );
    }
  },
);

const signupThunk = createAsyncThunk<
  Models.User<Models.Preferences>,
  { email: string; password: string; name: string },
  { rejectValue: string }
>("auth/signupThunk", async (data, { rejectWithValue }) => {
  try {
    return await authService.createAccount(data);
  } catch (error) {
    return rejectWithValue(
      error instanceof AppwriteException ? error.message : ERROR.SIGNUP,
    );
  }
});

const checkAuthThunk = createAsyncThunk<
  Models.User<Models.Preferences>,
  void,
  { rejectValue: string }
>("auth/checkAuthThunk", async (_, { rejectWithValue }) => {
  try {
    return await authService.getCurrentUser();
  } catch (error) {
    return rejectWithValue(
      error instanceof AppwriteException ? error.message : ERROR.SIGNUP,
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.userData = data;
        state.userStatus = true;
      }
    });

    builder.addCase(signupThunk.fulfilled, (state, action) => {
      const data = action.payload;
      if (data) {
        state.userData = data;
        state.userStatus = true;
      }
    });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.userData = null;
      state.userStatus = false;
    });

    builder.addCase(checkAuthThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
        state.userStatus = true;
      }
    });

    builder.addCase(checkAuthThunk.rejected, (state) => {
      state.userData = null;
      state.userStatus = false;
    });
  },
});

export { loginThunk, signupThunk, logoutThunk, checkAuthThunk };

export default authSlice.reducer;
