import React, { Fragment } from 'react';

import ToggleTab from '../../components/CustumComponents/Toggle-tab/ToggleTab.compoent'

import {connect} from 'react-redux';
import {selectPassenger,selectSignUserType} from '../../store/user/user.selector';

import FlightDetailsComponent from '../flight-deatils/flight-details.component'
import SeatMapContainer from '../../containers/seat-map-conatiner/seat-map.container';
import AuxilaryServicesComponent from '../../components/auxilary-service/auxilary-service-display/auxlilary-service.component';
import { withRouter,Redirect } from 'react-router-dom';



class DashboardToogleBarComponent extends React.Component{
    
    render(){
        console.log('props', this.props.location)
        const {passenger, userType} =this.props;
        let airlineNo ='';
        if(passenger){
             airlineNo = passenger.airlineNumber;
        }
        if(userType!=='In-flight'){
            airlineNo = this.props.location.FlightNumber;
        }
        return(
            <Fragment>
                {/* 1.In-fkight dashboard */}
                {passenger&& userType==='In-flight'&&
                  <ToggleTab 
                    componentsArray={[FlightDetailsComponent,SeatMapContainer,AuxilaryServicesComponent]}
                    labelArray={['Flight Info','Seat-Map','Auxilary-Service']}
                    propsArray={[{airlineNo},{airlineNo},{passenger}]} />
                }

                {
                    userType==='Crew'&& 
                    <Fragment>
                        {!airlineNo?<Redirect to='/'/>:
                        <ToggleTab componentsArray={[FlightDetailsComponent,SeatMapContainer]}
                        labelArray={['Flight Info','Seat-Map']}
                        propsArray={[{airlineNo},{airlineNo}]} />
                         }
                     </Fragment>
                }
                 
                {
                    userType==='Admin'
                }
            </Fragment>
        )
    }
}
const mapStateToprops = (state)=>{
    return{
        passenger: selectPassenger(state),
        userType: selectSignUserType(state)
    }
}

export default withRouter( connect(mapStateToprops)(DashboardToogleBarComponent));