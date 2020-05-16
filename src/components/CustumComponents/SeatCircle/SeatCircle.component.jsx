import React from 'react';
// import './SeatCircle.styles.scss'
import {CustumCircle} from './SeatCircle.styles'


const SeatCircle =({color='red',children})=>{
    
return <CustumCircle buttonColor= {`${color}`}>{children}</CustumCircle>
}

export default SeatCircle;