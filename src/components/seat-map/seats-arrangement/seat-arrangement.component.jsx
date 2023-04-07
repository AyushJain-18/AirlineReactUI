import React from 'react'
import './seat-arrangement.styles.scss'


import {mapPassengersToSeat} from '../../../utils/seat.utils';
import Seat from '../seat/seat.component'
 



const SeatArrangement =({passengers,totalSeats,isWebCheckIn,displaySpecialMeal})=>{
  const passengerToSeat = mapPassengersToSeat(passengers)
  return(
    <div className='seat-map-arrangement'> 
      <Seat passengers={passengerToSeat} totalSeats={totalSeats} 
        isWebCheckIn ={isWebCheckIn} displaySpecialMeal={displaySpecialMeal}
        // setPassengerSeatNoAction={setPassengerSeatNoAction}
      />
    </div>
  )
}

    

export default SeatArrangement