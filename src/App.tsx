import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';


export type ButtonNameType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'ReactJS', isDone: false}
    ]);
    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id));
    };

/*    let [filter, SetFilter] = useState('all');

    const filteredTask = (buttonName: ButtonNameType) => {
        SetFilter(buttonName);
    };

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(el => !el.isDone);
    }
  if (filter === 'completed') {
        tasksForTodolist = tasks.filter(el => el.isDone);
    }*/


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      />

        </div>
    );
}

export default App;
