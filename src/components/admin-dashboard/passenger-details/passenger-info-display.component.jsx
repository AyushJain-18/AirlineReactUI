import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTrashAlt,faEdit,faTimes } from '@fortawesome/free-solid-svg-icons';

import './admin-dashboard.styles.scss';

import {connect} from 'react-redux';

import PassengerGerenralInfoForAdmin  from '../../passenger-info/passenger-info-for-admin/passenger-info-admin.component';
import CustumButton from '../../CustumComponents/CustumButon/custumButton.component';
import DisplayValue from '../../CustumComponents/custum-select/custumSelect.component';
 
import{startDeletePassengers } from '../../../store/admin/admin.action';
import {startPassengerInfoUpdate} from '../../../store/user/user.actions';

import{
    selectEmptySeatsOfParticularFlight,
    selectAncillaryServicesOfPassengers
} from '../../../store/admin/admin.selector'
import { selectSignUserType } from '../../../store/user/user.selector';
import { selectAllPassengerSeatUpdateMessage } from '../../../store/allpassenger/allpassenger.select';
import{ selectFilghtData} from '../../../store/ancillaryServices/ancillaryService.selectors';

import{
    getActiveAncillaryService
} from '../../../store/ancillaryServices/ancillaryService.util'


const AncillaryServices = props=> {
    let displayAncillaryServices= getActiveAncillaryService(props.ancillaryServices,props.userFlightData)
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

const PassengerInfo =({data, sno, emptySeats, ancillaryServices,onDeletePassenger, userFlightData,userType, updatePassengerSeatNo,updateMsg})=>{
    const{ seatNo, airlineNumber,firstName,id,passport,PNR}= data;
    const[display, setdisplay]= useState(false);
    const[displayAncSer, setdisplayAncSer]= useState(false);
    const[isSeatNoUpdated, setisSeatNoUpdated]= useState(false);
    const[newSeat, setnewSeat] = useState('');
    const[isUpdateButtonClicked, setUpdateButtonClicked] = useState(false);

    const activeAncillaryService = getActiveAncillaryService(ancillaryServices,userFlightData);
    let otherSeatOptions= emptySeats.reduce((acc, eachUnOccupiedSeats)=>([ ...acc,{'value': eachUnOccupiedSeats}]),[]);
    if(!!!seatNo){
        otherSeatOptions.push({'value':'N/A'});    
    }
    otherSeatOptions.reverse();


    useEffect(
        ()=>{
            if(newSeat!==''){
                setUpdateButtonClicked(false);
                 setisSeatNoUpdated(true);
                };
            if(newSeat==='N/A'){
                setisSeatNoUpdated(false);
            }
            }, [newSeat]);


    const updateSeat =()=>{
        if(isSeatNoUpdated){
            setUpdateButtonClicked(true);
            updatePassengerSeatNo(id,airlineNumber,{...data,seatNo:newSeat},userType,PNR)
        }

    }


    // console.log('ancillaryServices',activeAncillaryServices);    
    return(
        <Fragment>
            <div className='alp-passenger-container'>
                    <div className='alp-passenger-discription'>
                        <div className= 'alp-discription'>{sno +1}</div>
                        <div className= 'alp-discription'>{firstName}</div>
                        {userType === 'Admin' && <div className= 'alp-discription'>{seatNo? seatNo: 'N/A'}</div>}
                        {userType === 'Admin' && <div className= 'alp-discription'>
                        { activeAncillaryService.length === 0? <div>No Ancillary Service Provided</div>:    
                        ancillaryServices.length === 0?  <div>No Ancillary Selected</div>:
                                        <FontAwesomeIcon icon ={displayAncSer?faTimes:faBars} 
                                                    onClick ={()=> displayAncSer? setdisplayAncSer(false):setdisplayAncSer(true)}
                                                    style={{cursor: 'pointer'}}
                                                    />}   
                        </div> }                   
                        {userType === 'Admin' && <div className= 'alp-discription'>
                            <FontAwesomeIcon icon ={faTrashAlt} className='pointer' 
                                onClick={()=>onDeletePassenger(airlineNumber,id)}/>
                        </div>}
                        {userType === 'Admin' && <div className= 'alp-discription'>
                            { display && <span className='pointer'style={{color:'red'}}  onClick={()=>setdisplay(false)}>&#10008; </span>}
                            { !display && <FontAwesomeIcon className='pointer' icon={faEdit} onClick={()=>setdisplay(true)}/>}
                        </div>}
                        {userType === 'Crew'  && <div className= 'alp-discription'> <DisplayValue editable ={true} name={'seat-no'+seatNo} id={'seat-no'+id}options={otherSeatOptions} handleChange={setnewSeat} defaultValue={seatNo}/></div>}
                        {userType === 'Crew'  && <div className= 'alp-discription'>{isUpdateButtonClicked? <div>{updateMsg}</div>:<CustumButton disabled={!isSeatNoUpdated} onClick={()=>updateSeat()}>Confirm</CustumButton>}</div> }
                    </div>   
    {displayAncSer && 
        <div style ={{boxShadow:'10px 10px 10px darkgrey', background: 'aliceblue', margin: '1vw 5vw ', width:'90%'}}>
        <AncillaryServices key ={data.PNR}ancillaryServices={ancillaryServices} pnr={data.PNR}
                           userFlightData ={userFlightData} />
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
    userFlightData : selectFilghtData(ownProps.data.airlineNumber)(state),
    userType: selectSignUserType(state),
    updateMsg: selectAllPassengerSeatUpdateMessage(state)
})
const mapDispatchToProps = dispatch =>({
    onDeletePassenger: (flightNo, id)=>dispatch(startDeletePassengers(flightNo, id)),
    updatePassengerSeatNo: (id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR)=>
    dispatch(startPassengerInfoUpdate(id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR)),
})
export default connect(mapStateToProps,mapDispatchToProps)(PassengerInfo);
