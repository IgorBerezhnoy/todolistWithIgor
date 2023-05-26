export type TASKType = {
    data: DataType
}

export type DataType = {
    title: string
    tasks: Array<tasksType>
    students: Array<string>

}
export type tasksType = {
    taskId: number
    title: string
    isDone: boolean
}

export const TASK = (props: TASKType) => {
    return (<div>
        <h3>{props.data.title}</h3>
        <ul>
            {props.data.tasks.map(el => <li key={el.taskId}><input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span></li>)}
            <ul>{props.data.students.map(el=><li key={Math.random()}>{el}</li>)}</ul>
        </ul>
    </div>);
};