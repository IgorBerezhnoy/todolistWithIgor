import React, {ChangeEvent} from 'react';

type PropsType = {
    type: string
    checked: boolean
    callBack:(isDone:boolean)=>void
}

export const Input = (props:PropsType) => {
const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    props.callBack(e.currentTarget.checked)
}

    return (
        <input type={props.type} checked={props.checked} onChange={onChange}/>
    );
};

