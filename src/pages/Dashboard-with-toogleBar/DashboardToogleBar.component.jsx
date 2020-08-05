import React, { Fragment } from 'react';

import ToggleTab from '../../components/CustumComponents/Toggle-tab/ToggleTab.compoent'

import {connect} from 'react-redux';
import {selectPassenger,selectSignUserType,selectFlightNo} from '../../store/user/user.selector';

import FlightDetailsComponent from '../flight-deatils/flight-details.component'
import SeatMapContainer from '../../containers/seat-map-conatiner/seat-map.container';
import AuxilaryServicesComponent from '../../components/auxilary-service/auxilary-service-display/auxlilary-service.component';
import { withRouter,Redirect } from 'react-router-dom';
import WebCheckInStepperComponent from '../../components/stepper-web-check-in/web-check-in.component';
import DisplayPassengersList from '../../components/admin-dashboard/passenger-details/displayPassengerList.component';

class DashboardToogleBarComponent extends React.Component{
    
    render(){
        //console.log('props', this.props.location)
        const {passenger, userType} =this.props;
        let airlineNo ='';
        let showPassenger = true;
        if(passenger){
             airlineNo = passenger.airlineNumber;
        }
        if(userType!=='In-flight'){
            airlineNo = this.props.flightNo;
            console.log('airlineNo',airlineNo)
        }
        return(
            <Fragment>
                {/* 1.In-fkight dashboard */}
                {passenger&& userType==='In-flight'&&
                  <ToggleTab 
                    componentsArray={[FlightDetailsComponent,SeatMapContainer,AuxilaryServicesComponent]}
                    labelArray={['Flight Info','Seat-Map','Auxilary-Service']}
                    propsArray={[{airlineNo},{airlineNo},{passenger}]} 
                    keyArray={[`info${airlineNo}`,`seat${airlineNo}`, ,`aux${airlineNo}`]}
                    />
                }
                {!passenger&& userType==='In-flight'&&<div> ADMIN HAD REMOVED YOUR ACCOUNT</div>}

                {
                    userType==='Crew'&& 
                    <Fragment>
                        {!airlineNo?<Redirect to='/'/>:
                        <ToggleTab key ={airlineNo} 
                        componentsArray={[DisplayPassengersList,SeatMapContainer,WebCheckInStepperComponent]}
                        labelArray={['Passenger List','Seat Map','Web-Check-In']}
                        propsArray={[{airlineNo},{airlineNo,showPassenger }]} // editable:{showPassenger}
                        keyArray={[`info${airlineNo}`,`seat${airlineNo}`, `webcheckin${airlineNo}`]}
                        />
                         }
                     </Fragment>
                }
                 
            { userType==='Admin'&&<Fragment>{airlineNo ? <DisplayPassengersList  airlineNo={airlineNo}/>:<Redirect to = '/' />}</Fragment>}
                
            </Fragment>
        )
    }
}
const mapStateToprops = (state)=>{
    return{
        passenger: selectPassenger(state),
        userType: selectSignUserType(state),
        flightNo: selectFlightNo(state)
    }
}

export default withRouter( connect(mapStateToprops)(DashboardToogleBarComponent));