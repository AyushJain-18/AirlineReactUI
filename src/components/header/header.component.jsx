import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { withRouter } from 'react-router-dom';
// import HeaderStyles from './Header.module.scss';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logoIcon: {
        fontSize: 2.2 + 'rem',
        cursor: 'pointer'
    },
    Appbar: {
        backgroundColor: '#282c34',
        position: 'fixed',
        top: 0
    }
}));

const Header = (props) => {
    const classes = useStyles();

    const routeToHomePage = () => {
        props.history.push('/');
    };

    return (
        <header className={classes.root}>
            <AppBar position="static" className={classes.Appbar}>
                <Toolbar>
                    <div onClick={routeToHomePage} className ={classes.logoIcon}>
                        <Logo/>
                    </div>
                    <IconButton onClick={routeToHomePage}
                      role="menu" edge="start"
                      className={classes.menuButton}
                      color="inherit" aria-label="menu">
                         AIRWAYS
                    </IconButton>
                    <div variant="h6" className={classes.title}></div>
                    {/* <SignIn></SignIn> */}
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default withRouter(Header);