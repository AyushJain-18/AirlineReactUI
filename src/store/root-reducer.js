import {combineReducers} from 'redux'

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import flightRecucer from './flight/flight.reducer'
import userReducer from './user/user.reducer'

const presistConfig ={
    key: 'root',
    storage,
    whitelist: ['user', 'FetchedFlights']
}
const rootReducer =combineReducers({
    FetchedFlights: flightRecucer,
    user           : userReducer
})

//export default rootReducer;

export default persistReducer(presistConfig, rootReducer)