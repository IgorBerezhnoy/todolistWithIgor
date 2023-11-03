import React, {useCallback, useEffect} from 'react';
import {TodolistDomainType} from 'features/TodolistsList/model/todolists/todolistsSlice';
import {tasksThunks} from 'features/TodolistsList/model/tasks/tasksSlice';
import {useActions} from 'common/hooks';
import {AddItemForm} from 'common/components';
import {TaskType} from '../../api/tasks/tasksApi';
import {FilterTaskButton} from './FilterTaskButton';
import {Tasks} from './Tasks';
import {TodolistTitle} from './TodolistTitle';


export const Todolist = React.memo(function (props: PropsType) {
  const {fetchTasks} = useActions(tasksThunks);


  const {addTask: addTaskThunk} = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(props.todolist.id);
  }, []);

  const addTask = useCallback(
    (title: string) => {
      return addTaskThunk({title, todolistId: props.todolist.id}).unwrap();
    },
    [addTaskThunk, props.todolist.id],
  );


  return (
    <div>
      <TodolistTitle todolist={props.todolist}/>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
      <Tasks todolist={props.todolist} tasks={props.tasks}/>
      <div style={{paddingTop: '10px'}}>
        <FilterTaskButton todolist={props.todolist}/>
      </div>
    </div>
  );
});

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};