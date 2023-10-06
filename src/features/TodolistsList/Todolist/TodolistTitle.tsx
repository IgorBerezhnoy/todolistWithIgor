import {EditableSpan} from '../../../common/components';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import React, {useCallback} from 'react';
import {useActions} from '../../../common/hooks';
import {TodolistDomainType, todolistsThunks} from '../model/todolist/todolists.reducer';

type Props = { todolist: TodolistDomainType }
export const TodolistTitle = (props: Props) => {

    const {
        removeTodolist: removeTodolistThunk,

        changeTodolistTitle: changeTodolistTitleThunk,
    } = useActions(todolistsThunks);

    const removeTodolist = () => {
        removeTodolistThunk(props.todolist.id);
    };

    const changeTodolistTitle = useCallback(
        (title: string) => {
            changeTodolistTitleThunk({id: props.todolist.id, title});
        },
        [props.todolist.id],
    );

    return (<><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
            <Delete/>
        </IconButton></>);
};