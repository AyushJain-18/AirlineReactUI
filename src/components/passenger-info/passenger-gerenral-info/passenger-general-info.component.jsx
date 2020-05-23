import React ,{useState,useEffect} from 'react';
import './passenger-general-info.styles.scss'

import {connect} from 'react-redux';
import DisplayValue from '../../CustumComponents/custum-select/custumSelect.component';
import CustumButon from '../../CustumComponents/CustumButon/custumButton.component';
import {onNewSeatSelected} from '../../../store/allpassenger/allpassenger.action';
import {selectUnoccupiedSeat} from '../../../store/allpassenger/allpassenger.select';

// for ediatble component passed 1.seat, which will be fetched from passenger data
// 2.allPassengersMappedToSeat
 const PassengerGerenralInfo =({passengerData, editable, width,updateSeatNumberAction,unOccupiedSeats})=>{
    console.log('unOccupiedSeats',unOccupiedSeats);
    const [id,setid] = useState(passengerData.id) 
    const [firstName, setfirstName]    = useState(passengerData.firstName);
    const [lastName, setlastName]      = useState(passengerData.lastName)
    const [age, setage]         = useState(passengerData.age)
    const [seatNo, setseatNo]   = useState(passengerData.seatNo)
    const [PNR, setPNR]         = useState(passengerData.PNR)
    const [contactNumber, setcontactNumber]  = useState(passengerData.contactNumber)

    let otherSeatOptions= unOccupiedSeats.reduce((acc, eachUnOccupiedSeats)=>{
        return [ ...acc,{'value': eachUnOccupiedSeats}]
           },[]);
           otherSeatOptions.reverse();

    const onSeatNumberChange =(value)=>{
        updateSeatNumberAction(value)
    }
    useEffect(()=>{
            setid(passengerData.id)
             setfirstName(passengerData.firstName);
             setlastName(passengerData.lastName)
             setage(passengerData.age)
             setseatNo(passengerData.seatNo)
             setPNR(passengerData.PNR)
             setcontactNumber(passengerData.contactNumber)
            // console.log('Passenger Data changes',seatNo)
    },[passengerData])
    return(
        <div className= 'passenger-general-info-container ' style={{width:`${width}`}}>
            <form>
            <div className= 'passenger-heading'>Passenger Info</div>
            <div className= 'passenger-info-items'> <span>FirstName</span>  <span>{firstName}</span> </div>
            <div className= 'passenger-info-items'> <span>LastName</span>   <span>{lastName}</span> </div>
            <div className= 'passenger-info-items'> <span>ContactNo.</span> <span>{contactNumber}</span> </div>
            <div className= 'passenger-info-items'> <span>Age</span>        <span>{age}</span> </div>
            <div className= 'passenger-info-items'> <span>PNR</span>        <span>{PNR}</span> </div>
            <div className= 'passenger-info-items'> <span>SeatNo</span>      
                <DisplayValue editable ={editable} name={'seat-no'+seatNo} id={'seat-no'+id}
                    options={otherSeatOptions} handleChange={onSeatNumberChange} defaultValue={seatNo}
                />
            </div>
            {/* <div className='passenger-info-button'>
                        <CustumButon inverted> update Seat</CustumButon>
            </div> */}
            </form>
        </div>
    )
}
const mapStateToProps =(state, ownProps)=>{
    return{
        unOccupiedSeats: selectUnoccupiedSeat(ownProps.passengerData.seatNo, 
                        ownProps.unOccupiedSeats)(state)
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        updateSeatNumberAction: (newSeatNo)=>dispatch(onNewSeatSelected(newSeatNo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PassengerGerenralInfo);