import ANCILLARY_TYPES from './ancilaryTypes';

//fetching Data
export const fetchAllAncillaryServiceDataStart =()=>({
    type: ANCILLARY_TYPES.FETCH_ANCILLARY_SERVICE_START
})

export const fetchAllAncillaryServiceDataFailure =()=>({
    type: ANCILLARY_TYPES.FETCH_ANCILLARY_SERVICE_FAILURE
})

export const fetchAllAncillaryServiceDataSuccess =(data)=>({
    type: ANCILLARY_TYPES.FETCH_ANCILLARY_SERVICE_SUCCESS,
    payload: data
})

// update ancillary services

export const updateAncillaryServiceDataStart =(updatedData)=>({
    type: ANCILLARY_TYPES.UPDATE_ANCILLARY_SERVICE_START,
    payload: updatedData
})

export const updateAncillaryServiceDataFailure =()=>({
    type: ANCILLARY_TYPES.UPDATE_ANCILLARY_SERVICE_FAILURE
})

export const updateAncillaryServiceDataSuccess =()=>({
    type: ANCILLARY_TYPES.UPDATE_ANCILLARY_SERVICE_SUCCESS,
})
