import {AppRootStateType} from './store';


export const selectAppStatus = (state: AppRootStateType) => state.app.status;
export const selectAppIsInitialized = (state: AppRootStateType) => state.app.isInitialized;
export const selectAppError = (state: AppRootStateType) => state.app.error;


