import {takeLatest, put,all,call} from 'redux-saga/effects';
import ADMIN_TYPES from './adminTypes';
import {
    successFetchingAdminPassengers,
    failFetchingAdminPassengers,
    successUpdatePassenger,
    failUpdatePassenger

} from './admin.action'

import {getRequest, updateRequest} from '../../utils/api.calls';

function * getAllPassenges(){
  try {   
    const allPassengers = [];
    const flight1= yield getRequest('/PQ001')
    const flight2=  yield getRequest('/PQ002')
    const flight3=  yield getRequest('/PQ003')
    const flight4=yield getRequest('/PQ001')
    const flight5=yield getRequest('/PQ001')
    
    flight1.data.forEach(passenger=>allPassengers.push(passenger))
    flight2.data.forEach(passenger=>allPassengers.push(passenger))
    flight3.data.forEach(passenger=>allPassengers.push(passenger))
    flight4.data.forEach(passenger=>allPassengers.push(passenger))
    flight5.data.forEach(passenger=>allPassengers.push(passenger))

    console.log('All Passengers', allPassengers);
    yield put(successFetchingAdminPassengers(allPassengers))
    }
    catch(error){
        yield put(failFetchingAdminPassengers)
    }
}

function * updatePassenger({payload}){
    try{
        const {modifiedData} = payload;
        const {airlineNumber, id} = modifiedData;
        const updatedData = yield updateRequest(`/${airlineNumber}/${id}`, modifiedData);
        console.log('Updated Data is', updatedData)
        yield put(successUpdatePassenger(updatedData))
    }catch(error){
        yield put(failUpdatePassenger())
    }
}

function* startFetchingAllPassengers(){
    yield takeLatest(ADMIN_TYPES.START_FETCHING_ALL_PASSENGER_ADMIN, getAllPassenges)
}

function * startUpdatePassenger(){
    yield takeLatest(ADMIN_TYPES.START_UPDATE, updatePassenger)
}

export default function *adminSaga(){
        yield all(
            [
                call(startFetchingAllPassengers),
               //  call(startUpdatePassenger)
            ]
        )
}