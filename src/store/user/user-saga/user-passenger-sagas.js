import {takeLatest,put} from 'redux-saga/effects';
import USER_TYPES from '../user.types';
import { getRequest } from '../../../utils/api.calls';

import{fetchingPessangerDetailsFailure,
  fetchingPessangerDetailsSuccess} from '../user.actions'

function *getPassengerInfo({payload}){
  try{
    const PNR = payload;
    const flight = PNR.split('X')[0];
    const passenger =yield getRequest(`/${flight}?PNR=${PNR}`);
    const passengerInfo = passenger.data[0];
    yield put(fetchingPessangerDetailsSuccess(passengerInfo))
  } catch(error){
    yield put(fetchingPessangerDetailsFailure())
  }
}
export default function* passengerSaga(){
  yield  takeLatest(USER_TYPES.PASSANGER_INFO_FETCHING_START, getPassengerInfo)
}


