import {combineReducers} from 'redux'
import flightRecucer from './flight/flight.reducer'
import userReducer from './user/user.reducer'
const rootReducer =combineReducers({
    FetchedFlights: flightRecucer,
    user           : userReducer
})

export default rootReducer;