import {tasksReducer} from 'features/TodolistsList/tasks-reducer';
import {todolistsReducer} from 'features/TodolistsList/todolists-reducer';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from 'features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});
// непосредственно создаём store
// export const _store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const store = configureStore({reducer: rootReducer});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

// export type AppDispatch = typeof store.dispatch
// export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;
