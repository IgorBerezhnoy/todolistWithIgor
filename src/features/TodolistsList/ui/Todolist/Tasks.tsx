import {TaskType} from '../../api/tasks/tasksApi';
import {TodolistDomainType} from '../../model/todolists/todolistsSlice';
import {TaskStatuses} from '../../../../common/enums';
import {Task} from './Task/Task';
import React from 'react';

export let Tasks = ({tasks, todolist}: { tasks: TaskType[], todolist: TodolistDomainType }) => {

  let tasksForTodolist = tasks;
  if (todolist.filter === 'active') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return <>{tasksForTodolist.map((t) => (
    <Task key={t.id} task={t} todolistId={todolist.id}/>))}</>;
};