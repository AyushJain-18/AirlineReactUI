import {createSelector} from 'reselect';

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



