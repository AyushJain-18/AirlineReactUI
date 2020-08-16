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
export const setSelectedPassengerSeatNo =(seatNo)=>{
    return{
        type:ALL_PASSANGER_TYPES.SET_SELECTED_PASSENGER_SEAT_NO,
        payload: seatNo
    }
}
export const clearSelectedPassengerSeatNo =()=>{
    return{
        type:ALL_PASSANGER_TYPES.REMOVE_SELECTED_PASSENGER_SEAT_NO,
    }
}

export const onNewSeatSelected =(seatno)=>{
    return{
        type: ALL_PASSANGER_TYPES.SELECT_NEW_SEAT,
        payload: seatno
    }
}
export const clearNewSeatSelectedByPassenger =()=>{
    return{
        type:ALL_PASSANGER_TYPES.CLEAR_NEW_SEAT,
    }
}

export const changeStateOfDisplayNext =(value)=>{
    return{
        type:ALL_PASSANGER_TYPES.CHANGE_DISPLAY_BUTTON_NEXT,
        payload: value
    }
}

export const setCrewView =(view)=>{
    return{
        type: ALL_PASSANGER_TYPES.SET_CREW_VIEW,
        payload: view
    }
} 


export const pnrPassengerInfoStart =PNR=>{
    return{
        type:ALL_PASSANGER_TYPES.PNR_PASSENGER_INFO_FETCHING_START,
        payload: PNR
    }
}

export const pnrPassengerInfoSuccess =passenger=>{
    return{
        type:ALL_PASSANGER_TYPES.PNR_PASSENGER_INFO_FETCHING_SUCCESS,
        payload: passenger
    }
}

export const pnrPassengerInfoFailure =()=>{
    return{
        type:ALL_PASSANGER_TYPES.PNR_PASSENGER_INFO_FETCHING_FAILURE
    }
}
export const pnrPassengerInfoRemove =()=>{
    return{
        type:ALL_PASSANGER_TYPES.PNR_PASSENGER_INFO_FETCHING_REMOVE
    }
}

export const addPassengerPNRToReducer =(PNR)=>{
    return{
        type:ALL_PASSANGER_TYPES.ADD_PASSANGER_PNR_TO_REDUCER,
        payload: PNR
    }
}



export const seatUpdateForCrewLoggedInStart =()=>{
    return{
        type:ALL_PASSANGER_TYPES.SEAT_UPDATE_START_FOR_CREW_LOGED_IN,
    }
}

export const seatUpdateForCrewLoggedInSuccess =()=>{
    return{
        type:ALL_PASSANGER_TYPES.SEAT_UPDATE_SUCCESS_FOR_CREW_LOGED_IN,
    }
}
export const seatUpdateForCrewLoggedInFailed =()=>{
    return{
        type:ALL_PASSANGER_TYPES.SEAT_UPDATE_FAILURE_FOR_CREW_LOGED_IN,
    }
}