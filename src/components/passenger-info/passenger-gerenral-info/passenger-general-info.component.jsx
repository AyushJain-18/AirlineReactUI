import React ,{useState,useEffect, Fragment} from 'react';
import './passenger-general-info.styles.scss'

import {connect} from 'react-redux';
import {onNewSeatSelected} from '../../../store/allpassenger/allpassenger.action';
import {selectUnoccupiedSeat} from '../../../store/allpassenger/allpassenger.select';

// for ediatble component passed 1.seat, which will be fetched from passenger data
// 2.allPassengersMappedToSeat
 const PassengerGerenralInfo =({passengerData, width})=>{

    const [id,setid] = useState(passengerData.id) 
    const [firstName, setfirstName]    = useState(passengerData.firstName);
    const [lastName, setlastName]      = useState(passengerData.lastName)
    const [dob, setdob]                = useState(passengerData.dob)
    const [seatNo, setseatNo]          = useState(passengerData.seatNo)
    const [PNR, setPNR]                = useState(passengerData.PNR)
    const [passport, setpassport]      = useState(passengerData.passport)   
    const [address, setaddress]             = useState(passengerData.address)
    const [contactNumber, setcontactNumber]  = useState(passengerData.contactNumber)
   
    useEffect(()=>{
            setid(passengerData.id)
             setfirstName(passengerData.firstName);
             setlastName(passengerData.lastName)
             setdob(passengerData.dob)
             setseatNo(passengerData.seatNo)
             setPNR(passengerData.PNR)
             setpassport(passengerData.passport)
             setaddress(passengerData.address)
             setcontactNumber(passengerData.contactNumber)
            // console.log('Passenger Data changes',seatNo)
    },[passengerData])
    return(
      <Fragment> 
            <div className= 'passenger-general-info-container ' style={{width:`${width}`}}>
                    <div className= 'passenger-heading'>Passenger Info</div>
                    <div className= 'passenger-info-items'> <span>FirstName</span>  <span>{firstName?firstName :'--'}</span> </div>
                    <div className= 'passenger-info-items'> <span>LastName</span>   <span>{lastName?lastName :'--'}</span> </div>
                    <div className= 'passenger-info-items'> <span>SeatNo</span>     <span> {seatNo?seatNo :'--'}</span> </div>
                    <div className= 'passenger-info-items'> <span>ContactNo.</span> <span>{contactNumber?contactNumber :'--'}</span> </div>
                    <div className= 'passenger-info-items'> <span>DOB</span>        <span>{dob? dob:'--'}</span> </div>
                    <div className= 'passenger-info-items'> <span>PNR</span>        <span>{PNR}</span> </div>
                    <div className= 'passenger-info-items'> <span>Passport</span>   <span> {passport? passport:'--'}</span> </div>
                    <div className= 'passenger-info-items'> <span>Address</span>    <span style={{paddingLeft: '40px'}}> {address? address:'--'}</span> </div>
        
            </div>
        </Fragment>
    )
}

export default PassengerGerenralInfo;