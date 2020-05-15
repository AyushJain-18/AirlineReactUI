import USER_TYPES from './user.types';

const INTIAL_USER_STATE ={
    userSignInOutInProgress: false,
    userSignInOutError: null,
    isWrongCredentialsEntered: false,
    userData: null
};

const userReducer = (state = INTIAL_USER_STATE, action)=>{
    switch(action.type){
        case USER_TYPES.USER_SIGNIN_START:
        case USER_TYPES.USER_LOGOUT_START:
            return {
                ...state,
                userSignInOutInProgress: true,
                userSignInOutError:null,
                isWrongCredentialsEntered: false
            }
        case USER_TYPES.USER_SIGNIN_SUCCESS:
        case USER_TYPES.USER_LOGOUT_SUCCESS:  
            return {
                ...state,
                userSignInOutInProgress: false,
                userSignInOutError:null,
                isWrongCredentialsEntered: false,
                userData: action.payload,
            }
        case USER_TYPES.USER_SIGNIN_FAILURE:
        case USER_TYPES.USER_LOGOUT_FAILURE:
            return {
                ...state,
                userSignInOutInProgress: false,
                isWrongCredentialsEntered: false,
                userSignInOutError: true
            }
            case USER_TYPES.USER_ENTERED_WRONG_CREDENTIALS:
                return {
                    ...state,
                    isWrongCredentialsEntered: true,
                    userSignInOutInProgress: false
                }
        default:
            return{
                ...state
            }
    }
}

export default userReducer;