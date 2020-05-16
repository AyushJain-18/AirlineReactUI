import React, { Fragment } from 'react';
import './passengerInfo.styles.scss';

import {connect} from 'react-redux';
import {selectPassenger} from '../../store/user/user.selector';


class PassengerInfoComponent extends React.Component{
    render(){
        const {passenger} = this.props
        return(
            <Fragment>
            {passenger &&  
                <div className='xya'>
                Passenger Dashboard component
                {passenger.name}
                </div>
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

export default connect(mapStateToprops)(PassengerInfoComponent);