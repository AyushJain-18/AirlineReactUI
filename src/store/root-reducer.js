import {combineReducers} from 'redux'
import flightRecucer from './flight/flight.reducer'
const rootReducer =combineReducers({
    FetchedFlights: flightRecucer
})

export default rootReducer;