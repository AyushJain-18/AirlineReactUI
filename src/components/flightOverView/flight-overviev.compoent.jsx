import React from 'react'

import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import Flight from  '@material-ui/icons/Flight';
 
import CustumButton from '../CustumComponents/CustumButon/custumButton.component';
import {selectUserSignInStatus,selectSignUserType} from '../../store/user/user.selector'


const FilghtOverview = ({FlightSummaryDetails,styles,isUserSignIn,userType})=>{
    const {
            name,
            airlineNumber,
            from,
            destination,
            price,
            takeOffTime,
            landingTime,
            totalSeats,
            type,
            date} = FlightSummaryDetails;
      const{FlightContainer,FlightDetails,FlightName,FlightButton} = styles;      
            console.log('USER TYPE', userType)
    return(
        <FlightContainer>
                <FlightName>
                        <Flight/>
                        {name}
                </FlightName>
                        
                <FlightDetails>
                        <div> FLIGHT-TYPE:   &nbsp; {type} </div>

                        <div>Airline Number:  &nbsp; {airlineNumber}</div>

                        <div>AirLine Price:  &nbsp; {price} </div>

                        <div>From: &nbsp;  <FlightTakeoff/> &nbsp; {from}</div>

                        <div>Departure Time:  &nbsp; {takeOffTime}</div>

                        <div>Total Seats:&nbsp; {totalSeats}</div>

                        <div>To: &nbsp;  <FlightLandIcon/> &nbsp; {destination}</div>

                        <div> Arrivial Time:  &nbsp; {landingTime}</div>
                        <FlightButton> {isUserSignIn?  
                                <Link to={`/${userType}`}>
                                       <CustumButton inverted >
                                                {userType}
                                        </CustumButton>
                                </Link>
                                        :
                                        <Link to='/signin'>Sign In to Continue</Link>
                                }
                        </FlightButton>
                </FlightDetails>
        </FlightContainer>
    )
}
const mapStateToProps = (state)=>{
        return{
                isUserSignIn:selectUserSignInStatus(state),
                userType: selectSignUserType(state)
        }
}

export default connect(mapStateToProps)(FilghtOverview);
