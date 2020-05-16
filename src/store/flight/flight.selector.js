import {createSelector} from 'reselect';

import {createFlightObject} from './flight.util'
// reselect provide memoization technique

// inputSelector
export const selectFlight = (store)=> store.FetchedFlights;


export const selectFlightFecthedStatus = createSelector(
    [selectFlight], FetchedFlights=>FetchedFlights.isFligthFething
);

export const selectFlightFetchedErrorStatus = createSelector(
    [selectFlight], FetchedFlights=>FetchedFlights.isFlightFetchedError
);

export const selectFlights =createSelector(
    [selectFlight], FetchedFlights=>FetchedFlights.flight
)
export const selectFlightsObj =createSelector(
    [selectFlight], FetchedFlights=>createFlightObject(FetchedFlights.flight)
)

export const selectFlightForSelectedPassenger =(flightNo)=>{
    console.log('flightNo Entered no', flightNo)
    return createSelector(
        [selectFlightsObj], flightObj=>flightObj[flightNo]
)}



