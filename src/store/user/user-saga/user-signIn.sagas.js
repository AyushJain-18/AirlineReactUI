import {takeLatest,put,delay} from 'redux-saga/effects';

import {
  getRequest
} from '../../../utils/api.calls'
import USER_TYPES from '../user.types'
import {
  userSignInSuccess,
  userSignInFailure,
  wrongCredentials,
  fetchingPessangerDetailsStart
    
} from '../user.actions';

function * userSignIn({payload:{email,password}}){
  try{
    yield delay(2000)
    const endpoint = '/users?'+ `loginID=${email}&password=${password}`;
    const {data} = yield getRequest(endpoint);
    // yield console.log(data)
    if(data.length!==0){
      yield put(userSignInSuccess(data[0]));
      if(data[0].isPassenger){
        yield put(fetchingPessangerDetailsStart(email));
      }
      return;
    }else{
      yield put(wrongCredentials());
      return
    }
  } catch(error){
    console.log(error)
    yield put(userSignInFailure())
  }
}
export default function* userSignInSaga(){
  yield takeLatest(USER_TYPES.USER_SIGNIN_START, userSignIn) 
}



 
