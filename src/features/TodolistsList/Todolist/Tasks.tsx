import React from "react";
import { TaskStatuses } from "common/enums";
import {TaskType} from '../api/taskApi';
import {TodolistDomainType} from '../model/todolist/todolists.reducer';
import {Task} from './Task/Task';

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Tasks = ({ tasks, todolist }: Props) => {
    let tasksForTodolist = tasks;

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <>
            {tasksForTodolist.map((t) => (
                <Task key={t.id} task={t} todolistId={todolist.id} />
            ))}
        </>
    );
};
