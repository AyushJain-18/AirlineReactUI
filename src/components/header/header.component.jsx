import React, {Fragment,useState} from 'react';
import './header.styles.scss';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'

import { ReactComponent as Logo } from '../../assets/logo.svg';
import {selectPassenger,selectUserSignInStatus} from '../../store/user/user.selector';
import {userLogOutStart, clearUserError} from '../../store/user/user.actions'
import {removeFetchedPassengers} from '../../store/allpassenger/allpassenger.action'


// import HeaderStyles from './Header.module.scss';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2)
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

const Header = ({history,passengerDetails,isUserSingIn,logOut, removePassengers,clearUserError}) => {
    const classes = useStyles();
    const imageURL = AccountCircle;
    const [anchorEl, setanchorEl]= useState(null);

    const redirectToHomePage = () => {
        history.push('/');
    };
    const redirectToSignInPage = () => {
        history.push('/signIn');
        clearUserError();
    };
    const setCurrentAnchorPosition = event => {
        event.persist();
        setanchorEl(event.currentTarget);
    };

    const resetAnchorPositionToNull = () => {
        setanchorEl(null)
    }
    const signOut =()=>{
        resetAnchorPositionToNull();
        logOut();
        removePassengers();
        redirectToHomePage();
    }

    return (
        <header className={classes.root}>
            <AppBar position="static" className={classes.Appbar}>
                <Toolbar>
                    <div onClick={redirectToHomePage} className ={classes.logoIcon}>
                        <Logo/>
                    </div>
                    <IconButton onClick={redirectToHomePage}
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
                    <AccountCircle role="button" className='logoIcon' onClick={redirectToSignInPage}/>}
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
const mapDispatchToProps = (dispatch)=>{
        return{
            logOut: ()=>dispatch(userLogOutStart()),
            removePassengers: ()=> dispatch(removeFetchedPassengers()),
            clearUserError: ()=>dispatch(clearUserError())
        }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

// anchorEl={this.state.anchorEl}