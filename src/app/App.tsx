import {useAppDispatch} from '../hooks/useAppDispatch';
import {LinearProgress} from '@mui/material';
import {useEffect} from 'react';
import {appActions} from './app-reducer';
import {AppRootStateType, useAppSelector} from './store';
import React from 'react';
import {selectAppError, selectAppIsInitialized, selectAppStatus} from './App-Selectors';

export const App = () => {
    console.log('App render');

    const dispatch = useAppDispatch();


    const status = useAppSelector(selectAppStatus);
    const isInitialized = useAppSelector(selectAppIsInitialized);

    const error = useAppSelector(selectAppError);

    // const { isLoading, isAppInitialized, unHandleActions } = useAppSelector((state) => state.app);

    console.log('isLoading: ', status);
    console.log('isAppInitialized: ', isInitialized);
    console.log('unHandleActions: ', error);

    useEffect(() => {
        setTimeout(() => {
            // dispatch(appActions.setAppStatusAC({ isLoading:  }));
        }, 3000);
    }, []);

    return <div className="App">{status && <LinearProgress/>}</div>;
};