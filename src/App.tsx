import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type ButtonNameType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'ReactJS', isDone: false}
    ]);

/*    const [filteredTask, setFilteredTask] = useState<ButtonNameType>('all');

    const filterTask = (buttonName: ButtonNameType) => {
        setFilteredTask(buttonName);
    };

    let tasksAfterFilter = tasks;

    if (filteredTask == 'active') {
        (tasksAfterFilter = tasks.filter(el => !el.isDone));
    } else if (filteredTask == 'completed') {
        (tasksAfterFilter = tasks.filter(el => el.isDone));
    }*/

    const removeTask = (taskId: number, beautiful: string) => {
        setTasks(tasks.filter(el => el.id !== taskId));
    };


    return (
        <div className="App">
            <Todolist removeTask={removeTask}
                      title="What to learn"
                       tasks={tasks}
                      />
        </div>
    );
}

export default App;
