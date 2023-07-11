import React from 'react';
import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type ActionType = RemoveTodolistsAT | AddTodolistsAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export type RemoveTodolistsAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string

}
export type AddTodolistsAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todolistId: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todolistId: string
}

export const todolistsReducer = (todolists: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.todolistId);
        case 'ADD-TODOLIST':

            const newTodo: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            };
            return [newTodo, ...todolists];
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(el => el.id === action.todolistId ? {...el, title: action.title} : el);
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el);
        default:
            return todolists;
    }
};
export const RemoveTodolistsAC = (todolistId: string): RemoveTodolistsAT => ({type: 'REMOVE-TODOLIST', todolistId});
export const AddTodolistsAC = (title: string, todolistId: string): AddTodolistsAT => ({
    type: 'ADD-TODOLIST',
    title,
    todolistId
});
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    todolistId
});
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    todolistId
});
