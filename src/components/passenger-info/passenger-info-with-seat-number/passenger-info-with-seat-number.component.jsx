import React, {Fragment,useEffect} from 'react';
import './passenger-info-with-seat-number.styles.scss';

import {connect} from 'react-redux';
import {mapPassengersToSeat} from '../../../utils/seat.utils';
import {
    selectSeatNoOfSelectedPassenger,
    selectAllPassengerData
} from '../../../store/allpassenger/allpassenger.select'
import PassengerAuxilaryServiceInfo from '../passenger-auxilarys-discription/passenger-auxilarys-description.component';
import PassengerGerenralInfo from '../passenger-gerenral-info/passenger-general-info.component';


const PassengerInfoWithSeatNumber = ({passengerSeatNo, passengerData,editable})=>{
    const passengerMapedToSeats =  mapPassengersToSeat(passengerData);
    let selectedPassenger= passengerMapedToSeats[passengerSeatNo];
    console.log('render');
    // useEffect(()=>{
        
    //     selectedPassenger= passengerMapedToSeats[passengerSeatNo];
    // },[passengerSeatNo])
   

    return(
        <Fragment>
            {passengerSeatNo&& <div>{
                selectedPassenger? 
                    <div className= 'passenger-info-container'>
                        <PassengerGerenralInfo passengerData={selectedPassenger} editable={editable}/>
                        <PassengerAuxilaryServiceInfo passengerData={selectedPassenger} editable={editable}/>
                    </div> : 
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

