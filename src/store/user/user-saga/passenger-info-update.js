import{takeLatest, put} from 'redux-saga/effects';
import {updateRequest} from '../../../utils/api.calls'
import USER_TYPES from '../user.types';

import { 
    passengerInfoUpdateSuccess,
    passengerInfoUpdateFailure,
    fetchingPessangerDetailsSuccess
} from '../user.actions'

function * startUserUpdate({payload}){
    try{
        const{airlineNumber,id,updatedData} = payload;
        yield console.log(airlineNumber,id,updatedData)
        const updatedPassenger =yield updateRequest(`/${airlineNumber}/${id}`,updatedData);
        yield put(passengerInfoUpdateSuccess(updatedPassenger.data))
        yield put(fetchingPessangerDetailsSuccess(updatedPassenger.data))
    } catch(error){
        yield put(passengerInfoUpdateFailure())
    }

    
}

export default function* passengerInfoUpdateSaga(){
    yield takeLatest(USER_TYPES.START_UPDATE, startUserUpdate)
} 