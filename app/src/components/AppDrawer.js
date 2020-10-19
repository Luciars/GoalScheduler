import React from 'react'
import { 
    Drawer, 
    Toolbar,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

function ListItemLink(props) {
  const { primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

function AppDrawer(props) {
    const useStyle = makeStyles((theme) => ({
        drawer: {
            width: props.drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: props.drawerWidth,
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
            width: props.drawerWidth,
        }
    }));
    const classes = useStyle()
    return (
        <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
            <Toolbar />
            <List component="nav" aria-label="mailbox folders">
                <ListItemLink to="/goal" primary="Goal"/>
                <Divider />
                <ListItemLink to="/schedule" primary="Schedule"/>
            </List>
        </Drawer>
    );
}

export { AppDrawer }
