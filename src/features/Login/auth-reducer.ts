import {Dispatch} from 'redux';
import {SetAppErrorActionType, setAppInitAC, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer';
import {authAPI} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {addTaskAC} from '../TodolistsList/tasks-reducer';

const initialState = {
    isLoggedIn: false
};
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const);

// thunks
export const loginTC = (data: FormikType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    try {
        const result = await authAPI.login(data);
        if (result.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(result.data, dispatch);
        }

    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch);
    }
    dispatch(setAppStatusAC('succeeded'));
};
export const meTC = () => async (dispatch: Dispatch<ActionsType | ReturnType<typeof setAppInitAC>>) => {

    dispatch(setAppInitAC(true));
    dispatch(setAppStatusAC('loading'));
    try {
        const result = await authAPI.me();
        console.log(result);
        if (result.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(result.data, dispatch);
        }

    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch);
    }
    dispatch(setAppStatusAC('succeeded'));
    dispatch(setAppInitAC(false))
};

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
export type FormikType = {
    email: string
    password: string
    rememberMe: boolean
}