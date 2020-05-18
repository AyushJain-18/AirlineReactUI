import React from 'react'

import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import Flight from  '@material-ui/icons/Flight';
 
import CustumButton from '../CustumComponents/CustumButon/custumButton.component';
import {selectUserSignInStatus,selectSignUserType} from '../../store/user/user.selector';
import { clearUserError } from '../../store/user/user.actions';



const FilghtOverview = ({FlightSummaryDetails,styles,isUserSignIn,userType,clearUserError})=>{
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
      const{FlightContainer,FlightDetails,FlightName,FlightButton, FlightDetailsEachComponent} = styles;      
            console.log('USER TYPE', userType)
    return(
        <FlightContainer>
                <FlightName>
                        <Flight/>
                        {name}
                </FlightName>
                        
                <FlightDetails>
                        <FlightDetailsEachComponent> <span>FLIGHT-TYPE:</span><span>{type}</span></FlightDetailsEachComponent>

                        <FlightDetailsEachComponent><span>Airline Number:</span> <span>{airlineNumber}</span></FlightDetailsEachComponent>

                        <FlightDetailsEachComponent> <span> AirLine Price:  </span>  <span> {price} </span></FlightDetailsEachComponent>

                        <FlightDetailsEachComponent><span> From: </span><span><FlightTakeoff/>&nbsp;{from} </span></FlightDetailsEachComponent>

                        <FlightDetailsEachComponent> <span>To: </span><span><FlightLandIcon/> &nbsp;{destination}</span> </FlightDetailsEachComponent>

                        <FlightDetailsEachComponent><span>Total Seats:</span><span>{totalSeats}</span></FlightDetailsEachComponent>

                        <FlightDetailsEachComponent><span> Departure Time: </span> <span>{takeOffTime}</span> </FlightDetailsEachComponent>

                        <FlightDetailsEachComponent><span>Arrivial Time: </span>  <span>{landingTime}</span></FlightDetailsEachComponent>
                        <FlightButton> {isUserSignIn?  
                                <Link to= {
                                        {
                                          pathname: `/${userType}`,
                                          FlightNumber: airlineNumber
                                        }
                                }
                                >
                                       <CustumButton inverted >
                                                {userType}
                                        </CustumButton>
                                </Link>
                                        :
                                        <Link to='/signin' onClick= {clearUserError}>Sign In to Continue</Link>
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
const mapDispatchToProps =(dispatch)=>{
        return{
                clearUserError:()=>dispatch(clearUserError())
        }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilghtOverview);
