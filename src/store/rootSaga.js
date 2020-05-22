import {all, call} from 'redux-saga/effects';

import {flightSaga} from './flight/flight.saga';
import userSagas from './user/user-saga/user.sagas';
import allPassengerSaga from './allpassenger/allpassenger.sagas';
import adminSaga from './admin/admin.sagas';


export default function* rootSaga(){
    yield all(
        [
            call(flightSaga),
            call(userSagas),
            call(allPassengerSaga),
            call(adminSaga)
        ]
    )
}