import {todolistsAPI, TodolistType} from 'api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType,} from 'app/app-reducer';
import {handleServerNetworkError} from 'utils/error-utils';
import {AppThunk} from 'app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: Array<TodolistDomainType> = [];


const slice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    removeTodolistAC: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state.splice(index, 1);
    },
    addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
    },
    changeTodolistFilterAC: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistTitleAC: (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeTodolistEntityStatusAC: (state, action: PayloadAction<{ todolistId: string, status: RequestStatusType, }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) state[index].entityStatus = action.payload.status
    },
    setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}));
    },

  }
});

export const todolistsReducer = slice.reducer;
export const {
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  addTodolistAC,
  setTodolistsAC
} = slice.actions;

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC({todolists: res.data}));
        dispatch(setAppStatusAC({status: 'succeeded'}));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: ThunkDispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC({status: 'loading'}));
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC({todolistId}));
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(setAppStatusAC({status: 'succeeded'}));
    });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(addTodolistAC({todolist: res.data.data.item}));
      dispatch(setAppStatusAC({status: 'succeeded'}));
    });
  };
};
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(todolistId, title).then((res) => {
      dispatch(changeTodolistTitleAC({todolistId, title}));
    });
  };
};

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistsActionType
  | ReturnType<typeof changeTodolistEntityStatusAC>;
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>;
