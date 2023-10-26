import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from 'app/store';
import {appActions} from 'app/app.reducer';
import {authAPI, LoginParamsType} from 'features/auth/auth.api';
import {clearTasksAndTodolists} from 'common/actions';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from 'common/utils';

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logoutTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  }


});


// thunks
 const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/loginTC', async (data, thunkAPI) => {
  let {dispatch, rejectWithValue} = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({status: 'loading'}));
    let res = await authAPI.login(data);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({status: 'succeeded'}));
      return {isLoggedIn: true};
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }

});

 const logoutTC = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/logoutTC', async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI;
  dispatch(appActions.setAppStatus({status: 'loading'}));
  const res = await authAPI.logout();

  try {
    if (res.data.resultCode === 0) {
      dispatch(clearTasksAndTodolists());
      dispatch(appActions.setAppStatus({status: 'succeeded'}));
      return {isLoggedIn: false};
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }

});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunk ={loginTC,logoutTC}
// export const _logoutTC = (): AppThunk => (dispatch) => {
//   dispatch(appActions.setAppStatus({status: 'loading'}));
//   authAPI
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(authActions.setIsLoggedIn({isLoggedIn: false}));
//         dispatch(clearTasksAndTodolists());
//         dispatch(appActions.setAppStatus({status: 'succeeded'}));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };
