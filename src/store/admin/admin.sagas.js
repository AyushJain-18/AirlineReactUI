import {takeLatest, put,all,call, takeEvery} from 'redux-saga/effects';
import ADMIN_TYPES from './adminTypes';
import {
    successFetchingAdminPassengers,
    failFetchingAdminPassengers,
    failDeletePassengers,
    startFetchingAdminPassengers,
    failADDPassengers

} from './admin.action'

import {getRequest, deleteRequest,postRequest} from '../../utils/api.calls';

// get all the passengers
function * getAllPassenges(){
  try {   
    const allPassengers = [];
    const flight1= yield getRequest('/PQ001')
    const flight2=  yield getRequest('/PQ002')
    const flight3=  yield getRequest('/PQ003')
    const flight4=yield getRequest('/PQ004')
    const flight5=yield getRequest('/PQ005')
    
    flight1.data.forEach(passenger=>allPassengers.push(passenger))
    flight2.data.forEach(passenger=>allPassengers.push(passenger))
    flight3.data.forEach(passenger=>allPassengers.push(passenger))
    flight4.data.forEach(passenger=>allPassengers.push(passenger))
    flight5.data.forEach(passenger=>allPassengers.push(passenger))

    yield put(successFetchingAdminPassengers(allPassengers))
    }
    catch(error){
        yield put(failFetchingAdminPassengers)
    }
}
// delete a passenger
function * deletePassenger({payload}){
    try{
        const {flightNo, id}= payload;
       // console.log('flightNo',flightNo,id)
        yield deleteRequest(`/${flightNo}`, id)
        yield put(startFetchingAdminPassengers());
     } catch(error){
         yield put(failDeletePassengers)
     }

}

// add a new passenger

function * addNewPassenger(data){
  let passengerData = data.payload.passengersDetail;
  let flightNumber = passengerData.airlineNumber;
  try{
    yield postRequest(`/${flightNumber}`,passengerData);
    yield put(startFetchingAdminPassengers());
  }catch(error){
      yield put(failADDPassengers);
  }
}

function* startFetchingAllPassengers(){
    yield takeLatest(ADMIN_TYPES.START_FETCHING_ALL_PASSENGER_ADMIN, getAllPassenges)
}
function* startDeletingPassengers(){
    yield takeLatest(ADMIN_TYPES.START_DELETE_PASSENGER_ADMIN, deletePassenger)
}
function * startAddingPassenger(){
    yield takeLatest(ADMIN_TYPES.ADD_PASSENGER_START, addNewPassenger)
}

export default function *adminSaga(){
        yield all(
            [
                call(startFetchingAllPassengers),
                call(startDeletingPassengers),
                call(startAddingPassenger)
            ]
        )
}