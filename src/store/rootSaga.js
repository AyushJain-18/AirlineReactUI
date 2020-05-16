import {all, call} from 'redux-saga/effects';

import {flightSaga} from './flight/flight.saga';
import userSagas from './user/user-saga/user.sagas'


export default function* rootSaga(){
    yield all(
        [
            call(flightSaga),
            call(userSagas)
        ]
    )
}