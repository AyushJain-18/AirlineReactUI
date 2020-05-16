import {takeLatest,put,all,call,delay} from 'redux-saga/effects';

export default function* userLogOutSaga(){
    yield console.log('logout')
    // yield takeLatest(USER_TYPES.USER_SIGNIN_START, userSignIn) 
}