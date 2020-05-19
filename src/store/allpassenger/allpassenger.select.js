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

export const selectAllPassengerData = createSelector(

    [selectAllPassenger], AllPassenger=> AllPassenger.passengers
)
export const selectSeatNoOfSelectedPassenger = createSelector(

    [selectAllPassenger], AllPassenger=> AllPassenger.selectedPassengerSeatNo
)



export const selectMappedAllPassengerToSeat = createSelector(

    [selectAllPassengerData], AllPassenger=> mapPassengersToSeat(AllPassenger)
)

export const selectUnoccupiedSeat = (passengerSeatNo)=>{
    return createSelector([selectMappedAllPassengerToSeat],
         mappedPassengersToSeat=>  getUnOccupiedSeats(passengerSeatNo,mappedPassengersToSeat)
    )
}
