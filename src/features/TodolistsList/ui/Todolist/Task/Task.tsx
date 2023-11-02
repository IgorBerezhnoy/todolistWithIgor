  import React, {ChangeEvent} from 'react';
  import {Checkbox, IconButton} from '@mui/material';
  import {Delete} from '@mui/icons-material';
import {EditableSpan} from 'common/components';
import {TaskStatuses} from 'common/enums';
import {TaskType} from '../../../api/tasks/tasksApi';
import {useActions} from '../../../../../common/hooks';
import {tasksThunks} from '../../../model/tasks/tasksSlice';


export const Task = React.memo(({task, todolistId}: { task: TaskType, todolistId: string }) => {
  const {removeTask: removeTaskThunk, updateTask} = useActions(tasksThunks);

  const onClickHandler = () => removeTaskThunk({taskId: task.id, todolistId: todolistId});

  const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    let status = {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New};
    updateTask({taskId: task.id, domainModel: status, todolistId});
  };

  const onTitleChangeHandler = (newValue: string) => {
    updateTask({taskId: task.id, domainModel: {title: newValue}, todolistId});
  };
  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={onStatusChangeHandler}/>
      <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
      <IconButton onClick={onClickHandler}>
        <Delete/>
      </IconButton>
    </div>
  );
});
