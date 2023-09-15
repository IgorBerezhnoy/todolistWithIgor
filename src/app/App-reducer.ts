import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {authActions} from '../features/Login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
};

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status;
        },
        setAppInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized;
        },
    }
});

export const appActions = slice.actions;
export const appReducer = slice.reducer;


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {

    status: RequestStatusType;

    error: string | null;
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean;
};


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedInAC({isLoggedIn: true}));
        } else {
        }

        dispatch(appActions.setAppInitializedAC({isInitialized: true}));
    });
};

export type SetAppErrorActionType = ReturnType<typeof appActions.setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof appActions.setAppStatusAC>;

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof appActions.setAppInitializedAC>;
