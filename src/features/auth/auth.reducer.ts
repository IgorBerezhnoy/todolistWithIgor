import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {appActions} from 'app/app.reducer';
import {authAPI, LoginParamsType} from 'features/auth/auth.api';
import {handleServerAppError, handleServerNetworkError} from 'common/utils';
import {clearTasksAndTodolists} from '../../common/actions';

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        // setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        //     state.isLoggedIn = action.payload.isLoggedIn;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = true;
        });
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = false;
        });
        builder.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isLoggedIn = true;
        });
    }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

// thunks
export const loginTC = createAsyncThunk('auth/loginTC', async (data: LoginParamsType, thunkAPI) => {
    let {dispatch} = thunkAPI;

    dispatch(appActions.setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return {isLoggedIn: true};
        } else {
            handleServerAppError(res.data, dispatch);
            dispatch(appActions.setAppStatus({status: 'failed'}));

            return thunkAPI.rejectWithValue(res.data);
        }
    } catch (error:any) {
        dispatch(appActions.setAppStatus({status: 'failed'}));

        handleServerNetworkError(error, dispatch);
        return thunkAPI.rejectWithValue(error.data);

    }
});
export const logoutTC = createAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/logoutTC', async (_, thunkAPI) => {
    let {dispatch} = thunkAPI;

    dispatch(appActions.setAppStatus({status: 'loading'}));
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            dispatch(clearTasksAndTodolists());
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return {isLoggedIn: false};
        } else {
            handleServerAppError(res.data, dispatch);
            dispatch(appActions.setAppStatus({status: 'failed'}));

            return thunkAPI.rejectWithValue(null);
        }
    } catch (error) {
        dispatch(appActions.setAppStatus({status: 'failed'}));

        handleServerNetworkError(error, dispatch);
        return thunkAPI.rejectWithValue(null);

    }
});
export const initializeAppTC = createAsyncThunk('app/initializeAppTC', async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            const res = await authAPI.me();
            if (res.data.resultCode === 0) {
                return { isLoggedIn: true };
            } else {
                // handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppInitialized({ isInitialized: true }));
        }
    });

//
// export const logoutTC = (): AppThunk => (dispatch) => {
//     dispatch(appActions.setAppStatus({status: 'loading'}));
//     authAPI
//         .logout()
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(authActions.setIsLoggedIn({isLoggedIn: false}));
//                 dispatch(clearTasksAndTodolists());
//                 dispatch(appActions.setAppStatus({status: 'succeeded'}));
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch);
//         });
// };

// (data: LoginParamsType): AppThunk =>
// (dispatch) => {
//   dispatch(appActions.setAppStatus({ status: "loading" }));
//   authAPI
//     .login(data)
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//         dispatch(appActions.setAppStatus({ status: "succeeded" }));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };
