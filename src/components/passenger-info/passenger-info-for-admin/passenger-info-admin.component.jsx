import React ,{useState,useEffect, Fragment} from 'react';
import './passenger-info-admin.styles.scss'

import {connect} from 'react-redux';

import DisplayValue from '../../CustumComponents/custum-select/custumSelect.component';
import CustumButon from '../../CustumComponents/CustumButon/custumButton.component';

import {onNewSeatSelected} from '../../../store/allpassenger/allpassenger.action';
import {startPassengerInfoUpdate} from '../../../store/user/user.actions';
import {startAddPassengers} from '../../../store/admin/admin.action';

import {selectSignUserType} from '../../../store/user/user.selector';
import {
    selectAllActiveAncillaryService,
    selectLagguageAllowedValue,
    selectMealAllowedValue,
    selectPayPerViewAllowedValue
} from '../../../store/ancillaryServices/ancillaryService.selectors';
import {selectUnoccupiedSeat,selectPNR} from '../../../store/allpassenger/allpassenger.select';





 const PassengerGerenralInfoForAdmin =({isAdd,passengerData,unOccupiedSeats,
    logedInUserType, checkInPassengerPNR, updatePassengerDetails,addPassenger,
    payPerViewDropDown, lagguageDropDown, mealDropDown, activeAncillaryServices})=>{

    const airlineNumber= passengerData.airlineNumber;
    const [disableButton, setdisableButton] = useState(false)
    // let disableButton = false
    const [id,setid] = useState(passengerData.id) 
    const [firstName, setfirstName]    = useState(passengerData.firstName);
    const [lastName, setlastName]      = useState(passengerData.lastName)
    const [age, setage]                = useState(passengerData.age)
    const [PNR, setPNR]                = useState(passengerData.PNR)
    const [contactNumber, setcontactNumber]  = useState(passengerData.contactNumber)
    const [passport, setpassport]  = useState(passengerData.passport)
    const [dob, setdob]  = useState(passengerData.dob)
    const [address, setaddress]  = useState(passengerData.address)
    const [luggage, setluggae]         = useState(passengerData.luggage);
    const [meal, setmeal]              = useState(passengerData.meal)
    const [payPerView, setPayPerView]  = useState(passengerData.payPerView)
    const [inFlightShopping, setinFlightShopping]  = useState(passengerData.inFlightShopping)
    const [infants, setinfants]        = useState(passengerData.infants)
    const [wheelChair, setwheelChair]  = useState(passengerData.wheelChair)
    const [seatNo, setseatNo]          = useState(passengerData.seatNo)
    const[newSeat, setnewSeat] = useState(passengerData.seatNo)

    
    let lagguageOptions  =lagguageDropDown.map(eachValue=>({value: eachValue})); 
    lagguageOptions.unshift({value:'N/A'})
    //{value:'N/A'}, {value: '15kg'},{value: "25kg"},{value: "40kg"}];  
        
    let mealOptions    =mealDropDown.map(eachValue=>({value: eachValue}));  
    mealOptions.unshift({value:'N/A'})
    //[{value:'N/A'}, {value:'Veg'}   ,  {value:'Non-Veg'}];
    
    let payPerViewOptions=payPerViewDropDown.map(eachValue=>({value: eachValue})); 
    payPerViewOptions.unshift({value:'N/A'})  
    //[{value:'N/A'}, {value:'Hollywood'},{value:'Bollywood'}, {value: 'Tollywood'}];

    let inFlightShoppingOption = [{value: 'True'},{value: 'False'}]; 
    let infantsOptions   =[{value: 'True'},{value: 'False'}];
    let wheelChairOptions=[{value: 'True'},{value: 'False'}];
    let otherSeatOptions= unOccupiedSeats.reduce((acc, eachUnOccupiedSeats)=>([ ...acc,{'value': eachUnOccupiedSeats}]),[]);
    if(isAdd){ otherSeatOptions.push({'value': 'N/A'})}
    otherSeatOptions.reverse();
        
    const {isInFlightShoppingActive,isPayPerViewActive,isLuggageActive,isMealActive} =activeAncillaryServices;
  
    const checkDisableButtonStatus=()=>{
        firstName && lastName&& contactNumber && newSeat &&dob &&  //age
         passport && address?setdisableButton(false): setdisableButton(true)
    }
   
    useEffect(()=>{
             setfirstName(passengerData.firstName);
             setlastName(passengerData.lastName);
             setage(passengerData.age);
             setseatNo(passengerData.seatNo);
             setPNR(passengerData.PNR);
             setcontactNumber(passengerData.contactNumber);
             if(passengerData.luggage === undefined)        setluggae('');
             if(passengerData.meal === undefined)           setmeal('');
             if(passengerData.payPerView === undefined)     setPayPerView('');
             if(passengerData.infants=== undefined)         setinfants(false);
             if(passengerData.wheelChair === undefined)     setwheelChair(false)
             if(passengerData.inFlightShopping === undefined)setinFlightShopping(false)
    },[passengerData])

    useEffect(()=>{checkDisableButtonStatus()},[firstName, lastName, age, newSeat, contactNumber,address,passport,dob])

    const onConfirm =(event)=>{
        event.preventDefault();
        let inflightShoppingValueToUpdate =JSON.parse(inFlightShopping.toString().toLowerCase());
        let infantValueToUpdate =JSON.parse(infants.toString().toLowerCase());
        let wheelChairValueToUpdate = JSON.parse(wheelChair.toString().toLowerCase());
        let MEAL = meal === 'N/A'?'': meal;
        let Luggage = luggage === 'N/A'?'': luggage;
        let PayPerView = payPerView === 'N/A'?'': payPerView;
        const data = {
            ...passengerData,
            firstName, lastName,age,contactNumber,address,passport,dob,
            luggage:Luggage,
            meal:MEAL,
            payPerView:PayPerView,
            inFlightShopping:inflightShoppingValueToUpdate,
            seatNo:newSeat,
            infants:infantValueToUpdate,
            wheelChair:wheelChairValueToUpdate,
        }
       console.log(data)
       if(isAdd){
        addPassenger(data);
       }else{
        updatePassengerDetails(id,airlineNumber,data,logedInUserType, checkInPassengerPNR);
       }
    }
       
        return(
            // <form onSubmit={handelSubmitForAuxilaryService}>
                 <div className= 'admin-passenger-general-info-container'>
                        <div className= 'admin-passenger-heading'>Passenger Info</div>
                        <div className='admin-info-container'>
                            {/* <div className='admin-general-info-container'> */}
                                    <div className= 'admin-passenger-info-items'><span>FirstName</span><div className ='pa-input'><input className="pa-form-input" type="text" value={firstName} onChange={(event)=> setfirstName(event.target.value) }/></div></div>
                                    
                                    <div className= 'admin-passenger-info-items'><span>LastName</span><div className ='pa-input'><input className="pa-form-input" type="text" value={lastName} onChange={(event)=>setlastName(event.target.value)}/></div></div>
                                    
                                    <div className= 'admin-passenger-info-items'><span>ContactNo</span> <div className ='pa-input'><input className="pa-form-input" type="number" min="0" value={contactNumber} onChange={(event)=> setcontactNumber(event.target.value)}/></div></div>
                                    
                                    {/* <div className= 'admin-passenger-info-items'><span>Age</span><div className ='pa-input'><input className="pa-form-input" type="number"  min="0"value={age} onChange={onChangeAge}/></div></div> */}
                                    <div className= 'admin-passenger-info-items'><span>DOB</span><div className ='pa-input'><input className="pa-form-input" type="date" value={dob} max="2020-01-01" onChange={(event)=> setdob(event.target.value)}/></div></div>
                                   
                                    <div className= 'admin-passenger-info-items'><span>PNR</span> <span>{PNR}</span> </div>

                                    <div className= 'admin-passenger-info-items'><span>Passport</span><div className ='pa-input'><input className="pa-form-input" type="text" value={passport} onChange={(event)=>setpassport(event.target.value)}/></div></div>
                                    
                                    <div className= 'admin-passenger-info-items'><span>Address</span><div className ='pa-input'><textarea rows = "2" cols = "60" className="pa-form-input"  value={address} onChange={(event)=> setaddress(event.target.value)}/></div></div>
                                   
                                   
                                    <div className= 'admin-passenger-info-items'><span>Seat No:</span> <DisplayValue editable ={true} name={'seat-no'+seatNo} id={'seat-no'+id}
                                        options={otherSeatOptions} handleChange={setnewSeat} defaultValue={seatNo}/>
                                    </div>
                            {/* </div>
                            <div className='admin-general-info-container'> */}
                              
                              { isLuggageActive && <div className= 'admin-passenger-info-items'> <span>Luggage</span><DisplayValue key={id} editable={true} 
                                name='Luggage' id={'Luggage'+id} options={lagguageOptions} defaultValue={luggage} handleChange={setluggae}/> 
                                </div>}
                            
                              {isMealActive && <div className= 'admin-passenger-info-items'>  <span>Meal</span>  <DisplayValue editable={true} name='Meal' id='meal' 
                                options={mealOptions}
                                        defaultValue={meal} handleChange={setmeal}/> 
                                </div>}

                            { isPayPerViewActive && <div className= 'admin-passenger-info-items'> <span>PayPerView</span> <DisplayValue editable={true} name='PayPerView' 
                                    id='PayPerView' options={payPerViewOptions} defaultValue={payPerView} handleChange={setPayPerView}/> 
                                </div>}
                                
                               {isInFlightShoppingActive && <div className= 'admin-passenger-info-items'> <span>In Flight Shopping</span> <DisplayValue editable={true} name='PayPerView' 
                                    id='inFlightShopping' options={inFlightShoppingOption} defaultValue={inFlightShopping?'True':'False'} handleChange={setinFlightShopping}/> 
                                </div>}

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
                                <CustumButon type= 'button' onClick ={(event)=> onConfirm(event)}>Confirm</CustumButon>
                            }
                         </div>   
                </div>
        //    </form>      
        )
 }


 const mapStateToProps =(state, ownProps)=>{
    return{
        unOccupiedSeats: selectUnoccupiedSeat(ownProps.passengerData.seatNo, 
                        ownProps.unOccupiedSeats)(state),
        logedInUserType : selectSignUserType(state),
        checkInPassengerPNR: selectPNR(state),
        activeAncillaryServices : selectAllActiveAncillaryService(ownProps.passengerData.airlineNumber)(state),
        lagguageDropDown: selectLagguageAllowedValue(ownProps.passengerData.airlineNumber)(state),
        mealDropDown:     selectMealAllowedValue(ownProps.passengerData.airlineNumber)(state),
        payPerViewDropDown: selectPayPerViewAllowedValue(ownProps.passengerData.airlineNumber)(state)
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        updatePassengerDetails: (id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR)=>
        dispatch(startPassengerInfoUpdate(id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR)),
        addPassenger: (passengerData)=>dispatch(startAddPassengers(passengerData))
       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PassengerGerenralInfoForAdmin);