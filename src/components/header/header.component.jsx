import React, {Fragment,useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {connect} from 'react-redux'

import { ReactComponent as Logo } from '../../assets/logo.svg';

import { withRouter } from 'react-router-dom';

import './header.styles.scss';

import {selectPassenger,selectUserSignInStatus} from '../../store/user/user.selector';



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

const Header = ({history,passengerDetails,isUserSingIn}) => {
    const classes = useStyles();
    const imageURL = AccountCircle;
    const [anchorEl, setanchorEl]= useState(null);

    const routeToHomePage = () => {
        history.push('/');
    };
    const routeToSignInPage = () => {
        history.push('/signIn');
    };
    const setCurrentAnchorPosition = event => {
        event.persist();
        setanchorEl(event.currentTarget);
    };

    const resetAnchorPositionToNull = () => {
        setanchorEl(null)
    }
    const signOut =()=>{
        console.log('logout')
    }

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
                    {isUserSingIn?<Fragment>
                        {passengerDetails? (<img src={passengerDetails.Image}
                                                onClick={setCurrentAnchorPosition}
                                                className='logoImg' 
                                                alt="user-profile-pic"></img>):(
                                            <AccountCircle role="button"  
                                                    className='logoIcon' 
                                                    onClick={setCurrentAnchorPosition}>
                                            </AccountCircle>
                                                )}
                                <Menu id="simple-menu" 
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={resetAnchorPositionToNull}>
                                        <MenuItem onClick={signOut}>Logout</MenuItem>
                                </Menu>
                    </Fragment>:
                    <AccountCircle role="button" className='logoIcon' onClick={routeToSignInPage}/>}
                    </Toolbar>
            </AppBar>
        </header>
    );
}


const mapStateToProps =(state)=>{
    return{
        isUserSingIn: selectUserSignInStatus(state),
        passengerDetails: selectPassenger(state)
        }
}

      
export default withRouter(connect(mapStateToProps)(Header));

// anchorEl={this.state.anchorEl}