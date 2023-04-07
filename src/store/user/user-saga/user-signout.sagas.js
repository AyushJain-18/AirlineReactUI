import {takeLatest,put} from 'redux-saga/effects';

import {userLogOutSuccess} from '../user.actions';
import USER_TYPES from '../user.types';

function* signOut(){
  yield put(userLogOutSuccess())   
}


export default function* userLogOutSaga(){
  yield takeLatest(USER_TYPES .USER_LOGOUT_START, signOut) 
}