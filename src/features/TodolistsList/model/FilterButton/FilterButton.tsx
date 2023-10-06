import React, {useCallback} from 'react';
import {Button} from '@mui/material';
import {useActions} from '../../../../common/hooks';
import {FilterValuesType, TodolistDomainType, todolistsActions} from '../todolist/todolists.reducer';

type Props = {
    todolist: TodolistDomainType;
}
const FilterButton = (props: Props) => {
    const {changeTodolistFilter} = useActions(todolistsActions);

    const onButtonFilterClickHandler = useCallback(
        (filter: FilterValuesType) => changeTodolistFilter({filter: filter, id: props.todolist.id}),
        [props.todolist.id],
    );

    return (
        <div>
            <Button
                variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                onClick={() => onButtonFilterClickHandler('all')}
                color={'inherit'}
            >
                All
            </Button>
            <Button
                variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                onClick={() => onButtonFilterClickHandler('active')}
                color={'primary'}
            >
                Active
            </Button>
            <Button
                variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                onClick={() => onButtonFilterClickHandler('completed')}
                color={'secondary'}
            >
                Completed
            </Button>
        </div>
    );
};

export default FilterButton;