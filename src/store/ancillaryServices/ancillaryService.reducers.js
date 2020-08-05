import ANCILLARY_TYPES from './ancilaryTypes'
const INITIAL_ANCILLARY_SERVICE_STATE ={
    isLoading: false,
    isError: false,
    ancilliaryData: []
}

const AncilliaryReducer = (state= INITIAL_ANCILLARY_SERVICE_STATE, action) => {
    switch(action.type){
        case ANCILLARY_TYPES.FETCH_ANCILLARY_SERVICE_START:
        case ANCILLARY_TYPES.UPDATE_ANCILLARY_SERVICE_START:
            return{
             ...state,
             isLoading: true,
             isError: false   
            }

        case ANCILLARY_TYPES.FETCH_ANCILLARY_SERVICE_FAILURE:
        case ANCILLARY_TYPES.UPDATE_ANCILLARY_SERVICE_FAILURE:
            return{
                ...state,
                isLoading: false,
                isError: true   
            }
        
        case ANCILLARY_TYPES.FETCH_ANCILLARY_SERVICE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                isError: false,
                ancilliaryData: action.payload   
            }

        case ANCILLARY_TYPES.UPDATE_ANCILLARY_SERVICE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                isError: false
            }
        default:
            return state
    }
}

export default AncilliaryReducer;