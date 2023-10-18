import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from 'api/todolists-api';
import {AppThunk} from 'app/store';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {appActions} from 'app/app.reducer';
import {todolistsActions} from 'features/TodolistsList/todolists.reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksAndTodolists} from 'common/actions/common.actions';

const initialState: TasksStateType = {};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    },
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        model: UpdateDomainTaskModelType;
        todolistId: string;
      }>
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = {...tasks[index], ...action.payload.model};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
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
const fetchTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
  let {dispatch, rejectWithValue} = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({status: 'loading'}));
    let res = await todolistsAPI.getTasks(todolistId);
    dispatch(appActions.setAppStatus({status: 'succeeded'}));
    return {tasks: res.data.items, todolistId};
  } catch (e) {
    return rejectWithValue('');
  }
});

const removeTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }>('tasks/removeTask', async (arg, thunkAPI) => {
  let {taskId, todolistId} = arg;
  await todolistsAPI.deleteTask(todolistId, taskId);
  return {taskId, todolistId};

});

export const addTaskTC =
  (title: string, todolistId: string): AppThunk =>
    (dispatch) => {
      dispatch(appActions.setAppStatus({status: 'loading'}));
      todolistsAPI
        .createTask(todolistId, title)
        .then((res) => {
          if (res.data.resultCode === 0) {
            const task = res.data.data.item;
            dispatch(tasksActions.addTask({task}));
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    };
export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
    (dispatch, getState) => {
      const state = getState();
      const task = state.tasks[todolistId].find((t) => t.id === taskId);
      if (!task) {
        //throw new Error("task not found in the state");
        console.warn('task not found in the state');
        return;
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

      todolistsAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(tasksActions.updateTask({taskId, model: domainModel, todolistId}));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    };


export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {fetchTasks, removeTaskTC: removeTask};


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
