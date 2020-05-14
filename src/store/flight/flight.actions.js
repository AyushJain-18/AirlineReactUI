import FLIGHT_ACTION_TYPES from "./flight.types";

export const startFlightFetching = () =>{
        return{
            type:FLIGHT_ACTION_TYPES.FETCH_FLIGHT_START
        }
}

export const flightFetchingSuccess = (flights) =>{
    return{
        type:FLIGHT_ACTION_TYPES.FETCH_FLIGHT_SUCCESS,
        payload: flights
    }
}

export const flightFetchFailure = () =>{
    return{
        type:FLIGHT_ACTION_TYPES.FETCH_FLIGHT_FAILURE
    }
}

