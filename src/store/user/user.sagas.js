import {takeLatest,put,all,call,delay} from 'redux-saga/effects';

import {
    getRequest,
    postRequest,
    deleteRequest,
    updateRequest
} from '../../utils/api.calls'
import USER_TYPES from './user.types'
import {
    userSignInStart,
    userSignInSuccess,
    userSignInFailure,
    userLogOutStart,
    userLogOutSuccess,
    userLogOutFailure,
    wrongCredentials
} from './user.actions'

function * userSignIn({payload:{email,password}}){
        try{
            yield delay(2000)
            const endpoint = '/users?'+ `loginID=${email}&password=${password}`;
            const {data} = yield getRequest(endpoint);
            yield console.log(data)
            if(data.length!==0){
                yield put(userSignInSuccess(data[0]))
                return;
            }else{
                yield put(wrongCredentials());
                return
            }
        } catch(error){
            yield put(userSignInFailure())
        }
      
    //    yield put(userSignInSuccess())
}
export  function* userSignInSaga(){
    yield takeLatest(USER_TYPES.USER_SIGNIN_START, userSignIn) 
}

export  function* userLogOutSaga(){
    yield takeLatest(USER_TYPES.USER_SIGNIN_START, userSignIn) 
}

 export default function* userSagas(){
    yield all([
        call(userSignInSaga),
        call(userSignInSaga)
    ])
 } 
