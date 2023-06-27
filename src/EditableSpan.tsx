import React, {ChangeEvent, useState} from 'react';

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
        ? <input value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>;
};