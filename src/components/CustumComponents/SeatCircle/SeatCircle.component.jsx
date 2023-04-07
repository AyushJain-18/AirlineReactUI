import React from 'react';
// import './SeatCircle.styles.scss'
import {CustumCircle} from './SeatCircle.styles'


const SeatCircle =({color='red',children ,otherProps,isSeatOccupied})=>{
  isSeatOccupied = isSeatOccupied? 'not-allowed':'pointer'
    
  return <CustumCircle {...otherProps} buttonColor= {`${color}`} pointerValue={`${isSeatOccupied}`}>{children}</CustumCircle>
}

export default  SeatCircle;