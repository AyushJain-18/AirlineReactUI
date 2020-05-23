import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './admin-dashboard.styles.scss';

import {connect} from 'react-redux';

import PassengerAuxilarysDescriptionComponent from '../passenger-info/passenger-auxilarys-discription/passenger-auxilarys-description.component';
import PassengerGerenralInfo  from '../passenger-info/passenger-gerenral-info/passenger-general-info.component';

import{
    
} from '../../store/admin/admin.action'
import{
    selectEmptySeatsOfParticularFlight
} from '../../store/admin/admin.selector'


const PassengerInfo =({data, sno, emptySeats})=>{
    const{PNR, age, airlineNumber,firstName}= data;
    const[display, setdisplay]= useState(false);
    let width ='45%'
    let mqlMedium = window.matchMedia("all and (max-width: 770px)") // if(window.innerWidth === 700){
    let mqlSmall =  window.matchMedia("all and (max-width: 550px)")
 
        if(mqlSmall.matches){ width = '70%'; }
        if (mqlMedium.matches) { width = '60%';}   
   
    
    return(
        <Fragment>
            <div className='alp-passenger-container'>
                    <div className='alp-passenger-discription'>
                        <div className= 'alp-discription'>{sno +1}</div>
                        <div className= 'alp-discription'>{PNR}</div>
                        <div className= 'alp-discription'>{age}</div>
                        <div className= 'alp-discription'>{airlineNumber}</div>
                        <div className= 'alp-discription'>{firstName}</div>
                        <div className= 'alp-discription'>
                            { display && <span className='pointer' onClick={()=>setdisplay(false)} >&#10008;</span> }
                            { !display && <FontAwesomeIcon className='pointer' icon={faBars} onClick={()=>setdisplay(true)}/>}
                        </div>
                    </div>  
                 
        {display && 
                <div className= 'alp-update'>
                        <PassengerGerenralInfo passengerData={data} width={width} editable={true} unOccupiedSeats={emptySeats}/>
                        <PassengerAuxilarysDescriptionComponent passengerData={data} width={width} editable={true}/>
            </div>
        }
    </div>
  </Fragment>
  )
}
const mapStateToProps = (state, ownProps)=>({
    emptySeats: selectEmptySeatsOfParticularFlight(ownProps.data.airlineNumber, ownProps.data.seatNo)(state)
})
export default connect(mapStateToProps)(PassengerInfo);
