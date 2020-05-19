import React ,{useState,useEffect} from 'react';
import './passenger-general-info.styles.scss'

import {connect} from 'react-redux';
import DisplayValue from '../../CustumComponents/custum-select/custumSelect.component';
import CustumButon from '../../CustumComponents/CustumButon/custumButton.component';
import {onNewSeatSelected} from '../../../store/allpassenger/allpassenger.action';
import {selectUnoccupiedSeat} from '../../../store/allpassenger/allpassenger.select';

 const PassengerGerenralInfo =({passengerData, editable, updateSeatNumberAction,unOccupiedSeats})=>{
    const [firstName, setfirstName]    = useState(passengerData.firstName);
    const [lastName, setlastName]      = useState(passengerData.lastName)
    const [age, setage]         = useState(passengerData.age)
    const [seatNo, setseatNo]   = useState(passengerData.seatNo)
    const [PNR, setPNR]         = useState(passengerData.PNR)
    const [contactNumber, setcontactNumber]  = useState(passengerData.contactNumber)
    let otherSeatOptions= unOccupiedSeats.reduce((acc, eachUnOccupiedSeats)=>{
        return [ ...acc,{'value': eachUnOccupiedSeats}]
           },[]);
    console.log('otherSeatOptions',otherSeatOptions)
    const onSeatNumberChange =(value)=>{
        updateSeatNumberAction(value)
        // setseatNo(value);
    }
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
            <div className= 'passenger-info-items'> <span>PNR</span>        <span>{PNR}</span> </div>
            <div className= 'passenger-info-items'> <span>SeatNo</span>      
                <DisplayValue editable ={editable} name={'seat-no'} id={'seat-no'} defaultValue={seatNo}
                    options={otherSeatOptions} handleChange={onSeatNumberChange}
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
        unOccupiedSeats: selectUnoccupiedSeat(ownProps.passengerData.seatNo)(state)
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        updateSeatNumberAction: (newSeatNo)=>dispatch(onNewSeatSelected(newSeatNo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PassengerGerenralInfo);