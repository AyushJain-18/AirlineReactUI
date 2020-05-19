import './seat-map.styles.scss';
import React,{useEffect, Fragment} from 'react';

import {connect} from 'react-redux';
import { fetchingAllPassengerStart } from '../../../store/allpassenger/allpassenger.action';
import { selectAllPassengerData } from '../../../store/allpassenger/allpassenger.select';
import SeatArrangement from '../seats-arrangement/seat-arrangement.component';
import SeatCircle from '../../CustumComponents/SeatCircle/SeatCircle.component';
import PassengerInfoWithSeatNumberComponent from '../../passenger-info/passenger-info-with-seat-number/passenger-info-with-seat-number.component';


const SaetMapComponent = ({airlineNo,startFetchingAllPassengersList,passengers, showPassenger})=>{
    const  isPassengerFetched=()=>(passengers.length!==0)
    const widthOfSeatLayout =showPassenger? '60%':'';
        useEffect(() => {
            if(!isPassengerFetched()){
                startFetchingAllPassengersList(airlineNo);
            }
        }, [airlineNo])
    return(
         <Fragment>
                        { isPassengerFetched()&& <div className='seat-map-container'>
                            <div className="seat-map-layout-container" style={{width:`${widthOfSeatLayout}`}}>
                                <div>SEAT-MAP</div>
                                <div className="seat-map-layout-discription">
                                        <div className='item-description'> Occupied<SeatCircle color='gainsboro'/></div>
                                        <div className='item-description'>Unoccupied <SeatCircle color='blanchedalmond'/> </div>
                                        <div className='item-description'>Infant<SeatCircle color='cornflowerblue'/> </div>
                                        <div className='item-description'>Wheelchair<SeatCircle color='coral'/> </div>
                                        <div className='item-description'>Infant & wheelchair<SeatCircle color='darkgrey'/></div>
                                </div>
                                <SeatArrangement passengers={passengers} totalSeats={60}/>
                            </div>
                            {showPassenger&&<PassengerInfoWithSeatNumberComponent passengersData={passengers} />} 
                        </div>
                }
        </Fragment>
    )
}
const mapStateToProps = (state)=>{
    return{
        passengers: selectAllPassengerData(state)
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        startFetchingAllPassengersList: (airlineNumber)=>dispatch(fetchingAllPassengerStart(airlineNumber))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SaetMapComponent);