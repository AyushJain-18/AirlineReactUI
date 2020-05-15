import React, { Fragment } from 'react';
import {passengerdashboardStyles} from './passengerDashBoard.styles.scss'

class PassengerDashBoard extends React.Component{
    render(){
        return(
            <Fragment>
                <div className={passengerdashboardStyles.name}>
                Passenger Dashboard component
                </div>
                
            </Fragment>
        )
    }
}

export default PassengerDashBoard;