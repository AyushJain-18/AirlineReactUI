import {createSelector} from 'reselect';
import {
    mapPassengersToSeat,
    getUnOccupiedSeats
} from '../../utils/seat.utils' 

export const selectAllPassenger =state=>state.AllPassenger;

export const selectAllPassengerFetchngStatus = createSelector(

    [selectAllPassenger], AllPassenger=>AllPassenger.isFetching
)

export const selectAllPassengerErrorStatus = createSelector(

    [selectAllPassenger], AllPassenger=>AllPassenger.isError
)

export const selectAllPassengerSeatUpdateMessage = createSelector(

    [selectAllPassenger], AllPassenger=>AllPassenger.seatUpdateMessage
)

export const selectAllPassengerData = createSelector(

    [selectAllPassenger], AllPassenger=> AllPassenger.passengers
)
export const selectSeatNoOfSelectedPassenger = createSelector(

    [selectAllPassenger], AllPassenger=> AllPassenger? AllPassenger.selectedPassengerSeatNo : null
)
export const selectUpdatedSeat = createSelector(

    [selectAllPassenger], AllPassenger=> AllPassenger.newSeatNumber
)



export const selectMappedAllPassengerToSeat = createSelector(

    [selectAllPassengerData], AllPassenger=>AllPassenger?  mapPassengersToSeat(AllPassenger): null
)

export const selectUnoccupiedSeat = (passengerSeatNo, unOccupiedSeats)=>{
   // console.log('unOccupiedSeats', unOccupiedSeats)
    if(unOccupiedSeats){
        return ()=> unOccupiedSeats
    }else {
        return createSelector([selectMappedAllPassengerToSeat],
            mappedPassengersToSeat=>  getUnOccupiedSeats(passengerSeatNo,mappedPassengersToSeat)
       )
    }
}

export const selectNextButtonState = createSelector(
    [selectAllPassenger], allPassengers=> allPassengers.nextDisplayButtonState
)


export const selectIsPNRFecthedHasAlreadyCheckedIn = createSelector(
    [selectAllPassenger], AllPassenger=> AllPassenger.PassengerInfoBasedOnPNR?
        !!AllPassenger.PassengerInfoBasedOnPNR.seatNo: null
)
export const selectSeatNoOfFetchedPassengerFromPNR = createSelector(
    [selectAllPassenger], AllPassenger=> AllPassenger.PassengerInfoBasedOnPNR?
        AllPassenger.PassengerInfoBasedOnPNR.seatNo: null
)
export const selectPassengerInfoOfFetchedPassengerFromPNR = createSelector(
    [selectAllPassenger], AllPassenger=> AllPassenger.PassengerInfoBasedOnPNR
)
export const selectPNR = createSelector(
    [selectAllPassenger], AllPassenger=> AllPassenger.passengerPNR
)

export const selectFlightNoFromPNREnteredWhileWebCheckIn = createSelector(
    [selectPNR], pnr=>{
        if(pnr){
            return pnr.split('X')[0]
        }
        
    } 
)