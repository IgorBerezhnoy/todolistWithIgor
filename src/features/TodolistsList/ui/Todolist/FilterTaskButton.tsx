import {Button} from '@mui/material';
import React, {useCallback} from 'react';
import {useActions} from '../../../../common/hooks';
import {FilterValuesType, TodolistDomainType, todolistsActions} from '../../model/todolists/todolistsSlice';
import {TodolistType} from '../../api/todolists/todolists.api';

type Props = {
  todolist: TodolistDomainType
}
export let FilterTaskButton = ({todolist}: Props) => {
  const {changeTodolistFilter} = useActions(todolistsActions);

  const onChangeFilterHandler = (filter: FilterValuesType) => changeTodolistFilter({filter, id: todolist.id});

  return (<><Button
    variant={todolist.filter === 'all' ? 'outlined' : 'text'}
    onClick={() => onChangeFilterHandler('all')}
    color={'inherit'}
  >
    All
  </Button>
    <Button
      variant={todolist.filter === 'active' ? 'outlined' : 'text'}
      onClick={() => onChangeFilterHandler('active')}
      color={'primary'}
    >
      Active
    </Button>
    <Button
      variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
      onClick={() => onChangeFilterHandler('completed')}
      color={'secondary'}
    >
      Completed
    </Button></>);
};