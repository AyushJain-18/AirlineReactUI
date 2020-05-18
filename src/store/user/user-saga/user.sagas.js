import {all,call} from 'redux-saga/effects';

import userSignInSaga from './user-signIn.sagas';
import userLogOutSaga from './user-signout.sagas';
import passengerSaga from './user-passenger-sagas';
import passengerInfoUpdateSaga from './passenger-info-update'

export default function* userSagas(){
    yield all([
        call(userSignInSaga),
        call(userLogOutSaga),
        call(passengerSaga),
        call(passengerInfoUpdateSaga)
        
    ])
 }