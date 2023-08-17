import React, {useEffect, useState} from 'react';
import {todolistApi} from './api/todolist-api';

export default {
    title: 'API'
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistApi.getTodolist()
            .then((res) => {
                setState(res.data);
            });
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistApi.createTodolist('SSSSSSS')
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        let todolistId = 'a3f6f2f5-61d4-4938-92f1-9f37da5e3ae5';
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        let todolistId = '9ef8f112-87cb-4430-90cd-870379279d28';

        todolistApi.updateTodolist(todolistId, 'dsfsdfsdfds')
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};