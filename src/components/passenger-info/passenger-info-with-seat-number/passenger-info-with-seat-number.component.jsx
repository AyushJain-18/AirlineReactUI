import React, {Fragment} from 'react';
import './passenger-info-with-seat-number.styles.scss';

import {connect} from 'react-redux';
import {mapPassengersToSeat} from '../../../utils/seat.utils';
import {
    selectSeatNoOfSelectedPassenger,
    selectAllPassengerData
} from '../../../store/allpassenger/allpassenger.select'
import PassengerDescription from '../passenger-discription/passenger-description.component';


const PassengerInfoWithSeatNumber = ({passengerSeatNo, passengerData})=>{
    const passengerMapedToSeats =  mapPassengersToSeat(passengerData);
    const selectedPassenger = passengerMapedToSeats[passengerSeatNo];

    return(
        <Fragment>
            {passengerSeatNo&& <div>{
                selectedPassenger? 
                    <PassengerDescription passengerData={selectedPassenger}/>
                        : 
                        <div className='passenger-info-unoccupied'>Selected Seat No- {passengerSeatNo} is Unoccupied</div>
                
                }</div>}
                {!passengerSeatNo&& <div className='passenger-info-unoccupied'> No Seats Selected </div>}
        </Fragment>
    )
}

const mapStateToProps =(state)=>{
    return{
         passengerSeatNo: selectSeatNoOfSelectedPassenger(state),
         passengerData: selectAllPassengerData(state)
    }
}

export default connect(mapStateToProps)(PassengerInfoWithSeatNumber);

