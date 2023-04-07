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
  pnrPassengerInfoStart, 
  seatUpdateForCrewLoggedInFailed,
  seatUpdateForCrewLoggedInSuccess,
  seatUpdateForCrewLoggedInStart
} from '../../allpassenger/allpassenger.action';
import { startFetchingAdminPassengers,  } from '../../admin/admin.action';
//startUpdatePassenger, successUpdatePassenger

function * startUserUpdate({payload}){
  try{
    const{airlineNumber,id,updatedData,logedInUserType,checkInPassengerPNR} = payload;
    if(logedInUserType==='Crew'){
      yield put(seatUpdateForCrewLoggedInStart());
    }
    const updatedPassenger =yield updateRequest(`/${airlineNumber}/${id}`,updatedData);
    yield put(passengerInfoUpdateSuccess(updatedPassenger.data))
    if(logedInUserType==='In-flight'){
      yield put(fetchingPessangerDetailsSuccess(updatedPassenger.data))
    }
    if(logedInUserType==='Crew'){
      yield put(fetchingAllPassengerStart(airlineNumber));
      yield put(pnrPassengerInfoStart(checkInPassengerPNR)); 
      yield put(seatUpdateForCrewLoggedInSuccess());
    }
    if(logedInUserType==='Admin'){
      yield put(startFetchingAdminPassengers())
      // yield put(successUpdatePassenger(updatedPassenger.data))
    }
           
            
       
  } catch(error){
    yield put(seatUpdateForCrewLoggedInFailed());
    yield put(passengerInfoUpdateFailure());
  }

    
}

export default function* passengerInfoUpdateSaga(){
  yield takeLatest(USER_TYPES.START_UPDATE, startUserUpdate)
} 