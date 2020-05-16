import USER_TYPES  from './user.types';

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
        type:USER_TYPES.USER_LOGOUT_SUCCESS
    }
}

export const wrongCredentials =()=>{
    return{
        type: USER_TYPES.USER_ENTERED_WRONG_CREDENTIALS
    }
}

export const fetchingPessangerDetailsStart=(PNR)=>{
    return{
        type: USER_TYPES.PASSANGER_INFO_FETCHING_START,
        payload: PNR
    }
}
export const fetchingPessangerDetailsSuccess=(passenger)=>{
    return{
        type: USER_TYPES.PASSANGER_INFO_FETCHING_SUCCESS,
        payload: passenger
    }
}
export const fetchingPessangerDetailsFailure=()=>{
    return{
        type: USER_TYPES.PASSANGER_INFO_FETCHING_FAILURE
    }
}