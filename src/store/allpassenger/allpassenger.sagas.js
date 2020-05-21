import {takeLatest, put,all,call} from 'redux-saga/effects';
import All_PASSANGER_TYPES from './allpassenger.types';

import {getRequest} from '../../utils/api.calls';
import {
    fetchingAllPassengerFailure,
    fetchingAllPassengerSuccess,
    pnrPassengerInfoSuccess,
    pnrPassengerInfoFailure,
    changeStateOfDisplayNext
} from './allpassenger.action'


function* getAllPassengers({payload: airlineNo}){
    try{
      const allPassenger =  yield getRequest(`/${airlineNo}`);
        yield put(fetchingAllPassengerSuccess(allPassenger.data))
    } catch(error){
        yield put(fetchingAllPassengerFailure())
    }
        
}
function *getPassengerInfo({payload}){
    try{
        const PNR = payload;
        const flight = PNR.split('X')[0];
        const passenger =yield getRequest(`/${flight}?PNR=${PNR}`);
        const passengerInfo = passenger.data[0];
        // yield console.log(passengerInfo);
         yield put(pnrPassengerInfoSuccess(passengerInfo))
         yield put(changeStateOfDisplayNext(true))
    } catch(error){
            yield put(pnrPassengerInfoFailure())
    }
}


 function* fetchAllPassenger(){
    yield takeLatest(All_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_START, getAllPassengers)
}


 function* passengerInforFromPNR(){
    yield  takeLatest(All_PASSANGER_TYPES.PNR_PASSENGER_INFO_FETCHING_START, getPassengerInfo)
}

export default function *allPassengerSaga(){
        yield all(
            [
                call(fetchAllPassenger),
                call(passengerInforFromPNR)
            ]
        )
}

