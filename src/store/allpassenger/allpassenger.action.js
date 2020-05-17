import ALL_PASSANGER_TYPES from './allpassenger.types';

export const fetchingAllPassengerStart =(airlineNO)=>{
    return{
        type:ALL_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_START,
        payload: airlineNO
    }
}
export const fetchingAllPassengerSuccess =(allPassengers)=>{
    return{
        type:ALL_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_SUCCESS,
        payload: allPassengers
    }
}
export const fetchingAllPassengerFailure =()=>{
    return{
        type:ALL_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_FAILURE
    }
}
export const removeFetchedPassengers =()=>{
    return{
        type:ALL_PASSANGER_TYPES.REMOVE_FETCHED_PASSENGERS
    }
}