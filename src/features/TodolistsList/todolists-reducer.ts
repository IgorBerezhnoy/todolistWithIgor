import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType,
    SetAppErrorActionType,
    appActions,
    SetAppStatusActionType,
} from '../../app/app-reducer';
import {handleServerNetworkError} from '../../utils/error-utils';
import {AppThunk} from '../../app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: Array<TodolistDomainType> = [];
export const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    removeTodolistAC: (state, action: PayloadAction<{id: string}>) => {
      let index =state.findIndex((el)=>el.id===action.payload.id)
      if (index){
        state.slice(index,1)
      }
    },
    addTodolistAC: (state, action: PayloadAction<{todolist: TodolistType }>) => {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
    },
    changeTodolistTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
      let task =state.find((el)=>el.id===action.payload.id)
      if (task) {
        task.title = action.payload.title
      }
    },    changeTodolistFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
      let task =state.find((el)=>el.id===action.payload.id)
      if (task) {
        task.filter = action.payload.filter
      }
    },    changeTodolistEntityStatusAC: (state, action: PayloadAction<{ id: string, status: RequestStatusType,  }>) => {
      let task =state.find((el)=>el.id===action.payload.id)
      if (task) {
        task.entityStatus = action.payload.status
      }
    },    setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
          return action.payload.todolists.map((tl) => ({
              ...tl,
              filter: 'all',
              entityStatus: 'idle',
          }))
    },
}});


export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;


// thunks
export const fetchTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatusAC({status: 'loading'}));
        todolistsAPI
            .getTodolists()
            .then((res) => {
                dispatch(todolistsActions.setTodolistsAC({todolists:res.data}));
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
};
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(appActions.setAppStatusAC({status: 'loading'}));
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(todolistsActions.changeTodolistEntityStatusAC({id:todolistId, status:'loading'}));
        todolistsAPI.deleteTodolist(todolistId).then((res) => {
            dispatch(todolistsActions.removeTodolistAC({id:todolistId}));
            //скажем глобально приложению, что асинхронная операция завершена
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
        });
    };
};
export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(appActions.setAppStatusAC({status: 'loading'}));
        todolistsAPI.createTodolist(title).then((res) => {
            dispatch(todolistsActions.addTodolistAC({todolist:res.data.data.item}));
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
        });
    };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolist(id, title).then((res) => {
            dispatch(todolistsActions.changeTodolistTitleAC({id, title}));
        });
    };
};

// types
export type AddTodolistActionType = ReturnType<typeof todolistsActions.addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof todolistsActions.removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof todolistsActions.setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof todolistsActions.changeTodolistTitleAC>
    | ReturnType<typeof todolistsActions.changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof todolistsActions.changeTodolistEntityStatusAC>;
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>;
