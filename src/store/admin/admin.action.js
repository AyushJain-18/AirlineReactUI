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




export const startUpdatePassenger =(modifiedData)=>{
    return{
        type:ADMIN_TYPES.START_UPDATE,
        payload: modifiedData
    }
}
export const successUpdatePassenger =(updatedData)=>{
    return{
        type:ADMIN_TYPES.SUCCESS_UPDATE,
        payload: updatedData
    }
}
export const failUpdatePassenger =()=>{
    return{
        type:ADMIN_TYPES.FAILURE_UPDATE,
    }
}
