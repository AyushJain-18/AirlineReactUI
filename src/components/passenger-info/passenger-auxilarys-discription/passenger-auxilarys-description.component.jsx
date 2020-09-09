import React, {useState, useEffect} from 'react';
import './passenger-auxilarys-decription.styles.scss';
import CustumButon from '../../CustumComponents/CustumButon/custumButton.component';
import  DisplayValue  from '../../CustumComponents/custum-select/custumSelect.component';

import {connect} from 'react-redux';

import {startPassengerInfoUpdate} from '../../../store/user/user.actions';
import {changeStateOfDisplayNext} from '../../../store/allpassenger/allpassenger.action';

import {selectSignUserType} from '../../../store/user/user.selector';
import {selectUpdatedSeat,selectPNR} from '../../../store/allpassenger/allpassenger.select';
import {
    selectAllActiveAncillaryService,
    selectLagguageAllowedValue,
    selectMealAllowedValue,
    selectPayPerViewAllowedValue
} from '../../../store/ancillaryServices/ancillaryService.selectors';

const PassengerAuxilaryServiceInfo= ({passengerData,width,editable, saveChange,
                checkInPassengerPNR,logedInUserType,newSeatNumber, setNextButtonStateToFalse,
                payPerViewDropDown, mealDropDown, lagguageDropDown,activeAncillaryServices})=>{

    const airlineNumber= passengerData.airlineNumber;
    const [id, setid] = useState(passengerData.id);
    const [luggage, setluggae]         = useState(passengerData.luggage);
    const [meal, setmeal]              = useState(passengerData.meal)
    const [payPerView, setPayPerView]  = useState(passengerData.payPerView)
    const[inFlightShopping, setinFlightShopping] = useState(passengerData.inFlightShopping)
    const [infants, setinfants]        = useState(passengerData.infants)
    const [wheelChair, setwheelChair]  = useState(passengerData.wheelChair)
    const[newSeat, setnewSeat] = useState(passengerData.seatNo) 
    // console.log(id, luggage,meal,payPerView,infants,wheelChair)

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
    const infantsOptions   =[{value: 'True'},{value: 'False'}];
    const wheelChairOptions=[{value: 'True'},{value: 'False'}];

    const {isInFlightShoppingActive,isPayPerViewActive,isLuggageActive,isMealActive} =activeAncillaryServices;

    useEffect(()=>{
       // console.log('component did mount')
        setNextButtonStateToFalse()
        if(luggage === undefined) setluggae('');
        if(meal === undefined) setmeal('');
        if(payPerView === undefined)setPayPerView('');
        if(infants=== undefined) setinfants(false);
        if(wheelChair === undefined) setwheelChair(false);
        if(passengerData.inFlightShopping === undefined)setinFlightShopping(false);
       // console.log(id, luggage,meal,payPerView,infants,wheelChair,newSeat)
    },[])

    useEffect(()=>{
        if(newSeatNumber){
           // console.log('1.newSeatNumber from action',newSeatNumber)
            setnewSeat(newSeatNumber);
        }else{
            setnewSeat(passengerData.seatNo);
        }
       // console.log('2.newSeatNumber from passenger and then update ',newSeat);
    },[newSeatNumber])


    const handelSubmitForAuxilaryService =(event)=>{
        event.preventDefault();

        let inflightShoppingValueToUpdate =JSON.parse(inFlightShopping.toString().toLowerCase());
        let infantValueToUpdate =JSON.parse(infants.toString().toLowerCase());
        let wheelChairValueToUpdate = JSON.parse(wheelChair.toString().toLowerCase());
        let MEAL = meal === 'N/A'?'': meal;
        let Luggage = luggage === 'N/A'?'': luggage;
        let PayPerView = payPerView === 'N/A'?'': payPerView;
        let newSeatNumber= newSeat === 'N/A'? '': newSeat
        

        const updatedData = {
            ...passengerData,
            luggage: Luggage,meal: MEAL ,payPerView:PayPerView,
            seatNo:newSeatNumber,
            inFlightShopping:inflightShoppingValueToUpdate,
            infants:infantValueToUpdate,
            wheelChair:wheelChairValueToUpdate

        }
      //  console.log(updatedData)
       saveChange(id,airlineNumber,updatedData,logedInUserType, checkInPassengerPNR);
    }
    return(
        <div className='passenger-auxilary-services-container' style={{width:`${width}`}}>
            <form onSubmit= {handelSubmitForAuxilaryService}> 
                <div className= 'passenger-heading'>Auxilary Info</div>
                    { isLuggageActive && 
                        <div className= 'passenger-info-items'>
                            <span>Luggage</span>
                                <DisplayValue key={id} editable={editable} name='Luggage' id={'Luggage'+id} options={lagguageOptions}
                                defaultValue={luggage} handleChange={setluggae}/> 
                        </div> 
                    }
                    { isMealActive && <div className= 'passenger-info-items'> 
                            <span>Meal</span> 
                            <DisplayValue editable={editable} name='Meal' id='meal' options={mealOptions}
                                defaultValue={meal} handleChange={setmeal}/> 
                        </div> 
                    }

                    { isPayPerViewActive  &&    
                                        <div className= 'passenger-info-items'>
                                                <span>PayPerView</span> 
                                                <DisplayValue editable={editable} name='PayPerView' id='PayPerView' options={payPerViewOptions}
                                                    defaultValue={payPerView} handleChange={setPayPerView}/> 
                                            </div>
                    }
                    { isInFlightShoppingActive &&
                                <div className= 'passenger-info-items'>
                                        <span>In-Flight Shopping</span> 
                                        <DisplayValue editable={editable} name='inFlightShopping' id='inFlightShopping' options={inFlightShoppingOption}
                                            defaultValue={inFlightShopping?'True':'False'} handleChange={setinFlightShopping}/> 
                                </div>
                    }     

                <div className= 'passenger-info-items'> 
                        <span>With Infants</span>
                        <DisplayValue editable={editable} name='Infants' id='Infants' options={infantsOptions}
                         defaultValue={infants?'True':'False'} handleChange={setinfants}/> 
                 </div>
                <div className= 'passenger-info-items'> 
                        <span>With WheelChair</span>
                        <DisplayValue editable={editable} name='WheelChair' id='WheelChair' options={wheelChairOptions}
                         defaultValue={wheelChair?'True':'False'} handleChange={setwheelChair}/> 
                 </div>

                <div className= 'passenger-info-button'>
                {editable && <CustumButon type= 'submit'>Confirm</CustumButon>}
                </div>
            </form>
        </div>
    )
}
const mapStateToProps =(state, ownProps)=>{
    return{
        logedInUserType : selectSignUserType(state),
        newSeatNumber: selectUpdatedSeat(state),
        checkInPassengerPNR: selectPNR(state),
        activeAncillaryServices : selectAllActiveAncillaryService(ownProps.passengerData.airlineNumber)(state),
        lagguageDropDown:   selectLagguageAllowedValue(ownProps.passengerData.airlineNumber)(state),
        mealDropDown:     selectMealAllowedValue(ownProps.passengerData.airlineNumber)(state),
        payPerViewDropDown: selectPayPerViewAllowedValue(ownProps.passengerData.airlineNumber)(state)
    } 
}
const mapDispatchToProps =(dispatch)=>{
    return{
        setNextButtonStateToFalse:()=> dispatch(changeStateOfDisplayNext(false)) ,
        saveChange: (id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR)=>
        dispatch(startPassengerInfoUpdate(id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PassengerAuxilaryServiceInfo);