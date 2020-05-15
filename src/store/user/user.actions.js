import USER_TYPES  from './user.types';

export const wrongCredentials =()=>{
    return{
        type: USER_TYPES.USER_ENTERED_WRONG_CREDENTIALS
    }
}

export const userSignInStart =(userCredentials)=>{
    //we want user credentials so we pass them as payload but we will not use them in reducer
    // insted we us e them in our saga and pass them to our next saga call 
    // in order to get them validate.
    return{
        type:USER_TYPES.USER_SIGNIN_START,
        payload: userCredentials
    }
}
export const userSignInSuccess =(user)=>{
    return{
        type:USER_TYPES.USER_SIGNIN_SUCCESS,
        payload: user
    }
}
export const userSignInFailure =()=>{
    return{
        type:USER_TYPES.USER_SIGNIN_FAILURE,
    }
}


export const userLogOutStart =()=>{
    return{
        type:USER_TYPES.USER_LOGOUT_START
    }
}
export const userLogOutSuccess =()=>{
    return{
        type:USER_TYPES.USER_LOGOUT_SUCCESS,
        payload: null
    }
}
export const userLogOutFailure =()=>{
    return{
        type:USER_TYPES.USER_LOGOUT_FAILURE
    }
}