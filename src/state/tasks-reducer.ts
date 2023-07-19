import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASKS-STATUS',
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASKS-TITLE',
    taskId: string
    todolistId: string
    newTitle: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)};
        case 'ADD-TASK':

            let task = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [task, ...state[action.todolistId]]};
        case 'CHANGE-TASKS-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id == action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            };
        case 'CHANGE-TASKS-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id == action.taskId ? {
                    ...el,
                    title: action.newTitle
                } : el)
            };
        case 'ADD-TODOLIST':
            return {...state, [action.id]: []};
        case 'REMOVE-TODOLIST':
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        default:
            throw new Error('I don\'t understand this type');
    }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId};
};
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId};
};
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASKS-STATUS', taskId, isDone, todolistId};
};
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASKS-TITLE', taskId, newTitle, todolistId};
};

//Жизненый цикл компонент
// Облости видимости переменых
// 3 этапа измения в юай в реакт