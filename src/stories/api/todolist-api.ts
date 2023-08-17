import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,

});
type TodolistType = {
    'id': string,
    'title': string,
    'addedDate': string,
    'order': number
}

type ResponseType<T> = {
    resultCode: 0
    messages: [],
    data: T
}

export const todolistApi = {
    getTodolist() {
        return instance.get<TodolistType[]>('todo-lists');

    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title});

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title});

    }
};