import React, {useState} from 'react';
import {ButtonNameType} from './App';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void

}

export function Todolist(props: PropsType) {

    let [filter, SetFilter] = useState('all');

    const filteredTask = (buttonName: ButtonNameType) => {
        SetFilter(buttonName);
    };


    const durshlagFoo = () => {

        let tasksForTodolist = props.tasks;
        if (filter === 'active') {
            tasksForTodolist = props.tasks.filter(el => !el.isDone);
        }
        if (filter === 'completed') {
            tasksForTodolist = props.tasks.filter(el => el.isDone);
        }
        return tasksForTodolist;

    };


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {durshlagFoo().map(el => <li key={el.id}>
                <button onClick={() => props.removeTask(el.id)}>X</button>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </li>)}


        </ul>
        <div>
            <button onClick={() => filteredTask('all')}>All</button>
            <button onClick={() => filteredTask('active')}>Active</button>
            <button onClick={() => filteredTask('completed')}>Completed</button>
        </div>
    </div>;
}
