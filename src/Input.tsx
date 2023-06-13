import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';

type PropsType={
    type:string
    onChange:(isDone:boolean)=>void

}



export const Input = (props:PropsType) => {

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        props.onChange(e.currentTarget.checked)
    }

    return (
        <input type={props.type} onChange={onChangeHandler}/>
    );
};
