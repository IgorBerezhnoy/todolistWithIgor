import React, {useCallback, useEffect} from 'react';
import {TodolistDomainType, todolistsThunks} from 'features/TodolistsList/model/todolist/todolists.reducer';
import {tasksThunks} from 'features/TodolistsList/model/tasks/tasks.reducer';
import {TaskType} from 'features/TodolistsList/api/taskApi';
import {useActions} from 'common/hooks';
import {AddItemForm} from 'common/components';
import FilterButton from '../model/FilterButton/FilterButton';
import {Tasks} from './Tasks';
import {TodolistTitle} from './TodolistTitle';


type PropsType = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist: React.FC<PropsType> = React.memo(function (props) {
    const {fetchTasks} = useActions(tasksThunks);
    const {addTask: addTaskThunk} = useActions(tasksThunks);




    useEffect(() => {
        fetchTasks(props.todolist.id);
    }, []);

    const addTask = useCallback(
        (title: string) => {
            return addTaskThunk({title, todolistId: props.todolist.id});
        },
        [props.todolist.id],
    );



    return (
        <div>
            <h3>
                <TodolistTitle todolist={props.todolist} />
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                <Tasks todolist={props.todolist} tasks={props.tasks}/>
            </div>
            <div style={{paddingTop: '10px'}}>
                <FilterButton todolist={props.todolist}/>
            </div>
        </div>
    );
});


