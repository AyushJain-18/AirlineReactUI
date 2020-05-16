import React from 'react';
import './dashboard.page.styles.scss'

import {connect} from 'react-redux';

import  FilghtOverview  from '../components/flightOverView/flight-overviev.compoent';
import {FlightContainer,FlightDetails,FlightName,FlightButton} from './flight-over.styles'
import {selectFlights} from '../store/flight/flight.selector';
import { selectPassenger } from '../store/user/user.selector';

class Dashboard extends React.Component {
    constructor(){
        super()
    }
    
    render(){
        console.log('Renders', this.props.flights)
        const { flights,passenger} = this.props;
        const flightOverViewStyles ={FlightContainer,FlightDetails,FlightName,FlightButton}
        return(
            <div className='dashboard'>
                {
                    flights.map(flight => {
                        if(!passenger){
                           return <FilghtOverview 
                                        key={flight.airlineNumber} 
                                        styles ={flightOverViewStyles}
                                        FlightSummaryDetails={flight}/>
                        }else if(passenger && passenger.airlineNumber === flight.airlineNumber ){
                            return <FilghtOverview key={flight.airlineNumber} 
                                                styles ={flightOverViewStyles}
                                                FlightSummaryDetails={flight}/>
                        }
                      })
                    }
            </div>
        )
    }
}

const mapStateToProps = (state,ownProp)=>{
    return{
        flights: selectFlights(state),
        passenger: selectPassenger(state)
    }
}
export default connect(mapStateToProps)(Dashboard); 