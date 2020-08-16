import React from 'react';
import './dashboard.page.styles.scss'

import {connect} from 'react-redux';

import  FilghtOverview  from '../../components/flightOverView/flight-overviev.compoent';
import Switch from '@material-ui/core/Switch';

import {FlightContainer,FlightDetails,FlightName,FlightButton,FlightDetailsEachComponent} from './flight-over.styles';

import {setCrewView} from '../../store/allpassenger/allpassenger.action';
import {selectCrewView} from '../../store/allpassenger/allpassenger.select';
import {selectFlights} from '../../store/flight/flight.selector';
import { selectPassenger, selectSignUserType } from '../../store/user/user.selector';

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            toogleButton: props.crewView
        }
    }
    onChangeToogleButton=() =>{
            if(this.state.toogleButton === 'CREW'){
                this.setState({toogleButton: 'IN-FLIGHT'},()=> this.props.setCrewView(this.state.toogleButton))
            } else{
                this.setState({toogleButton: 'CREW'},()=> this.props.setCrewView(this.state.toogleButton))
            }
           
    }
    render(){
        const { flights,signInUserType} = this.props;
        const flightOverViewStyles ={FlightContainer,FlightDetails,FlightName,FlightButton,FlightDetailsEachComponent}
        return(
            <div className='dashboard'>
                {signInUserType && signInUserType === 'Crew' && <div style={{margin: "40px 0px"}}>
                    <span>In Flight View</span>
                        <Switch checked={this.state.toogleButton === 'CREW'} onChange={this.onChangeToogleButton} name="inFlightToggleBUtton"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}/>
                   <span>Check In View</span>
                </div>
                }
                {
                    flights.map(flight => {
                           return <FilghtOverview key={flight.airlineNumber} 
                                        styles ={flightOverViewStyles}FlightSummaryDetails={flight}/>
                      })
                }
            </div>
        )
    }
}

const mapStateToProps = (state,ownProp)=>{
    return{
        flights:   selectFlights(state),
        passenger: selectPassenger(state),
        signInUserType: selectSignUserType(state),
        crewView: selectCrewView(state)
    }
}
const mapDispatchToProp = dispatch =>{
    return{
        setCrewView: (view)=>dispatch(setCrewView(view))
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(Dashboard); 