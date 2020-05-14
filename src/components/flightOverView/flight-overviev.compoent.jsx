import React from 'react'
import './flight-overview.styles.scss'

import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import Flight from  '@material-ui/icons/Flight';
 

import CustumButton from '../CustumComponents/CustumButon/custumButton.component';

import {getRequest} from '../../utils/api.calls'

const FilghtOverview = ({FlightSummaryDetails})=>{
    const {
            name,
            airlineNumber,
            from,
            destination,
            price,
            takeOffTime,
            landingTime,
            totalSeats,
            type,
            date} = FlightSummaryDetails;
            const fetchFlighDetails = ()=>{
                    getRequest('flight').then(res=>{
                            console.log(res);
                            console.log('asas');
                        })
            }
    return(
            <div className = 'flight-container'>
                <div className = 'flight-name-info'>
                        <Flight/>
                        <div className='flight-name'>{name}</div>
                </div>
                        
                <div className= 'flight-detail-info'>
                        <div className='flight-type'> 
                                    FLIGHT-TYPE:   &nbsp; {type}
                                    
                        </div>
                        <div className='flight-number'>
                              Airline Number:  &nbsp; {airlineNumber}
                        </div>
                        <div className = 'flight-price'>
                                AirLine Price:  &nbsp; {price} 
                        </div>

                        <div className='flight-from'>
                                From: &nbsp;  <FlightTakeoff/> &nbsp; {from}
                        </div>
                        <div className='flightdeparture-time'>
                            Departure Time:  &nbsp; {takeOffTime}
                        </div>
                        <div className='flight-total-seats'>
                            Total Seats:&nbsp; {totalSeats}
                        </div>
                        <div className='flight-to'>
                            To: &nbsp;  <FlightLandIcon/> &nbsp; {destination}
                        </div>
                        <div className='flight-arrivial-time'>
                             Arrivial Time:  &nbsp; {landingTime}
                        </div>
                        <div className='flight-buttons'>
                            
                                <CustumButton inverted onClick = {fetchFlighDetails} >Admin</CustumButton>
                            
                        </div>
                </div>
            </div>
    )
}

export default FilghtOverview;
