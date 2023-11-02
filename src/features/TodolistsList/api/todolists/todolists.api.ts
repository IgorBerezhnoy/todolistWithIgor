import {instance} from 'common/api/common.api';
import {TaskPriorities, TaskStatuses} from 'common/enums/common.enums';
import {UpdateDomainTaskModelType} from 'features/TodolistsList/model/tasks/tasksSlice';
import {BaseResponseType} from 'common/types';
import {TaskType} from '../tasks/tasksApi';

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return instance.put<BaseResponseType>(`todo-lists/${arg.id}`, {title: arg.title});
  },

};

// Types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};



export type AddTaskArgType = {
  title: string;
  todolistId: string;
};

export type UpdateTaskArgType = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};

export type RemoveTaskArgType = {
  todolistId: string;
  taskId: string;
};

export type UpdateTodolistTitleArgType = {
  id: string;
  title: string;
};
