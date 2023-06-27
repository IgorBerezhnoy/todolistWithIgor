import React, {ChangeEvent, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus, faDeleteLeft, faTrash} from '@fortawesome/free-solid-svg-icons';


type AddItemFormPropsType = {
    maxItemTitleLength: number
    addItem: (trimmedTitle: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<boolean>(false);


    const maxItemTitleLength = props.maxItemTitleLength;
    const isItemTitleLengthTooLong = title.length > maxItemTitleLength;
    const isAddItemBtnDisabled = !title || isItemTitleLengthTooLong;


    const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false);
        }
        if (!isItemTitleLengthTooLong) {
            setTitle(e.currentTarget.value);
        }
    };

    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
        } else {
            setError(true);
        }
        setTitle('');
    };

    return (
        <div>
            <input
                value={title}
                onChange={changeItemTitle}
                className={error ? 'user-error' : undefined}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addItem();
                    }
                }}

            />
            <button
                disabled={isAddItemBtnDisabled}
                onClick={addItem}>
                <FontAwesomeIcon icon={faCirclePlus}/>
            </button>

            <button
                disabled={!title}
                onClick={() => setTitle(title.slice(0, -1))}>
                <FontAwesomeIcon icon={faDeleteLeft}/>
            </button>
            <button
                disabled={!title}
                onClick={() => setTitle('')}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
            {isItemTitleLengthTooLong && <div>You task title is too long</div>}
            {error && <div style={{'color': 'red', 'fontWeight': 'bold'}}>Please, enter correct title</div>}
        </div>
    );
};

