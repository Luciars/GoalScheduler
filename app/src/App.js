import React from 'react';
import './App.css';

import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { GoalApp, GoalCreationDialogForm, GoalListViewer } from './components/Goal';
import { AppDrawer } from './components/AppDrawer';
import ScheduleContent from './components/Schedule';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height: "60px"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
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

    function updateList(list) {
        setState({ ...state, list: list })
    }

    return (
        <Router>
            <div className="App">
                <CssBaseline />
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Schedule Maker
                    </Typography>
                    </Toolbar>
                </AppBar>
                <AppDrawer drawerWidth={350} />
                <div className={classes.content}>
                    <Toolbar />
                    <Switch>
                        <Route path="/goal">
                            <GoalApp onUpdate={updateList} />
                        </Route>
                        <Route path="/schedule">
                            <ScheduleContent/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
