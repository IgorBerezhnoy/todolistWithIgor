import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log('Todolist   11');
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id]);
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id]);

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), []);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), []);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), []);


    let tasks = props.tasks;


    if (props.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>{
            tasks.map(t => <Task key={t.id} taskId={t.id} title={t.title} isDone={t.isDone} todolistId={props.id}/>)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <ButtonWithMemo variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}
                            color={'inherit'} title={'All'}/>
            <ButtonWithMemo variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onActiveClickHandler}
                            color={'primary'} title={'Active'}/>
            <ButtonWithMemo variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onCompletedClickHandler}
                            color={'secondary'} title={'Completed'}/>

            {/*<ButtonWithMemo variant={props.filter === 'all' ? 'outlined' : 'text'}*/}
            {/*                onClick={onAllClickHandler}*/}
            {/*                color={'inherit'} title={"All"}/ >*/}
            {/*    <ButtonWithMemo variant={props.filter === 'active' ? 'outlined' : 'text'}*/}
            {/*                    onClick={onActiveClickHandler}*/}
            {/*                    color={'primary'} title={"Active"}/>*/}
            {/*    <ButtonWithMemo variant={props.filter === 'completed' ? 'outlined' : 'text'}*/}
            {/*                    onClick={onCompletedClickHandler}*/}
            {/*                    color={'secondary'} title={"Completed"}/>*/}

        </div>
    </div>;
});

type ButtonWithMemoPropsType = {
    variant: 'text' | 'outlined' | 'contained',
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    title: string
    onClick: () => void
}

const ButtonWithMemo = (props: ButtonWithMemoPropsType) => {
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}>{props.title}
    </Button>;
};

