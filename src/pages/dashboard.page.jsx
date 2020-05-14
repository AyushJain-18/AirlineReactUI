import React from 'react';
import './dashboard.page.styles.scss'

import {connect} from 'react-redux';

import  FilghtOverview  from '../components/flightOverView/flight-overviev.compoent';
import {selectFlights } from '../store/flight/flight.selector';

class Dashboard extends React.Component {
    constructor(){
        super()
    }
    
    render(){
        console.log('Renders', this.props.flights)
        const { flights } = this.props;
        return(
            <div className='dashboard'>
                {
                    flights.map(flight => 
                            <FilghtOverview key={flight.airlineNumber} FlightSummaryDetails={flight}
                        />)
                }
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        flights: selectFlights(state)
    }
}
export default connect(mapStateToProps)(Dashboard); 