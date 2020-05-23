import ADMIN_TYPES
 from './adminTypes'

const ADMIN_INITIAL_STATE={
        isLoading: false,
         isError: false,
        allPassengers: null,
        updatedData: null
        
}

const adminReducer = (state=ADMIN_INITIAL_STATE,action)=>{
    switch(action.type){
        case ADMIN_TYPES.START_FETCHING_ALL_PASSENGER_ADMIN:
        case ADMIN_TYPES.START_UPDATE_ADMIN:
            return{
                ...state,
                isLoading: true,
                isError: false,
                updatedData: null
            }
        case ADMIN_TYPES.SUCCESS_FETCHING_ALL_PASSENGER_ADMIN:
            return{
                ...state,
                isLoading: false,
                isError: false,
                allPassengers: action.payload
            }
        case ADMIN_TYPES.FAILURE_FETCHING_ALL_PASSENGER_ADMIN:
        case ADMIN_TYPES.FAILURE_UPDATE_ADMIN:
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        case ADMIN_TYPES.SUCCESS_UPDATE_ADMIN:
            return{
                ...state,
                isLoading: false,
                isError: false,
                updatedData: action.payload
            }    
        default:
            return state
    }

}

export default adminReducer;