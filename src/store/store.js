import {createStore,applyMiddleware} from 'redux';
import rootReducer from './root-reducer';
import logger from 'redux-logger';

import rootSaga from './rootSaga'
import createSagaMiddelware from 'redux-saga';
const sagaMiddelware = createSagaMiddelware();


const middleware=[sagaMiddelware];
if(process.env.NODE_ENV ==="development"){
    middleware.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddelware.run(rootSaga)

export default store;





