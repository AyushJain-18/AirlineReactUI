import React, { Fragment } from 'react';
import './InFlight-Dashboard.styles.scss';

import ToggleTab from '../CustumComponents/Toggle-tab/ToggleTab.compoent'

import {connect} from 'react-redux';
import {selectPassenger} from '../../store/user/user.selector';

import FlightDetailsComponent from '../flight-deatils/flight-details.component'


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
                    componentsArray={[FlightDetailsComponent]}
                    labelArray={['Flight Info']}
                    propsArray={[{airlineNo}]} />
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