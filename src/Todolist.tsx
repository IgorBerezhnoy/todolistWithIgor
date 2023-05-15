import React, {useState} from 'react';
import {ButtonNameType} from './App';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number, beautiful: string) => void

}

export function Todolist(props: PropsType) {

    const [filteredTask, setFilteredTask] = useState<ButtonNameType>('all');
    const filterTask = (buttonName: ButtonNameType) => {
        setFilteredTask(buttonName);
    };
    const boxForFilter = () => {
        let tasksAfterFilter = props.tasks;

        if (filteredTask == 'active') {
           (tasksAfterFilter = props.tasks.filter(el => !el.isDone));
        } else if (filteredTask == 'completed') {
          (tasksAfterFilter = props.tasks.filter(el => el.isDone));
        }
        return tasksAfterFilter
    };

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {boxForFilter().map((el) => {
                return (
                    <li key={el.id}>
                        <button onClick={() => props.removeTask(el.id, 'Hello,krasavchik')}>X</button>
                        <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>

                );
            })}
            {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        </ul>
        <div>
            <button onClick={() => filterTask('all')}>All</button>
            <button onClick={() => filterTask('active')}>Active</button>
            <button onClick={() => filterTask('completed')}>Completed</button>
        </div>
    </div>;
}
