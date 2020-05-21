import{takeLatest, put} from 'redux-saga/effects';
import {updateRequest} from '../../../utils/api.calls';
import {fetchingAllPassengerStart} from '../../allpassenger/allpassenger.action'
import USER_TYPES from '../user.types';

import { 
    passengerInfoUpdateSuccess,
    passengerInfoUpdateFailure,
    fetchingPessangerDetailsSuccess,
} from '../user.actions'

import {
        pnrPassengerInfoStart
} from '../../allpassenger/allpassenger.action'

function * startUserUpdate({payload}){
    try{
        const{airlineNumber,id,updatedData,logedInUserType,checkInPassengerPNR} = payload;
        yield console.log(airlineNumber,id,updatedData,logedInUserType)
        const updatedPassenger =yield updateRequest(`/${airlineNumber}/${id}`,updatedData);
        yield put(passengerInfoUpdateSuccess(updatedPassenger.data))
        if(logedInUserType==='In-flight'){
            yield put(fetchingPessangerDetailsSuccess(updatedPassenger.data))
        }
        if(logedInUserType==='Crew'){
            yield put(fetchingAllPassengerStart(airlineNumber));
            yield put(pnrPassengerInfoStart(checkInPassengerPNR));
        }
           
            
       
    } catch(error){
        yield put(passengerInfoUpdateFailure())
    }

    
}

export default function* passengerInfoUpdateSaga(){
    yield takeLatest(USER_TYPES.START_UPDATE, startUserUpdate)
} 