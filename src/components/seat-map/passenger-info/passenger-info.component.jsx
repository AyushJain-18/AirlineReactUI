import React, {Fragment} from 'react';
import './passenger-info.styles.scss';

import {connect} from 'react-redux';
import {mapPassengersToSeat} from '../../../utils/seat.utils';
import {
    selectSeatNoOfSelectedPassenger,
    selectAllPassengerData
} from '../../../store/allpassenger/allpassenger.select'
const PassengerComponent = ({passengerSeatNo, passengerData})=>{
    const passengerMapedToSeats =  mapPassengersToSeat(passengerData);
    const selectedPassenger = passengerMapedToSeats[passengerSeatNo];

    return(
        <Fragment>
            {passengerSeatNo&& <div>{
                selectedPassenger? 
                    <div className= 'passenger-info-container'>
                            <div className= 'passenger-info-heading'>Passenger Info</div>
                            <div className= 'passenger-info-items'> <span>FirstName</span> <span>{selectedPassenger.firstName}</span> </div>
                            <div className= 'passenger-info-items'> <span>LastName</span> <span>{selectedPassenger.lastName}</span> </div>
                            <div className= 'passenger-info-items'> <span>Age</span> <span>{selectedPassenger.age}</span> </div>
                            <div className= 'passenger-info-items'> <span>ContactNumber</span> <span>{selectedPassenger.contactNumber}</span> </div>
                            <div className= 'passenger-info-items'> <span>SeatNo</span> <span>{selectedPassenger.seatNo}</span> </div> 
                            <div className= 'passenger-info-items'> <span>PNR</span><span>{selectedPassenger.PNR}</span> </div>
                            <div className= 'passenger-info-items'> <span>Luggage</span> <span>{selectedPassenger.luggage?selectedPassenger.luggage:'N/A' }</span> </div>
                            <div className= 'passenger-info-items'> <span>Meal</span> <span>{selectedPassenger.meal?selectedPassenger.meal:'N/A'}</span> </div>
                            <div className= 'passenger-info-items'> <span>PayPerView</span> <span>{selectedPassenger.PayPerView?selectedPassenger.PayPerView:'N/A'}</span> </div>
                            <div className= 'passenger-info-items'> <span>With Infants</span> <span>{selectedPassenger.infants?'Yes':'No'}</span> </div>
                            <div className= 'passenger-info-items'> <span>With WheelChair</span> <span>{selectedPassenger.wheelChair?'Yes':'No'}</span> </div>
                    </div>
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

export default connect(mapStateToProps)(PassengerComponent);

