import ADMIN_TYPES from './adminTypes';

export const startFetchingAdminPassengers =()=>{
    return{
        type:ADMIN_TYPES.START_FETCHING_ALL_PASSENGER_ADMIN,
    }
}

export const successFetchingAdminPassengers =(allPassengers)=>{
    return{
        type:ADMIN_TYPES.SUCCESS_FETCHING_ALL_PASSENGER_ADMIN,
        payload: allPassengers
    }
}

export const failFetchingAdminPassengers =(allPassengers)=>{
    return{
        type:ADMIN_TYPES.FAILURE_FETCHING_ALL_PASSENGER_ADMIN,
    }
}

// Admin delete passenger functionality
export const startDeletePassengers =(flightNo, id)=>{
    return{
        type:ADMIN_TYPES.START_DELETE_PASSENGER_ADMIN,
        payload:{flightNo, id}
    }
}

export const successDeletPassengers =()=>{
    return{
        type:ADMIN_TYPES.SUCCESS_DELETE_PASSENGER_ADMIN,
    }
}

export const failDeletePassengers =()=>{
    return{
        type:ADMIN_TYPES.FAILURE_DELETE_PASSENGER_ADMIN,
    }
}

// ADMIN Add passenger functionality

export const startAddPassengers =(passengersDetail)=>{
    return{
        type:ADMIN_TYPES.ADD_PASSENGER_START,
        payload:{passengersDetail}
    }
}

export const successADDPassengers =()=>{
    return{
        type:ADMIN_TYPES.ADD_PASSENGER_SUCCESS,
    }
}

export const failADDPassengers =()=>{
    return{
        type:ADMIN_TYPES.ADD_PASSENGER_FAILURE
    }
}


