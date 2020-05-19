import React, {useState, useEffect} from 'react';
import './passenger-auxilarys-decription.styles.scss';
import CustumButon from '../../CustumComponents/CustumButon/custumButton.component';
import  DisplayValue  from '../../CustumComponents/custum-select/custumSelect.component';
import {startPassengerInfoUpdate} from '../../../store/user/user.actions';
import {selectSignUserType} from '../../../store/user/user.selector'
import {selectSeatNoOfSelectedPassenger} from '../../../store/allpassenger/allpassenger.select'
import {connect} from 'react-redux';

const PassengerAuxilaryServiceInfo= ({passengerData,saveChange, width, editable,logedInUserType,newSeatNumber})=>{
    const id = passengerData.id;
    const airlineNumber= passengerData.airlineNumber;
    const [luggage, setluggae]         = useState(passengerData.luggage);
    const [meal, setmeal]              = useState(passengerData.meal)
    const [payPerView, setPayPerView]  = useState(passengerData.payPerView)
    const [infants, setinfants]        = useState(passengerData.infants)
    const [wheelChair, setwheelChair]  = useState(passengerData.wheelChair)

    const lagguageOptions  =[{value:'N/A'}, {value: '15kg'},{value:'20 Kg'},{value:'25Kg'}];
    const mealOptions      =[{value:'N/A'}, {value:'Veg'}   ,  {value:'Non-Veg'}];
    const PayPerViewOptions=[{value:'N/A'}, {value:'Hollywood'},{value:'Bollywood'}, {value: 'Tollywood'}];
    const infantsOptions   =[{value: 'True'},{value: 'False'}];
    const wheelChairOptions=[{value: 'True'},{value: 'False'}];

    useEffect(()=>{
        console.log('component did mount')
        if(luggage === undefined) setluggae('');
        if(meal === undefined) setmeal('');
        if(payPerView === undefined)setPayPerView('');
    },[])
    useEffect(()=>{
        setluggae(passengerData.luggage);
        setmeal(passengerData.meal)
        setPayPerView(passengerData.payPerView)
        setinfants(passengerData.infants)
        setwheelChair(passengerData.wheelChair)
},[passengerData])
    const handelSubmitForAuxilaryService =(event)=>{
        event.preventDefault();

        let infantValueToUpdate =JSON.parse(infants.toString().toLowerCase());
        let wheelChairValueToUpdate = JSON.parse(wheelChair.toString().toLowerCase());
        let newSeat = newSeatNumber?newSeatNumber: passengerData.seatNo;
        

        const updatedData = {
            ...passengerData,
            luggage,meal ,payPerView,
            seatNo:newSeat,
            infants:infantValueToUpdate,
            wheelChair:wheelChairValueToUpdate

        }
        console.log(updatedData)
        saveChange(id,airlineNumber,updatedData,logedInUserType);
    }
    return(
        <div className='passenger-auxilary-services-container' style={{width:`${width}`}}>
            <form onSubmit= {handelSubmitForAuxilaryService}> 
                <div className= 'passenger-heading'>Auxilary Info</div>
                <div className= 'passenger-info-items'>
                     <span>Luggage</span>
                        <DisplayValue editable={editable} name='Luggage' id='Luggage' options={lagguageOptions}
                         defaultValue={luggage} handleChange={setluggae}/> 
                </div>
 
                <div className= 'passenger-info-items'> 
                    <span>Meal</span> 
                    <DisplayValue editable={editable} name='Meal' id='meal' options={mealOptions}
                         defaultValue={meal} handleChange={setmeal}/> 
                </div>

                <div className= 'passenger-info-items'>
                     <span>PayPerView</span> 
                     <DisplayValue editable={editable} name='PayPerView' id='PayPerView' options={PayPerViewOptions}
                         defaultValue={payPerView} handleChange={setPayPerView}/> 
                 </div>

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
                {editable && <CustumButon type= 'submit'>Save Changes</CustumButon>}
                </div>
            </form>
        </div>
    )
}
const mapStateToProps =state=>{
    return{
        logedInUserType : selectSignUserType(state),
        newSeatNumber: selectSeatNoOfSelectedPassenger(state)
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        saveChange: (id,airlineNumber,updatedData,logedInUserType)=>dispatch(startPassengerInfoUpdate(id,airlineNumber,updatedData,logedInUserType))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PassengerAuxilaryServiceInfo);