import {createSelector} from 'reselect';
import {
    mapPassengersToSeat,
    getUnOccupiedSeats,
    mapAllPassengersToPNR, // allpassengers Array
    mapAllPassengesToFligthNo, // allpassengers Array
} from '../../utils/seat.utils'

export const selectAdmin =state=> state.Admin;

export const selectLoadingState = createSelector([selectAdmin], admin=>admin.isLoading)

export const selectErrorState = createSelector([selectAdmin], admin=>admin.isError)

export const selectAllPassengers =  createSelector([selectAdmin], admin=>admin.allPassengers);

export const selectUpdatedPassengerData =  createSelector([selectAdmin], admin=>admin.updatedData);

export const selectPNRMappedPassenngers =  createSelector([selectAllPassengers], passengers=> mapAllPassengersToPNR(passengers));

export const selectFlightNoMappedPassengers =  createSelector([selectAllPassengers], passengers=> mapAllPassengesToFligthNo(passengers));

export const selectPassengerDataFromPNR = (PNR)=>{
    return createSelector([selectPNRMappedPassenngers], pnrMappedPassengersAray=>pnrMappedPassengersAray[PNR]);
} 

export const selectEmptySeatsOfParticularFlight = (flightNo,passengerSeatNo)=>createSelector([selectFlightNoMappedPassengers], 
        flightNoMappedPassengersAray=>{
            const allPassengersOfSelectedFlightNo = flightNoMappedPassengersAray[flightNo]
            const seatMappedPassengers = mapPassengersToSeat(allPassengersOfSelectedFlightNo);
            const emptySeatsOfParticularFlight = getUnOccupiedSeats(passengerSeatNo,seatMappedPassengers);
            return  emptySeatsOfParticularFlight
        })
