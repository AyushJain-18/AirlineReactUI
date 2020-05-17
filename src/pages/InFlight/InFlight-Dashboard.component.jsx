import React, { Fragment } from 'react';

import ToggleTab from '../../components/CustumComponents/Toggle-tab/ToggleTab.compoent'

import {connect} from 'react-redux';
import {selectPassenger} from '../../store/user/user.selector';

import FlightDetailsComponent from './flight-deatils/flight-details.component'
import SeatMapContainer from '../../containers/seat-map-conatiner/seat-map.container';


class InFlightDashBoardComponent extends React.Component{
    
    render(){
        const {passenger} =this.props;
        let airlineNo ='';
        if(passenger){
             airlineNo = passenger.airlineNumber;
        }
        return(
            <Fragment>
                {passenger&& 
                  <ToggleTab 
                    componentsArray={[FlightDetailsComponent,SeatMapContainer]}
                    labelArray={['Flight Info','Seat-Map']}
                    propsArray={[{airlineNo},{airlineNo}]} />
                }
            </Fragment>
        )
    }
}
const mapStateToprops = (state)=>{
    return{
        passenger: selectPassenger(state)
    }
}

export default connect(mapStateToprops)(InFlightDashBoardComponent);