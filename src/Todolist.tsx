import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './Components/Button';


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
    addTasks: (tittle: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('');


    const onClickButtonHandler = () => {
        props.addTasks(title);
        setTitle('');
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            props.addTasks(title);
            setTitle('');
        }
    };
    const onChangeButtonHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);

    };
    const tsarFooHandler = (value: FilterValuesType) => {
        props.changeFilter(value);
    };

    const removeTaskHandler = (tID: string) => props.removeTask(tID);


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeButtonHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickButtonHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={"x"} callBack={() => removeTaskHandler(t.id)}/>
                        </li>
                    );
                })
            }
        </ul>
        <div>
            <Button name={"all"} callBack={()=>tsarFooHandler('all')} />
            <Button name={"active"} callBack={()=>tsarFooHandler('active')} />
            <Button name={"completed"} callBack={()=>tsarFooHandler('completed')} />

        </div>
    </div>;
}
