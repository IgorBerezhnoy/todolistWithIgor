import {Dispatch} from 'redux';
import {SetAppErrorActionType, appActions, SetAppStatusActionType} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {
    handleServerAppError,
    handleServerNetworkError,
} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../../app/store';

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

// thunks
export const loginTC =
    (data: LoginParamsType):AppThunk => (dispatch) => {
        dispatch(appActions.setAppStatusAC({status:'loading'}));
        authAPI
            .login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(authActions.setIsLoggedInAC({isLoggedIn: true}));
                    dispatch(appActions.setAppStatusAC({status:'succeeded'}));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
export const logoutTC = ():AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatusAC({status:'loading'}));
    authAPI
        .logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedInAC({isLoggedIn: false}));
                dispatch(appActions.setAppStatusAC({status:'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};

// types

type ActionsType = ReturnType<typeof authActions.setIsLoggedInAC>;


type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>;
