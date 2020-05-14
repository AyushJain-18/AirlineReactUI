import { takeLatest, delay, put } from 'redux-saga/effects'
import FLIGHT_ACTION_TYPES from './flight.types';
import {flightFetchFailure, flightFetchingSuccess} from './flight.actions'

export function* getAllFlights(){
  try{
    yield delay(2000);
    //  throw new Error()
   const response = yield fetch('http://localhost:3001/flight');
   const flights = yield response.json() 
   yield put(flightFetchingSuccess(flights))
  }
  catch(error){
    yield console.log(error.message)
    yield put(flightFetchFailure())
  }
  
}

export function* flightSaga(){
    yield console.log('SAGA IS WORKING FINE');
    yield takeLatest(FLIGHT_ACTION_TYPES.FETCH_FLIGHT_START, getAllFlights);
    yield console.log('SAGA IS NOT WORKING FINE');
}