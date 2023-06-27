import React, {ChangeEvent, FC, useState} from 'react';
import {FilterValuesType} from './App';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
    // const [title, setTitle] = useState('');
    // const [error, setError] = useState<boolean>(false);

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
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}
                                />
                                <span className={task.isDone ? 'task-done' : 'task'}><EditableSpan title={task.title} onChange={changeTasksTitle}/></span>
                            </div>
                            <button onClick={removeTask}>x</button>
                        </li>
                    );
                })
            }
        </ul>;

    const addTask = (title:string) => props.addTask(title, props.idTodo);


    const maxTaskTitleLength = 15;
    // const isTaskTitleLengthTooLong = title.length > maxTaskTitleLength;
    // const isAddTaskBtnDisabled = !title || isTaskTitleLengthTooLong;
    // const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (error) {
    //         setError(false);
    //     }
    //     if (!isTaskTitleLengthTooLong) {
    //         setTitle(e.currentTarget.value);
    //     }
    // };
    const changeTodolistTitle = (title:string) => {
      props.changeTodolistTitle(title, props.idTodo)
    }
    return (
        <div className="todoList">
            <h3 className={'todolist-header'}><EditableSpan title={props.title} onChange={changeTodolistTitle}/><span><button
                onClick={() => props.removeTodolist(props.idTodo)}>x</button></span></h3>

            <AddItemForm maxItemTitleLength={maxTaskTitleLength} addItem={addTask}/>

            {/*<div>
                <input
                    value={title}
                    onChange={changeTaskTitle}
                    className={error ? 'user-error' : undefined}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addTask();
                        }
                    }}
                />
                <button
                    disabled={isAddTaskBtnDisabled}
                    onClick={addTask}>
                    <FontAwesomeIcon icon={faCirclePlus}/>
                </button>

                <button
                    disabled={!title}
                    onClick={() => setTitle(title.slice(0, -1))}>
                    <FontAwesomeIcon icon={faDeleteLeft}/>
                </button>
                <button
                    disabled={!title}
                    onClick={() => setTitle('')}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
                {isTaskTitleLengthTooLong && <div>You task title is too long</div>}
                {error && <div style={{'color': 'red', 'fontWeight': 'bold'}}>Please, enter correct title</div>}
            </div>*/}
            {tasksList}
            <div className={'buttons-block'}>
                <button
                    className={props.filter === 'all' ? 'btn-filter-active' : undefined}
                    onClick={() => props.changeFilter('all', props.idTodo)}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-filter-active' : undefined}
                    onClick={() => props.changeFilter('active', props.idTodo)}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn-filter-active' : undefined}
                    onClick={() => props.changeFilter('completed', props.idTodo)}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;