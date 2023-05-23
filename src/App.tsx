import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {
let truck='What to learn1'
let truck2='What to learn2'

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false }
    ]

    return (
        <div className="App">
            <Todolist title={truck} title2={456} tasks={tasks1}/>
            <Todolist title={truck2} title3={false} tasks={tasks2}/>


        </div>
    );
}

export default App;
