import {TodolistDomainType, todolistsThunks} from '../../model/todolists/todolistsSlice';
import {useActions} from '../../../../common/hooks';
import React, {useCallback} from 'react';
import {EditableSpan} from '../../../../common/components';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export let TodolistTitle = ({todolist}: { todolist: TodolistDomainType }) => {
  const {
    removeTodolist: removeTodolistThunk,
    changeTodolistTitle: changeTodolistTitleThunk
  } = useActions(todolistsThunks);

  const removeTodolist = () => {
    removeTodolistThunk(todolist.id);
  };

  const changeTodolistTitle = useCallback(
    (title: string) => {
      changeTodolistTitleThunk({id: todolist.id, title});
    },
    [todolist.id, changeTodolistTitleThunk],
  );

  return (<h3>
    <EditableSpan value={todolist.title} onChange={changeTodolistTitle}/>
    <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
      <Delete/>
    </IconButton>
  </h3>);
};