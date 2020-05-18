import React from 'react'
import './auxilary-service.styles.scss';

import {PassengerAuxilaryServiceInfo}from '../../passenger-info/passenger-discription/passenger-description.component'

const AuxilaryServicesComponent = ({passenger})=>{
    return(
        <div className='aux-ser-container'>
                <PassengerAuxilaryServiceInfo passengerData={passenger} editable/>
        </div>
    )
}

export default AuxilaryServicesComponent
