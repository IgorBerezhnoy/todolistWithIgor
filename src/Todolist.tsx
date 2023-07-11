import React, {ChangeEvent, FC, useState} from 'react';
import {FilterValuesType} from './App';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


type TodoListPropsType = {
    idTodo: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType, todoId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoId: string) => void
    changeTasksTitle :(taskId: string, title: string, todoId: string) =>void
    removeTodolist: (todoId: string) => void
    changeTodolistTitle : (title:string, todolistId: string) =>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = (props) => {

    const tasksList = (props.tasks.length === 0)
        ? <p>TodoList is empty</p>
        : <ul className={'tasks-list'}>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.idTodo);
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.idTodo);
                    const changeTasksTitle=(title:string)=>{
                        props.changeTasksTitle(task.id, title,props.idTodo)
                    }
                    return (
                        <li key={task.id} className={'tasks-list-item'}>
                            <div>
                                <Checkbox
size={"small"}
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}
                                />
                                <span className={task.isDone ? 'task-done' : 'task'}><EditableSpan title={task.title} onChange={changeTasksTitle}/></span>
                            </div>
                            <IconButton size={"small"} onClick={removeTask}>
                                <DeleteIcon/>
                            </IconButton>
                        </li>
                    );
                })
            }
        </ul>;

    const addTask = (title:string) => props.addTask(title, props.idTodo);

    const maxTaskTitleLength = 15;

    const changeTodolistTitle = (title:string) => {
      props.changeTodolistTitle(title, props.idTodo)
    }
    return (
        <div className="todoList">
            <h3 className={'todolist-header'}><EditableSpan title={props.title} onChange={changeTodolistTitle}/><span>
                                 <IconButton size={"small"} onClick={() => props.removeTodolist(props.idTodo)}>
                                <DeleteIcon/>
                            </IconButton>
       </span></h3>

            <AddItemForm maxItemTitleLength={maxTaskTitleLength} addItem={addTask}/>

            {tasksList}
            <div className={'buttons-block'}>
                <Button variant={"contained"}
                        size={"small"}
                    color={props.filter === 'all' ? 'secondary' : "primary"}
                    onClick={() => props.changeFilter('all', props.idTodo)}>All
                </Button>
                <Button
                    variant={"contained"}
                    size={"small"}
                    className={props.filter === 'active' ? 'secondary' : "primary"}
                    onClick={() => props.changeFilter('active', props.idTodo)}>Active
                </Button>
                <Button
                    variant={"contained"}
                    size={"small"}
                    className={props.filter === 'completed' ? 'secondary' : "primary"}
                    onClick={() => props.changeFilter('completed', props.idTodo)}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;