import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AppRootStateType} from '../app/store';

export const createAppAsyncThunk=createAsyncThunk.withTypes<CreatedAsyncThunkType>()
type CreatedAsyncThunkType = { state: AppRootStateType, dispatch: AppDispatch, rejectValue: null };
