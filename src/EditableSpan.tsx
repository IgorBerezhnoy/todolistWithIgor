import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>('');


    const onDoubleClickHandler = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return editMode
        ? <TextField size={"small"}
                     variant={"standard"}
                     value={title} onChange={(e)=>onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>;
};