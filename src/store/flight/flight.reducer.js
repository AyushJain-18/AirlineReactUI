import FLIGHT_ACTION_TYPES from "./flight.types";
import { startFlightFetching,flightFetchFailure,flightFetchStatus,flightFetchingSuccess } from "./flight.actions";
import {STATIC_FLIGHT_DATA} from './flight.util'
const FLIGHT_FETCHED_INITIAL_STATE = {
    flight : STATIC_FLIGHT_DATA,
    isFligthFething: false,
    isFlightFetchedError: false
}


const flightRecucer = (state = FLIGHT_FETCHED_INITIAL_STATE ,action)=>{
    switch(action.type){

        case FLIGHT_ACTION_TYPES.FETCH_FLIGHT_START:
            return{
                        ...state,
                        isFligthFething: true
            }

        case FLIGHT_ACTION_TYPES.FETCH_FLIGHT_SUCCESS:
            return{
                        ...state,
                        flight: action.payload,
                        isFligthFething: false,
                        isFlightFetchedError: false
            }

        case FLIGHT_ACTION_TYPES.FETCH_FLIGHT_FAILURE:
            return{
                        ...state,
                        isFligthFething: false,
                        isFlightFetchedError: true
            } 
            default:
                return state
    }
}

export default flightRecucer;