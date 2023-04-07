import React, {Fragment} from 'react';
import './passenger-info-with-seat-number.styles.scss';

import {connect} from 'react-redux';
//import {mapPassengersToSeat} from '../../../utils/seat.utils';
import {
  selectSeatNoOfSelectedPassenger,
  selectMappedAllPassengerToSeat
} from '../../../store/allpassenger/allpassenger.select'
import PassengerAuxilaryServiceInfo from '../passenger-auxilarys-discription/passenger-auxilarys-description.component';
import PassengerGerenralInfo from '../passenger-gerenral-info/passenger-general-info.component';


const PassengerInfoWithSeatNumber = ({editable,selectedPassengerSeatNo,mappedPassengerDataToSeats})=>{
  let selectedPassenger= mappedPassengerDataToSeats[selectedPassengerSeatNo];

  return(
    <Fragment>
      {selectedPassengerSeatNo&& <div>{
        selectedPassenger? 
          <div className= 'passenger-info-container'>
            <PassengerGerenralInfo key={selectedPassenger.id+'p'} passengerData={selectedPassenger} editable={editable}/>
            <PassengerAuxilaryServiceInfo  key={selectedPassenger.id+'A'} passengerData={selectedPassenger} editable={editable}/>
          </div> : 
          <div className='passenger-info-unoccupied'>Selected Seat No- {selectedPassengerSeatNo} is Unoccupied</div>
                
      }</div>}
      {!selectedPassengerSeatNo&& <div className='passenger-info-unoccupied'> No Seats Selected </div>}
    </Fragment>
  )
}

const mapStateToProps =(state)=>{
  return{
    selectedPassengerSeatNo: selectSeatNoOfSelectedPassenger(state),
    mappedPassengerDataToSeats: selectMappedAllPassengerToSeat(state)
  }
}

export default connect(mapStateToProps)(PassengerInfoWithSeatNumber);

