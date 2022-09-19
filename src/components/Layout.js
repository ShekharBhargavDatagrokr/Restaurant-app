import React from 'react';
// import { makeStyles } from '@mui/styles';
import  {makeStyles} from '@material-ui/core/';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// import AppBar from '@mui/material/AppBar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Typography} from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import Drawer from '@mui/material/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import format from 'date-fns/format';

import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const drawerWidth =240;

const useStyles = makeStyles((theme)=>{
    return {
        page:{
            background:'#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer:{
            width: drawerWidth
        },
        root:{
            display: 'flex',
        },
        drawerPaper:{
            width: drawerWidth
        },
        active:{
            background: '#f4f4f4'
        },
        title:{
            padding:theme.spacing(2)
        },
        appBar:{
            //width: `calc(100% -${drawerWidth}px)`
            width: `calc(100% - 240px)`
        },
        toolbar: theme.mixins.toolbar,
        date:{
            flexGrow: 1
        },
        avatar:{
            margin: theme.spacing(2)
        }
    }
})

export default function Layout({children}){
    const classes = useStyles();
    const history = useHistory()
    const location = useLocation()

    const menuItems=[
        {
            text: 'All Reservations',
            icon: <SubjectOutlinedIcon color='secondary' />,
            path: '/'
        },
        {
            text: 'Create Reservation',
            icon: <AddCircleOutlineOutlinedIcon color='secondary' />,
            path: '/create'
        }
    ]

    return (
        <div className={classes.root}>
            {/* app bar */}
            <AppBar className={classes.appBar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.date}>
                    Welcome to the Restaurant reservation portal, Today is { format(new Date(), 'do MMMM Y') } 
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Side Drawer */}
            <Drawer
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{paper: classes.drawerPaper}}
            >
                <div>
                    <Typography variant='h5' className={classes.title}>
                        Reservations
                    </Typography>
                </div>

            {/* List/Links */}
            <List>
                {menuItems.map(item => (
                    <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={location.pathname == item.path ? classes.active : null}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}