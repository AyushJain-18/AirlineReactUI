import React, { Fragment } from 'react';

import ToggleTab from '../../components/CustumComponents/Toggle-tab/ToggleTab.compoent'

import {connect} from 'react-redux';
import {selectPassenger} from '../../store/user/user.selector';

import FlightDetailsComponent from './flight-deatils/flight-details.component'
import SeatMapContainer from '../../containers/seat-map-conatiner/seat-map.container';
import AuxilaryServicesComponent from '../../components/auxilary-service/auxilary-service-display/auxlilary-service.component';



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
                    componentsArray={[FlightDetailsComponent,SeatMapContainer,AuxilaryServicesComponent]}
                    labelArray={['Flight Info','Seat-Map','Auxilary-Service']}
                    propsArray={[{airlineNo},{airlineNo},{passenger}]} />
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