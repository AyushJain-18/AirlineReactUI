import USER_TYPES from './user.types';

const INTIAL_USER_STATE ={
    isDisplayUserSpinner: false,
    isWrongCredentialsEntered: false,
    userError: null,
    passenger: null,
    userData: null
};

const userReducer = (state = INTIAL_USER_STATE, action)=>{
    switch(action.type){
        case USER_TYPES.USER_SIGNIN_START:
        case USER_TYPES.USER_LOGOUT_START:
        case USER_TYPES.PASSANGER_INFO_FETCHING_START:    
            return {
                ...state,
                isDisplayUserSpinner: true,
                userError:null,
                isWrongCredentialsEntered: false
            }
        case USER_TYPES.USER_SIGNIN_SUCCESS:  
            return {
                ...state,
                isDisplayUserSpinner: false,
                isWrongCredentialsEntered: false,
                userError:null,
                userData: action.payload,
            }
        case USER_TYPES.USER_SIGNIN_FAILURE:
        case USER_TYPES.PASSANGER_INFO_FETCHING_FAILURE:
            return {
                ...state,
                isDisplayUserSpinner: false,
                isWrongCredentialsEntered: false,
                userError: true
            }
            case USER_TYPES.USER_ENTERED_WRONG_CREDENTIALS:
                return {
                    ...state,
                    isWrongCredentialsEntered: true,
                    isDisplayUserSpinner: false
                }
            case USER_TYPES.PASSANGER_INFO_FETCHING_SUCCESS:  
                return {
                    ...state,
                    isDisplayUserSpinner: false,
                    userError:null,
                    isWrongCredentialsEntered: false,
                    passenger: action.payload,
                }
            case USER_TYPES.USER_LOGOUT_SUCCESS:
                return{
                    ...state,
                    isDisplayUserSpinner: false,
                    isWrongCredentialsEntered: false,
                    userError:null,
                    passenger : null,
                    userData: null
                }
        default:
            return state
    }
}

export default userReducer;