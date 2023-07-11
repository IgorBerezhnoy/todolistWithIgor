import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    AppBar,
    Button,
    Container,
    createTheme, CssBaseline,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {amber, teal} from '@mui/material/colors';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    title: string
    filter: FilterValuesType
    id: string
}
type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolist, setTodolist] = useState<Array<TodoListType>>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    );


    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Ice cream', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
        ]
    });

    const [isLightMode, setIsLightMode] = useState(true);

    const changeTodolistFilter = (nextFilterValue: FilterValuesType, todolistId: string) => {
        const updatedTodolists: Array<TodoListType> =
            todolist.map(el => el.id === todolistId ? {...el, filter: nextFilterValue} : el);
        setTodolist(updatedTodolists);

    };

    const changeTodolistTitle = (title: string, todolistId: string) => {
        const updatedTodolists: Array<TodoListType> =
            todolist.map(el => el.id === todolistId ? {...el, title} : el);
        setTodolist(updatedTodolists);

    };

    const removeTask = (taskId: string, todoId: string) => {

            setTasks({...tasks, [todoId]: tasks[todoId].filter(t => t.id !== taskId)});

        }
    ;
    const addTask = (title: string, todoId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };

        setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]});
    };
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoId: string) => {

        setTasks({
            ...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId
                ? {...el, isDone: newIsDoneValue}
                : el)
        });
    };

    const changeTasksTitle = (taskId: string, title: string, todoId: string) => {

        setTasks({
            ...tasks, [todoId]: tasks[todoId].map(el => el.id === taskId
                ? {...el, title}
                : el)
        });
    };

    const removeTodolist = (todoId: string) => {
        const updatedTodoLists: Array<TodoListType> = todolist.filter(tl => tl.id !== todoId);
        setTodolist(updatedTodoLists);
        delete tasks[todoId];
    };

    const addTodolist = (title: string) => {
        const newTodoId = v1();
        const newTodo: TodoListType = {
            id: newTodoId,
            title: title,
            filter: 'all'
        };
        setTodolist([newTodo, ...todolist]);
        setTasks({[newTodoId]: [], ...tasks});
    };
    const getFilteredTasks =
        (allTasks: Array<TaskType>, currentFilterValue: FilterValuesType): Array<TaskType> => {
            switch (currentFilterValue) {
                case 'completed':
                    return allTasks.filter(t => t.isDone);
                case 'active':
                    return allTasks.filter(t => !t.isDone);
                default:
                    return allTasks;
            }
        };

    const mode = isLightMode ? 'light' : 'dark';
    const todoListsComponents: Array<JSX.Element> = todolist.map((tl) => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter);


        return (
            <Grid item key={tl.id}>
                <Paper elevation={4}><TodoList
                    idTodo={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={filteredTasks}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeTodolistFilter}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTasksTitle={changeTasksTitle}
                    changeTodolistTitle={changeTodolistTitle}
                /></Paper></Grid>
        );
    });

    const customTheme = createTheme({
        palette: {
            primary: teal,
            secondary: amber,
            mode: mode

        }
    });


    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position={'static'}>
                    <Toolbar><IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        <Button variant={'contained'} color={'secondary'}>LogOut</Button>
                        <Button sx={{margin: '10px'}}
                                variant={'contained'} color={'secondary'}
                                onClick={() => setIsLightMode(!isLightMode)}>{isLightMode ? <NightlightIcon/> :
                            <LightModeIcon/>}</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container>

                        <div className={'AddItem'}>
                            <AddItemForm maxItemTitleLength={15} addItem={addTodolist}/>
                        </div>

                    </Grid>
                    <Grid container spacing={2}>
                        {todoListsComponents}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
