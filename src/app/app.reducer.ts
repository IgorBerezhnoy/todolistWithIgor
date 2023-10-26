import {Dispatch} from 'redux';
import {authActions} from 'features/auth/auth.reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI} from 'features/auth/auth.api';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from '../common/utils';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAppTC.fulfilled, (state, action) => {
        state.isInitialized = action.payload.isInitialized;
      });
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export const initializeAppTC = createAppAsyncThunk<{ isInitialized: true }, undefined>('app/initializeAppTC', async (arg, thunkAPI) => {
  let {dispatch, rejectWithValue} = thunkAPI;
  try {
    let res = await authAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));

    } else {
      // handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }

  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
  finally {
    return {isInitialized: true};
  }
});
//   () => (dispatch: Dispatch) => {
//   authAPI.me().then((res) => {
//     if (res.data.resultCode === 0) {
//       dispatch(authActions. setIsLoggedIn({ isLoggedIn: true }));
//     } else {
//     }
//
//     dispatch(appActions.setAppInitialized({ isInitialized: true }));
//   });
// };
