import React from 'react';


import { 
    TextField, 
    Button, 
    Slider, 
    Fab, 
    Typography, 
    Paper,
    Grid,
    Card,
    CardActions,
    CardContent,
    Container,
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
                <LinearProgress variant="determinate" value={68} />
            </CardContent>
            <CardActions className={classes.buttons}>
                <Fab color="primary" aria-label="edit" size="small" variant="extended">
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
                        <GoalListCard className={props.childClassName} key={elem.key} elem={elem} onDelete={props.onDelete} />
                    </ListItem>
                );
            })}
        </List>
    );
}

export {
    GoalCreationForm,
    GoalCreationDialogForm,
    GoalListViewer
}