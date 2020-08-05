import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTrashAlt,faEdit,faTimes } from '@fortawesome/free-solid-svg-icons';

import './admin-dashboard.styles.scss';

import {connect} from 'react-redux';

import PassengerGerenralInfoForAdmin  from '../../passenger-info/passenger-info-for-admin/passenger-info-admin.component';

import{
  startDeletePassengers  
} from '../../../store/admin/admin.action'
import{
    selectEmptySeatsOfParticularFlight,
    selectAncillaryServicesOfPassengers
} from '../../../store/admin/admin.selector'

import{
    selectActiveAncillaryServicesForParticularFlight
} from '../../../store/ancillaryServices/ancillaryService.selectors';

import{
    getActiveAncillaryService
} from '../../../store/ancillaryServices/ancillaryService.util'

const AncillaryServices = props=> {
    let displayAncillaryServices= getActiveAncillaryService(props.ancillaryServices,props.activeAncillaryServicePerFlight)
    return(
        <div style={{margin: '2vw'}}>{ displayAncillaryServices.map((eachAncSer,index)=>{ let eachAncSerArray = eachAncSer && eachAncSer.split(':');
            return (
            <div className= 'ancliaryServices' key = {index+props.pnr}>
                <span style ={{minWidth:'30%' }}>{eachAncSerArray[0]}</span>
                <span style ={{minWidth:'30%' }}> :-</span>
                 <span style ={{minWidth:'30%' }}>{eachAncSerArray[1]}</span> 
            </div>)
             })}
        </div>
    )    
}

const PassengerInfo =({data, sno, emptySeats, ancillaryServices,onDeletePassenger, activeAncillaryServices})=>{
    const{ seatNo, airlineNumber,firstName,id,passport,PNR}= data;
    const[display, setdisplay]= useState(false);
    const[displayAncSer, setdisplayAncSer]= useState(false);
    // console.log('ancillaryServices',activeAncillaryServices);    
    return(
        <Fragment>
            <div className='alp-passenger-container'>
                    <div className='alp-passenger-discription'>
                        <div className= 'alp-discription'>{sno +1}</div>
                        <div className= 'alp-discription'>{firstName}</div>
                        <div className= 'alp-discription'>{seatNo}</div>
                        <div className= 'alp-discription'> {ancillaryServices.length === 0? 
                                <div>No Ancillary Selected</div>:
                                 <FontAwesomeIcon icon ={displayAncSer?faTimes:faBars} 
                                                    onClick ={()=> displayAncSer? setdisplayAncSer(false):setdisplayAncSer(true)}
                                                    style={{cursor: 'pointer'}}
                                                    />}
                        </div>                           
                        <div className= 'alp-discription'>
                            <FontAwesomeIcon icon ={faTrashAlt} className='pointer' 
                                onClick={()=>onDeletePassenger(airlineNumber,id)}/>
                        </div>
                        <div className= 'alp-discription'>
                            { display && <span className='pointer'style={{color:'red'}} 
                                         onClick={()=>setdisplay(false)}>
                                             &#10008;
                                             </span>
                            }
                            { !display && <FontAwesomeIcon className='pointer' icon={faEdit} 
                                            onClick={()=>setdisplay(true)}/>
                            }
                        </div>
                       
                    </div>   
    {displayAncSer && 
        <div style ={{boxShadow:'10px 10px 10px darkgrey', background: 'aliceblue', margin: '1vw 5vw ', width:'90%'}}>
        <AncillaryServices key ={data.PNR}ancillaryServices={ancillaryServices} pnr={data.PNR}
                           activeAncillaryServicePerFlight ={activeAncillaryServices[0].ancillaryServices} />
        </div>
    }                          
    {display && 
    <div style ={{boxShadow:'10px 10px 10px darkgrey', margin: '20px 0px'}}>
      <PassengerGerenralInfoForAdmin passengerData={data} unOccupiedSeats={emptySeats} isAdd={false}/>
     </div>
    }
    </div>
  </Fragment>
  )
}

const mapStateToProps = (state, ownProps)=>({
    emptySeats: selectEmptySeatsOfParticularFlight(ownProps.data.airlineNumber, ownProps.data.seatNo)(state),
    ancillaryServices : selectAncillaryServicesOfPassengers(ownProps.data.PNR)(state),
    activeAncillaryServices : selectActiveAncillaryServicesForParticularFlight(ownProps.data.airlineNumber)(state)
})
const mapDispatchToProps = dispatch =>({
    onDeletePassenger: (flightNo, id)=>dispatch(startDeletePassengers(flightNo, id))
})
export default connect(mapStateToProps,mapDispatchToProps)(PassengerInfo);
