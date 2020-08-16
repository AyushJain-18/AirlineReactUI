import './seat-map.styles.scss';
import React,{useEffect, Fragment} from 'react';

import {connect} from 'react-redux';
// selector
import { selectAllPassengerData,
     selectSeatNoOfSelectedPassenger, selectMappedAllPassengerToSeat } 
     from '../../../store/allpassenger/allpassenger.select';
// actions 
import { fetchingAllPassengerStart } from '../../../store/allpassenger/allpassenger.action';
import {startPassengerInfoUpdate} from   '../../../store/user/user.actions';
// components
import SeatArrangement from '../seats-arrangement/seat-arrangement.component';
import SeatCircle from '../../CustumComponents/SeatCircle/SeatCircle.component';
import PassengerInfoWithSeatNumber from '../../passenger-info/passenger-info-with-seat-number/passenger-info-with-seat-number.component';
import CustumButton from '../../CustumComponents/CustumButon/custumButton.component';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';


const SaetMapComponent = ({airlineNo,showPassenger,editable, isWebCheckIn ,showNewSeatSelectedColor,
    startFetchingAllPassengersList, passengers,selectedPassengerSeatNo, mappedPassengerDataToSeats,startUndoCheckin})=>{
    const  isPassengerFetched=()=>(passengers.length!==0);
    const  flightNoChanged=()=>{
       return  (passengers.length!==0 && passengers[0].PNR.split('X')[0]) === (airlineNo)}
    const widthOfSeatLayout =showPassenger? '60%':'';
    let selectedPassenger= mappedPassengerDataToSeats[selectedPassengerSeatNo];
    const onUndoCheckIn = ()=>{
        const {id,airlineNumber,PNR} = selectedPassenger;
        const updatedData = {...selectedPassenger, seatNo: ''}
        startUndoCheckin(id,airlineNumber,updatedData, 'Crew',PNR)
    }
        useEffect(() => {
            if(!flightNoChanged()){
                startFetchingAllPassengersList(airlineNo);
            }
        })
    return(
         <Fragment>
                        { isPassengerFetched()&& <div className='seat-map-container' style ={{width: isWebCheckIn?"100%": "90%"}}>
                            {/* Seat-Map here  */}
                            <div className="seat-map-layout-container" style={{width:`${widthOfSeatLayout}`}}>
                                <div>Flight No-{airlineNo}</div>
                                <div className="seat-map-layout-discription">
                                        <div className='item-description'> Occupied<SeatCircle color='gainsboro'/></div>
                                        <div className='item-description'>Unoccupied <SeatCircle color='blanchedalmond'/> </div>
                                        <div className='item-description'>Infant<SeatCircle color='cornflowerblue'/> </div>
                                        <div className='item-description'>Wheelchair<SeatCircle color='coral'/> </div>
                                        <div className='item-description'>Infant & wheelchair<SeatCircle color='darkgrey'/></div>
                                        {isWebCheckIn && <div className='item-description'>Selected New Seat<SeatCircle color='lightcoral'/></div>  }
                                </div>
                                <SeatArrangement passengers={passengers} totalSeats={60}  isWebCheckIn={isWebCheckIn} />
                            </div>
                            {/* Passenger details with undo-check-in option here option  */}
                            {showPassenger && <div>  
                                <div className= 'undo-button'>
                                {selectedPassengerSeatNo? selectedPassenger?<CustumButton onClick={onUndoCheckIn} >  Undo Check-in </CustumButton>:null: <h3> 'Select Seat-no to Undo Check-in' </h3>}
                                </div>
                             <PassengerInfoWithSeatNumber editable ={editable}/> 
                            </div>} 
                        </div>
                }
        </Fragment>
    )
}
const mapStateToProps = (state)=>{
    return{
        passengers: selectAllPassengerData(state),
        selectedPassengerSeatNo: selectSeatNoOfSelectedPassenger(state),
        mappedPassengerDataToSeats: selectMappedAllPassengerToSeat(state)
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        startFetchingAllPassengersList: (airlineNumber)=>dispatch(fetchingAllPassengerStart(airlineNumber)),
        startUndoCheckin : (id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR)=>dispatch(startPassengerInfoUpdate(id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SaetMapComponent);