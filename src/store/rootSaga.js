import {all, call} from 'redux-saga/effects'
import {flightSaga} from './flight/flight.saga'


export default function* rootSaga(){
    yield all(
        [
            call(flightSaga)
        ]
    )
}