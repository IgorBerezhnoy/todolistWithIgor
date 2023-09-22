import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from 'api/todolists-api';
import {AppThunk} from 'app/store';
import {handleServerNetworkError} from 'utils/errorUtils/handleServerNetworkError';
import {appActions} from 'app/app.reducer';
import {todolistsActions} from 'features/TodolistsList/todolists.reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksAndTodolists} from 'common/actions/common.actions';
import {createAppAsyncThunk} from '../../utils/createAppAsyncThunk';
import {handleServerAppError} from '../../utils/errorUtils/handle-server-app-error';

const initialState: TasksStateType = {};


export const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>('tasks/fetchTasksTC', async (todolistId, thunkAPI) => {

    try {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}));
        const res = await todolistsAPI.getTasks(todolistId);
        thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}));
        // thunkAPI.dispatch(tasksActions.setTasks({tasks:res.data.items, todolistId}));
        return {tasks: res.data.items, todolistId};
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
    }
});

const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
    `tasks/addTask`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            const res = await todolistsAPI.createTask(arg.todolistId, arg.title);
            if (res.data.resultCode === 0) {
                const task = res.data.data.item;
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
                return { task };
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
        }
    }
);


 const updateTaskTC =  createAppAsyncThunk<any, { taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }>
(`tasks/updateTaskTC`, async (arg, thunkAPI) => {
    let {taskId,todolistId, domainModel}=arg
let {getState, dispatch}=thunkAPI
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

    })





const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload.taskId);
            if (index !== -1) tasks.splice(index, 1);
        },
        // addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
        //     const tasks = state[action.payload.task.todoListId];
        //     tasks.unshift(action.payload.task);
        // },
        updateTask: (state, action: PayloadAction<{
            taskId: string;
            model: UpdateDomainTaskModelType;
            todolistId: string;
        }>) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex((t) => t.id === action.payload.taskId);
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.task.todoListId];
                    tasks.unshift(action.payload.task);
            })
            // .addCase(fetchTasks.fulfilled, (state, action) => {
            //     state[action.payload.todolistId] = action.payload.tasks;
            // })
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

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {fetchTasks,addTask, updateTaskTC };

// thunks
// export const _fetchTasksTC =
//     (todolistId: string): AppThunk =>
//         (dispatch) => {
//             dispatch(appActions.setAppStatus({status: 'loading'}));
//             todolistsAPI.getTasks(todolistId).then((res) => {
//                 const tasks = res.data.items;
//                 dispatch(tasksActions.setTasks({tasks, todolistId}));
//                 dispatch(appActions.setAppStatus({status: 'succeeded'}));
//             });
//         };

export const removeTaskTC =
    (taskId: string, todolistId: string): AppThunk =>
        (dispatch) => {
            todolistsAPI.deleteTask(todolistId, taskId).then(() => {
                dispatch(tasksActions.removeTask({taskId, todolistId}));
            });
        };
//
// export const addTaskTC =
//     (title: string, todolistId: string): AppThunk =>
//         (dispatch) => {
//             dispatch(appActions.setAppStatus({status: 'loading'}));
//             todolistsAPI
//                 .createTask(todolistId, title)
//                 .then((res) => {
//                     if (res.data.resultCode === 0) {
//                         const task = res.data.data.item;
//                         dispatch(tasksActions.addTask({task}));
//                         dispatch(appActions.setAppStatus({status: 'succeeded'}));
//                     } else {
//                         handleServerAppError(res.data, dispatch);
//                     }
//                 })
//                 .catch((error) => {
//                     handleServerNetworkError(error, dispatch);
//                 });
//         };
// export const updateTaskTC =
//     (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
//         (dispatch, getState) => {
//             const state = getState();
//             const task = state.tasks[todolistId].find((t) => t.id === taskId);
//             if (!task) {
//                 //throw new Error("task not found in the state");
//                 console.warn('task not found in the state');
//                 return;
//             }
//
//             const apiModel: UpdateTaskModelType = {
//                 deadline: task.deadline,
//                 description: task.description,
//                 priority: task.priority,
//                 startDate: task.startDate,
//                 title: task.title,
//                 status: task.status,
//                 ...domainModel,
//             };
//
//             todolistsAPI
//                 .updateTask(todolistId, taskId, apiModel)
//                 .then((res) => {
//                     if (res.data.resultCode === 0) {
//                         dispatch(tasksActions.updateTask({taskId, model: domainModel, todolistId}));
//                     } else {
//                         handleServerAppError(res.data, dispatch);
//                     }
//                 })
//                 .catch((error) => {
//                     handleServerNetworkError(error, dispatch);
//                 });
//         };

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
