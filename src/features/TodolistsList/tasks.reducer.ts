import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from 'api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {appActions} from 'app/app.reducer';
import {todolistsActions} from 'features/TodolistsList/todolists.reducer';
import {createSlice} from '@reduxjs/toolkit';
import {clearTasksAndTodolists} from 'common/actions/common.actions';
import {createAppAsyncThunk} from '../../utils/createAppAsyncThunk';

const initialState: TasksStateType = {};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = {...tasks[index], ...action.payload.model};
        }
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(removeTask.fulfilled, (state, action) => {

        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});


// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
  let {dispatch, rejectWithValue} = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({status: 'loading'}));
    let res = await todolistsAPI.getTasks(todolistId);
    dispatch(appActions.setAppStatus({status: 'succeeded'}));
    return {tasks: res.data.items, todolistId};
  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

const removeTask = createAppAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }>
  ('tasks/removeTask', async (arg, thunkAPI) => {
    let {dispatch, rejectWithValue} = thunkAPI;

    let {taskId, todolistId} = arg;
    try {
      let res = await todolistsAPI.deleteTask(todolistId, taskId);
      if (res.data.resultCode === 0) {
        return {taskId, todolistId};
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  })
;

const addTaskTC = createAppAsyncThunk<{ task: TaskType }, { title: string, todolistId: string }>
('tasks/addTaskTC', async ({title, todolistId}, thunkAPI) => {
  let {dispatch, rejectWithValue} = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({status: 'loading'}));
    let res = await todolistsAPI.createTask(todolistId, title);
    if (res.data.resultCode === 0) {
      const task = res.data.data.item;
      dispatch(appActions.setAppStatus({status: 'succeeded'}));
      return {task};
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});
export const updateTaskTC = createAppAsyncThunk<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, { taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }>
('tasks/updateTaskTC', async ({taskId, todolistId, domainModel}, thunkAPI) => {
  let {dispatch, rejectWithValue, getState} = thunkAPI;
  const state = getState();
  const task = state.tasks[todolistId].find((t) => t.id === taskId);
  if (!task) {
    return rejectWithValue(null);
  }
  const apiModel: UpdateTaskModelType = {
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    title: task.title,
    status: task.status,
    ...domainModel,
  };
  try {
    let res = await todolistsAPI.updateTask(todolistId, taskId, apiModel);
    if (res.data.resultCode === 0) {
      console.log({taskId, model: domainModel, todolistId});
      return {taskId, model: domainModel, todolistId};
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }

});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {fetchTasks, removeTaskTC: removeTask, addTaskTC, updateTaskTC};


// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

