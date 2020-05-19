import React ,{useState,useEffect} from 'react';
import './passenger-general-info.styles.scss'

import CustumButon from '../../CustumComponents/CustumButon/custumButton.component';


 const PassengerGerenralInfo =({passengerData,editable})=>{
    const [firstName, setfirstName]    = useState(passengerData.firstName);
    const [lastName, setlastName]      = useState(passengerData.lastName)
    const [age, setage]         = useState(passengerData.age)
    const [seatNo, setseatNo]   = useState(passengerData.seatNo)
    const [PNR, setPNR]         = useState(passengerData.PNR)
    const [contactNumber, setcontactNumber]  = useState(passengerData.contactNumber)
    useEffect(()=>{
             setfirstName(passengerData.firstName);
             setlastName(passengerData.lastName)
             setage(passengerData.age)
             setseatNo(passengerData.seatNo)
             setPNR(passengerData.PNR)
             setcontactNumber(passengerData.contactNumber)
    },[passengerData])
    return(
        <div className= 'passenger-general-info-container'>
            <form>
            <div className= 'passenger-heading'>Passenger Info</div>
            <div className= 'passenger-info-items'> <span>FirstName</span>  <span>{firstName}</span> </div>
            <div className= 'passenger-info-items'> <span>LastName</span>   <span>{lastName}</span> </div>
            <div className= 'passenger-info-items'> <span>ContactNo.</span> <span>{contactNumber}</span> </div>
            <div className= 'passenger-info-items'> <span>Age</span>        <span>{age}</span> </div>
            <div className= 'passenger-info-items'> <span>SeatNo</span>     <span>{seatNo}</span> </div> 
            <div className= 'passenger-info-items'> <span>PNR</span>        <span>{PNR}</span> </div>
            {editable && <CustumButon type= 'submit' isGoogleSignIN>Update</CustumButon>  }
            </form>
        </div>
    )
}

export default PassengerGerenralInfo;