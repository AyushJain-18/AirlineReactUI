import All_PASSANGER_TYPES from './allpassenger.types';

const ALL_PASSANGER_INITIAL_STATE={
    passengers: [],
    selectedPassengerSeatNo: null,
    isError: null,
    isFetching: false,
    newSeatNumber: null
}

const passengerReducer = (state=ALL_PASSANGER_INITIAL_STATE,action)=>{
    switch(action.type){
        case All_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_START:
            return{
                ...state,
                isFetching: true,
                isError:false,
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
                selectedPassengerSeatNo: null,
                passengers:[]
            }
        case All_PASSANGER_TYPES.SET_SELECTED_PASSENGER_SEAT_NO:
            return{
                ...state,
                selectedPassengerSeatNo: action.payload
            }
            case All_PASSANGER_TYPES.SELECT_NEW_SEAT:
            return{
                ...state,
                newSeatNumber: action.payload
            }
        default:
            return state
    }

}

export default passengerReducer;