import React from 'react';

import {connect} from 'react-redux';

import {selectFlightForSelectedPassenger} from '../../store/flight/flight.selector';

import FilghtOverview from '../flightOverView/flight-overviev.compoent';
import {FlightContainer,FlightDetails,FlightName,FlightButton} from './flight-details.styles'

class FlightDetailsComponent extends React.Component{
    render(){
       //  const {airlineNo} = this.props;
       const {flightInfo} = this.props;
       const flightOverViewStyles ={FlightContainer,FlightDetails,FlightName,FlightButton}
            return(
                <FilghtOverview  key={flightInfo.airlineNo} 
                    FlightSummaryDetails ={flightInfo}
                    styles={flightOverViewStyles}
                    />
            )
    }
}

const mapStateToProps =(state, ownProps)=>{
    return{
            flightInfo: selectFlightForSelectedPassenger(ownProps.airlineNo)(state)
    }
}

export default connect(mapStateToProps)(FlightDetailsComponent);