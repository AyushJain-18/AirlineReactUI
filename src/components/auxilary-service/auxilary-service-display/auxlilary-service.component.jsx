import React from 'react'
import './auxilary-service.styles.scss';

import PassengerAuxilaryServiceInfo from '../../passenger-info/passenger-auxilarys-discription/passenger-auxilarys-description.component'
//import PassengerGerenralInfo from '../../passenger-info/passenger-gerenral-info/passenger-general-info.component';

const AuxilaryServicesComponent = ({passenger})=>{
  return(
    <div className='aux-ser-container'>
      <PassengerAuxilaryServiceInfo passengerData={passenger} editable/>
    </div>
  )
}

export default AuxilaryServicesComponent
