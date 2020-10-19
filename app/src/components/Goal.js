import React from 'react';


import { 
    TextField, 
    Button, 
    Slider, 
    Fab, 
    Typography, 
    Card,
    CardActions,
    CardContent,
    LinearProgress,
    Dialog,
    List,
    ListItem,
    DialogTitle,
    DialogContent,
    DialogActions
    } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { GoalSelector, createGoal } from '../api/GoalAPI';

const useCardStyles = makeStyles({
    root: {
        margin: "10px",
        justifyContent: "flex-start",
        border: "1px #dedede solid"
    },
    title: {
        fontSize: 25
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    }
});

function GoalListCard(props) {
    const classes = useCardStyles();
    return(
        <Card variant="outlined" className={props.className} variant="elevation">
            <CardContent>
                <Typography variant="h6" component="h6" className={classes.title} align="left">
                    {props.elem.title}
                </Typography>
                <Typography variant="p">
                    {props.elem.description}
                </Typography>
            </CardContent>
            <CardActions className={classes.buttons}>
                <Fab color="primary" aria-label="edit" size="small" variant="extended" onClick={()=> props.onEdit(props.elem.key)}>
                    Edit <EditIcon />
                </Fab>
                <Fab color="secondary" aria-label="delete" size="small" variant="extended" onClick={() => props.onDelete(props.elem.key)}>
                    Delete <DeleteIcon />
                </Fab>
            </CardActions>
        </Card>
    );
}

function GoalCreationDialogForm(props) {
    return(
        <div>
            <Dialog fullWidth open={props.open} maxWidth="sm" onClose={props.onClose}>
                <DialogTitle>
                    Task Creation
                </DialogTitle>
                <DialogContent>
                    <GoalCreationForm title={props.title} weight={props.weight} onSliderChange={props.onSliderChange} onChange={props.onChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary" variant="outlined">
                        Cancel
                    </Button>
                    <Button color="primary" variant="outlined" onClick={props.onClick}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function GoalCreationForm(props) {
    return (
        <form>
            <TextField
                id="standard-basic"
                label="Title"
                name="title"
                type="text"
                value={props.title}
                onChange={props.onChange}
            />
            <br/>
            <TextField
                id="standard-basic"
                label="Description"
                name="description"
                type="text"
                value={props.description}
                onChange={props.onChange}
            />
            <br />
            <Slider
                name="weight"
                style={{ width: "200px" }}
                min={1}
                max={11}
                defaultValue={6}
                marks
                valueLabelFormat={(x) => x - 1}
                valueLabelDisplay="auto"
                value={props.weight}
                onChange={props.onSliderChange}
            />
        </form>
    );
}

function GoalListViewer(props) {
    return (
        <List>
            {props.list.map(elem => {
                return(
                    <ListItem>
                        <GoalListCard className={props.childClassName} key={elem.key} elem={elem} onDelete={props.onDelete} onEdit={props.onEdit}/>
                    </ListItem>
                );
            })}
        </List>
    );
}

function GoalApp(props) {
    const [state, setState] = React.useState({
        list: JSON.parse(localStorage.getItem('goalListStorage')) || [],
        key: "",
        title: "",
        description: "",
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
            goal = {title: state.title, weight: state.weight, key: state.key, description: state.description}
            updatedList = state.list.map((item) => {
                if (item.key === state.key) {return goal}
                return item
            });
        }
        else {
            goal = createGoal(state.title, state.weight, state.description);
            updatedList = state.list.concat(goal);
        }
        setState({ ...state, list: updatedList, title: "", weight: 6, openCreation: false, isEditing: false, key: "", description: ""});
        localStorage.setItem('goalListStorage', JSON.stringify(updatedList));
        props.onUpdate(state.list)
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
        props.onUpdate(state.list)
    }

    function editGoalClick(key) {
        const goal = state.list.find((item) => item.key == key);
        setState({...state, openCreation: true, isEditing: true, title: goal.title, weight: goal.weight, key: goal.key, description: goal.description})
        props.onUpdate(state.list)
    }

    return(
        <div className="GoalApp">
            <Button color="primary" variant="contained" onClick={handleClickOpen}>Create Task</Button>
            <GoalListViewer list={state.list} onDelete={deleteGoalClick} onEdit={editGoalClick} />

            <GoalCreationDialogForm open={state.openCreation} onClose={handleClickClose} title={state.title} weight={state.weight} description={state.description} onSliderChange={handleSliderChange} onChange={handleChange} onClick={handleGoalCreationClick} />
        </div>
    );
}

export {
    GoalApp,
    GoalCreationForm,
    GoalCreationDialogForm,
    GoalListViewer
}