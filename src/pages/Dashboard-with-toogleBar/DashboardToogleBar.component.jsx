import React, { Fragment } from 'react';

import ToggleTab from '../../components/CustumComponents/Toggle-tab/ToggleTab.compoent'

import {connect} from 'react-redux';
import {selectPassenger,selectSignUserType,selectFlightNo} from '../../store/user/user.selector';
import {selectCrewView} from '../../store/allpassenger/allpassenger.select';

import FlightDetailsComponent from '../flight-deatils/flight-details.component'
import SeatMapContainer from '../../containers/seat-map-conatiner/seat-map.container';
import AuxilaryServicesComponent from '../../components/auxilary-service/auxilary-service-display/auxlilary-service.component';
import { withRouter,Redirect } from 'react-router-dom';
import WebCheckInStepperComponent from '../../components/stepper-web-check-in/web-check-in.component';
import DisplayPassengersList from '../../components/admin-dashboard/passenger-details/displayPassengerList.component';

class DashboardToogleBarComponent extends React.Component{
    
    render(){
        //console.log('props', this.props.location)
        const {passenger, userType,crewView} =this.props;
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
                {userType==='Crew' &&  crewView ==='IN-FLIGHT' &&
                  <ToggleTab 
                    componentsArray={[FlightDetailsComponent,SeatMapContainer]}
                    labelArray={['Flight Info','Seat-Map','Auxilary-Service']}
                    propsArray={[{airlineNo},{airlineNo,showPassenger,editable: true, displaySpecialMeal:true}]} 
                    keyArray={[`info${airlineNo}`,`seat${airlineNo}`]}
                    />
                }
                {/* {!passenger&& userType==='In-flight'&&<div> ADMIN HAD REMOVED YOUR ACCOUNT</div>} */}

                {userType==='Crew'&&  crewView ==='CREW' &&
                    <Fragment>
                        {!airlineNo?<Redirect to='/'/>:
                        <ToggleTab key ={airlineNo} 
                        componentsArray={[DisplayPassengersList,SeatMapContainer,WebCheckInStepperComponent]}
                        labelArray={['Passenger List','Undo Check in','Web-Check-In']}
                        propsArray={[{airlineNo},{airlineNo,showPassenger,editable: true, undoButton: true }]} // editable:{showPassenger}
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
        flightNo: selectFlightNo(state),
        crewView: selectCrewView(state)
    }
}

export default withRouter( connect(mapStateToprops)(DashboardToogleBarComponent));