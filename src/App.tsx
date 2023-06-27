import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    title: string
    filter: FilterValuesType
    id: string
}
type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {


    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolist, setTodolist] = useState<Array<TodolistType>>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    );

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Ice cream', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
        ]
    });


    const changeTodolistFilter = (nextFilterValue: FilterValuesType, todolistId: string) => {
        const updatedTodolists: Array<TodolistType> =
            todolist.map(el => el.id === todolistId ? {...el, filter: nextFilterValue} : el);
        setTodolist(updatedTodolists);

    };

    const changeTodolistTitle = (title:string, todolistId: string) => {
        const updatedTodolists: Array<TodolistType> =
            todolist.map(el => el.id === todolistId ? {...el, title} : el);
        setTodolist(updatedTodolists);

    };

    const removeTask = (taskId: string, todoId: string) => {

            setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== taskId)});

        }
    ;
    const addTask = (title: string, todoId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };

        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]});
    };
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoId: string) => {

        setTasks({
            ...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId
                ? {...el, isDone: newIsDoneValue}
                : el)
        });
    };

    const changeTasksTitle = (taskId: string, title: string, todoId: string) => {

        setTasks({
            ...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId
                ? {...el, title}
                : el)
        });
    };

    const removeTodolist = (todoId: string) => {
        const updatedTodoLists: Array<TodolistType> = todolist.filter(tl => tl.id !== todoId);
        setTodolist(updatedTodoLists);
        delete tasks[todoId];
    };

    const addTodolist = (title: string) => {
        const newTodoId = v1();
        const newTodo: TodolistType = {
            id: newTodoId,
            title: title,
            filter: 'all'
        };
        setTodolist([newTodo,...todolist])
        setTasks({[newTodoId]:[],...tasks })
    };
    const getFilteredTasks =
        (allTasks: Array<TaskType>, currentFilterValue: FilterValuesType): Array<TaskType> => {
            switch (currentFilterValue) {
                case 'completed':
                    return allTasks.filter(t => t.isDone);
                case 'active':
                    return allTasks.filter(t => !t.isDone);
                default:
                    return allTasks;
            }
        };

    const todoListsComponents: Array<JSX.Element> = todolist.map((tl) => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter);


        return (
            <TodoList
                key={tl.id}
                idTodo={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeTodolistFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
                changeTasksTitle={changeTasksTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
        );
    });


    return (
        <div className="App">
            <div className={"AddItem"}><AddItemForm maxItemTitleLength={15} addItem={addTodolist}/></div>
            {todoListsComponents}
        </div>
    );
}

export default App;
