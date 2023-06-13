import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist..module.css';
import {Input} from './Input';

export type TaskType = {
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
    changeIsDone: (id: string, isDone: boolean) => void
    filter:FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string|null>("");
    const [buttonName, setButtonName]=useState<FilterValuesType>("all")

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle('');
        }else {
            setError("Title is required")
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };

    const onClickHandler=(value:FilterValuesType)=>{
        props.changeFilter(value)
        setButtonName(value)
    }




    const onChangeIsDoneHandler = (tID:string,isDone:boolean) => {
        props.changeIsDone(t.id, isDone);

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error&& <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id);

                    return <li key={t.id} className={t.isDone?s.isDone:""}>
                        <Input type={"checkbox"} onChange={(isDone)=>onChangeIsDoneHandler(t.id, isDone)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>;
                })
            }
        </ul>
        <div>
            <button className={buttonName==="all"?s.activeFilter:""} onClick={()=>onClickHandler("all")}>All</button>
            <button className={buttonName==="active"?s.activeFilter:""} onClick={()=>onClickHandler("active")}>Active</button>
            <button className={buttonName==="completed"?s.activeFilter:""} onClick={()=>onClickHandler("completed")}>Completed</button>
        </div>
    </div>;
}
