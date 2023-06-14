import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css';
import {Input} from './Input';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeIsDone: (newId: string, NewIsDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
        } else {
            setError('Title is required');
        }
        setTitle('');

    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };
    const onClickFilterHandler = (value: FilterValuesType) => props.changeFilter(value);

    const OnChangeIsDoneHandler = (id:string,isDone:boolean) => {
        props.changeIsDone(id, isDone);
    };

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id);
                    // const OnChangeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeIsDone(t.id, event.currentTarget.checked);
                    // };
                    return <li key={t.id}  className={t.isDone?s.isDone:""}>
                        <Input type="checkbox" checked={t.isDone} callBack={(isDone  )=>OnChangeIsDoneHandler(t.id,isDone)} />
                       {/* <input type="checkbox" checked={t.isDone} onChange={OnChangeIsDoneHandler}/>*/}
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>;
                })
            }
        </ul>
        <div>
            <button className={props.filter == 'all' ? s.activeFilter : ''}
                    onClick={() => onClickFilterHandler('all')}>All
            </button>
            <button className={props.filter == 'active' ? s.activeFilter : ''}
                    onClick={() => onClickFilterHandler('active')}>Active
            </button>
            <button className={props.filter == 'completed' ? s.activeFilter : ''}
                    onClick={() => onClickFilterHandler('completed')}>Completed
            </button>
        </div>
    </div>;
}
