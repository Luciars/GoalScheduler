import React from 'react';
import './App.css';

import {
    Button,
    AppBar,
    Toolbar,
    Drawer,
    Typography,
    CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { GoalCreationDialogForm, GoalListViewer } from './components/Goal';
import CustomizedTimeline from './components/Schedule';
import { GoalSelector, createGoal } from './api/GoalAPI';

const drawerWidth = 350;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height: "60px"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
        height: '85%'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    item: {
        margin: "10px",
        justifyContent: "flex-start",
        border: "1px #dedede solid",
        width: drawerWidth,
    }
}));

function App() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        list: JSON.parse(localStorage.getItem('goalListStorage')) || [],
        key: "",
        title: "",
        weight: 6,
        showList: false,
        openCreation: false,
        isEditing: false,
        schedule: []
    });

    function handleChange(event, newValue) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    function handleSliderChange(event, newValue) {
        setState({
            ...state,
            weight: newValue
        })
    }

    function handleClickOpen() {
        setState({
            ...state,
            openCreation: true
        })
    }

    function handleClickClose() {
        setState({
            ...state,
            openCreation: false
        })
    }

    function handleGoalCreationClick(event) {
        event.preventDefault();
        if (state.title === "") {
            event.preventDefault();
            return;
        }
        var goal = null;
        var updatedList = null;
        if (state.isEditing) {
            goal = {title: state.title, weight: state.weight, key: state.key}
            updatedList = state.list.map((item) => {
                if (item.key === state.key) {return goal}
                return item
            });
        }
        else {
            goal = createGoal(state.title, state.weight);
            updatedList = state.list.concat(goal);
        }
        setState({ ...state, list: updatedList, title: "", weight: 6, openCreation: false, isEditing: false, key: ""});
        localStorage.setItem('goalListStorage', JSON.stringify(updatedList));
    };

    function handleShowListClick(event) {
        if (state.list.length <= 0) {
            event.preventDefault();
            return;
        }
        const GoalChooser = new GoalSelector(state.list);
        let schedule = []
        for (let i = 0; i < 10; i++) {
            schedule.push({ ...GoalChooser.getRandomTask(), startHour: 9+i, endHour: 10+i})
        }
        setState({ ...state, showList: true, schedule: schedule });
    }

    function deleteGoalClick(key) {
        const updatedList = state.list.filter((item) => item.key !== key);
        setState({ ...state, list: updatedList });
        localStorage.setItem('goalListStorage', JSON.stringify(updatedList));
    }

    function editGoalClick(key) {
        const goal = state.list.find((item) => item.key == key);
        setState({...state, openCreation: true, isEditing: true, title: goal.title, weight: goal.weight, key: goal.key})
    }

    return (
        <div className="App">
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Schedule Maker
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <GoalListViewer list={state.list} onDelete={deleteGoalClick} onEdit={editGoalClick} childClassName={classes.item} />
                </div>
                <Button color="primary" variant="contained" onClick={handleClickOpen}>Create Task</Button>
                <Button color="primary" variant="outlined" onClick={handleShowListClick}>Make Schedule</Button>
            </Drawer>
            <div className={classes.content}>
                <Toolbar />
                <CustomizedTimeline schedule={state.schedule}/>
            </div>

            <GoalCreationDialogForm open={state.openCreation} onClose={handleClickClose} title={state.title} weight={state.weight} onSliderChange={handleSliderChange} onChange={handleChange} onClick={handleGoalCreationClick} />
        </div>
    );
}

export default App;
