import {createStore,applyMiddleware} from 'redux';

import logger from 'redux-logger';

import createSagaMiddelware from 'redux-saga';

import {persistStore} from 'redux-persist'

import rootReducer from './root-reducer';
import rootSaga from './rootSaga'



const sagaMiddelware = createSagaMiddelware();
const middleware=[sagaMiddelware];
if(process.env.NODE_ENV ==="development"){
  middleware.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddelware.run(rootSaga);


export const storeWithPresistor = persistStore(store)
export default store;





