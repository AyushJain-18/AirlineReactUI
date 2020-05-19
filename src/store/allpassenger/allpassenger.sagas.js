import {takeLatest, put} from 'redux-saga/effects';
import All_PASSANGER_TYPES from './allpassenger.types';

import {getRequest} from '../../utils/api.calls';
import {fetchingAllPassengerFailure,fetchingAllPassengerSuccess} from './allpassenger.action'


function* getAllPassengers({payload: airlineNo}){
    try{
      const allPassenger =  yield getRequest(`/${airlineNo}`);
        yield put(fetchingAllPassengerSuccess(allPassenger.data))
    } catch(error){
        yield put(fetchingAllPassengerFailure())
    }
        
}

export default function* allPassengerSaga(){
    yield takeLatest(All_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_START, getAllPassengers)
}