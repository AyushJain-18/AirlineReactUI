import All_PASSANGER_TYPES from './allpassenger.types';

const ALL_PASSANGER_INITIAL_STATE={
    passengers: [],
    isError: null,
    isFetching: false
}

const passengerReducer = (state=ALL_PASSANGER_INITIAL_STATE,action)=>{
    switch(action.type){
        case All_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_START:
            return{
                ...state,
                isFetching: true,
                isError:false
            }
        case All_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_SUCCESS:
        return{
            ...state,
            isFetching: false,
            isError:false,
            passengers: action.payload
        }
        case All_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_FAILURE:
        return{
            ...state,
            isFetching: false,
            isError:true,
        }
        case All_PASSANGER_TYPES.REMOVE_FETCHED_PASSENGERS:
            return{
                ...state,
                isFetching: false,
                isError:false,
                passengers:[]
            }
        default:
            return state
    }

}

export default passengerReducer;