import React ,{useState,useEffect, Fragment} from 'react';
import './passenger-info-admin.styles.scss'

import {connect} from 'react-redux';

import DisplayValue from '../../CustumComponents/custum-select/custumSelect.component';
import CustumButon from '../../CustumComponents/CustumButon/custumButton.component';

import {onNewSeatSelected} from '../../../store/allpassenger/allpassenger.action';
import {startPassengerInfoUpdate} from '../../../store/user/user.actions';

import {selectSignUserType} from '../../../store/user/user.selector';
import {selectUnoccupiedSeat,selectPNR} from '../../../store/allpassenger/allpassenger.select';





 const PassengerGerenralInfoForAdmin =({passengerData,updateSeatNumberAction,unOccupiedSeats,
    logedInUserType, checkInPassengerPNR, saveChange})=>{

    const airlineNumber= passengerData.airlineNumber;
    const [disableButton, setdisableButton] = useState(false)
    // let disableButton = false
    const [id,setid] = useState(passengerData.id) 
    const [firstName, setfirstName]    = useState(passengerData.firstName);
    const [lastName, setlastName]      = useState(passengerData.lastName)
    const [age, setage]                = useState(passengerData.age)
    const [seatNo, setseatNo]          = useState(passengerData.seatNo)
    const [PNR, setPNR]                = useState(passengerData.PNR)
    const [contactNumber, setcontactNumber]  = useState(passengerData.contactNumber)
    const [luggage, setluggae]         = useState(passengerData.luggage);
    const [meal, setmeal]              = useState(passengerData.meal)
    const [payPerView, setPayPerView]  = useState(passengerData.payPerView)
    const [infants, setinfants]        = useState(passengerData.infants)
    const [wheelChair, setwheelChair]  = useState(passengerData.wheelChair)
    const[newSeat, setnewSeat] = useState(passengerData.seatNo)

    let otherSeatOptions= unOccupiedSeats.reduce((acc, eachUnOccupiedSeats)=>{
                return [ ...acc,{'value': eachUnOccupiedSeats}]
           },[]);
    otherSeatOptions.reverse();
    const lagguageOptions  =[{value:'N/A'}, {value: '15kg'},{value: "25kg"},{value: "40kg"}];
    const mealOptions      =[{value:'N/A'}, {value:'Veg'}   ,  {value:'Non-Veg'}];
    const PayPerViewOptions=[{value:'N/A'}, {value:'Hollywood'},{value:'Bollywood'}, {value: 'Tollywood'}];
    const infantsOptions   =[{value: 'True'},{value: 'False'}];
    const wheelChairOptions=[{value: 'True'},{value: 'False'}];

    const isNotEmpty= value=>new String(value).length<15;
    const checkDisableButtonStatus=()=>{
        firstName? setdisableButton(false): setdisableButton(true)
        firstName && lastName? setdisableButton(false): setdisableButton(true)
        firstName && lastName&& age? setdisableButton(false): setdisableButton(true)
        firstName && lastName&& age&& contactNumber? setdisableButton(false): setdisableButton(true)
    }   

    const onChangeAge =(event)=>{ 
        let value = event.target.value;
        let stringValue = new String(value);
        if(stringValue.length>0 && stringValue.length<=2 && value>0){
            value = new Number(stringValue)
            setage(event.target.value)
        }
    }
   
    useEffect(()=>{
             setfirstName(passengerData.firstName);
             setlastName(passengerData.lastName);
             setage(passengerData.age);
             setseatNo(passengerData.seatNo);
             setPNR(passengerData.PNR);
             setcontactNumber(passengerData.contactNumber);
             if(luggage === undefined) setluggae('');
             if(meal === undefined) setmeal('');
             if(payPerView === undefined)setPayPerView('');
             if(infants=== undefined) setinfants(false);
             if(wheelChair === undefined) setwheelChair(false);
            // console.log('Passenger Data changes',seatNo)
    },[passengerData])

    useEffect(()=>{checkDisableButtonStatus()},[firstName, lastName, age, seatNo, contactNumber])

    const handelSubmitForAuxilaryService =(event)=>{
        event.preventDefault();
        let infantValueToUpdate =JSON.parse(infants.toString().toLowerCase());
        let wheelChairValueToUpdate = JSON.parse(wheelChair.toString().toLowerCase());
        const updatedData = {
            ...passengerData,
            firstName, lastName,age,contactNumber,luggage,meal ,payPerView,
            seatNo:newSeat,
            infants:infantValueToUpdate,
            wheelChair:wheelChairValueToUpdate
        }
       // console.log(updatedData)
       saveChange(id,airlineNumber,updatedData,logedInUserType, checkInPassengerPNR);
    }
       
        return(
            <form onSubmit={handelSubmitForAuxilaryService}>
                 <div className= 'admin-passenger-general-info-container'>
                        <div className= 'admin-passenger-heading'>Passenger Info</div>
                        <div className='admin-info-container'>
                            {/* <div className='admin-general-info-container'> */}
                                    <div className= 'admin-passenger-info-items'><span>FirstName</span><div className ='pa-input'><input className="pa-form-input" type="text" value={firstName} onChange={(event)=>isNotEmpty(event.target.value) && setfirstName(event.target.value) }/></div></div>
                                    
                                    <div className= 'admin-passenger-info-items'><span>LastName</span><div className ='pa-input'><input className="pa-form-input" type="text" value={lastName} onChange={(event)=>isNotEmpty(event.target.value) && setlastName(event.target.value)}/></div></div>
                                    
                                    <div className= 'admin-passenger-info-items'><span>ContactNo</span> <div className ='pa-input'><input className="pa-form-input" type="number" value={contactNumber} onChange={(event)=>isNotEmpty(event.target.value) && setcontactNumber(event.target.value)}/></div></div>
                                    
                                    <div className= 'admin-passenger-info-items'><span>Age</span><div className ='pa-input'><input className="pa-form-input" type="number" value={age} onChange={onChangeAge}/></div></div>
                                    
                                    <div className= 'admin-passenger-info-items'><span>PNR</span> <span>{PNR}</span> </div>

                                    <div className= 'admin-passenger-info-items'><span>Seat No:</span> <DisplayValue editable ={true} name={'seat-no'+seatNo} id={'seat-no'+id}
                                        options={otherSeatOptions} handleChange={setnewSeat} defaultValue={seatNo}/>
                                    </div>
                            {/* </div>
                            <div className='admin-general-info-container'> */}
                               
                                
                                <div className= 'admin-passenger-info-items'> <span>Luggage</span><DisplayValue key={id} editable={true} 
                                name='Luggage' id={'Luggage'+id} options={lagguageOptions} defaultValue={luggage} handleChange={setluggae}/> 
                                </div>
                            
                                <div className= 'admin-passenger-info-items'>  <span>Meal</span>  <DisplayValue editable={true} name='Meal' id='meal' 
                                options={mealOptions}
                                        defaultValue={meal} handleChange={setmeal}/> 
                                </div>

                                <div className= 'admin-passenger-info-items'> <span>PayPerView</span> <DisplayValue editable={true} name='PayPerView' 
                                    id='PayPerView' options={PayPerViewOptions} defaultValue={payPerView} handleChange={setPayPerView}/> 
                                </div>

                                <div className= 'admin-passenger-info-items'>  <span>With Infants</span><DisplayValue editable={true} name='Infants' 
                                id='Infants' options={infantsOptions} defaultValue={infants?'True':'False'} handleChange={setinfants}/> 
                                </div>
                                <div className= 'admin-passenger-info-items'>  <span>With WheelChair</span> <DisplayValue editable={true}
                                name='WheelChair' id='WheelChair' options={wheelChairOptions} defaultValue={wheelChair?'True':'False'} handleChange={setwheelChair}/> 
                                </div>
                            {/* </div>   */}
                    </div>
                        <div className= 'admin-passenger-info-button'>
                            {
                                disableButton?<CustumButon type= 'button' disabled>Confirm</CustumButon>:
                                <CustumButon type= 'submit'>Confirm</CustumButon>
                            }
                         </div>   
                </div>
           </form>      
        )
 }


 const mapStateToProps =(state, ownProps)=>{
    return{
        unOccupiedSeats: selectUnoccupiedSeat(ownProps.passengerData.seatNo, 
                        ownProps.unOccupiedSeats)(state),
        logedInUserType : selectSignUserType(state),
        checkInPassengerPNR: selectPNR(state)
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        updateSeatNumberAction: (newSeatNo)=>dispatch(onNewSeatSelected(newSeatNo)),
        saveChange: (id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR)=>
        dispatch(startPassengerInfoUpdate(id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR))
    
       }
}
export default connect(mapStateToProps, mapDispatchToProps)(PassengerGerenralInfoForAdmin);