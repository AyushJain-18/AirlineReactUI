import React, {useState} from 'react';
import './passenger-auxilarys-decription.styles.scss';
import CustumButon from '../../CustumComponents/CustumButon/custumButton.component';
import  DisplayValue  from '../../CustumComponents/custum-select/custumSelect.component';

const PassengerAuxilaryServiceInfo= ({passengerData})=>{
    
    const [editable, seteditable]         = useState(false);
    const [luggage, setluggae]         = useState(passengerData.luggage);
    const [meal, setmeal]              = useState(passengerData.meal)
    const [PayPerView, setPayPerView]  = useState(passengerData.PayPerView)
    const [infants, setinfants]        = useState(passengerData.infants)
    const [wheelChair, setwheelChair]  = useState(passengerData.wheelChair)

    const lagguageOptions  =[{value:'N/A'}, {value: '15kg'},{value:'20 Kg'},{value:'25Kg'}];
    const mealOptions      =[{value:'N/A'}, {value:'Veg'}   ,  {value:'Non-Veg'}];
    const PayPerViewOptions=[{value:'N/A'}, {value:'Hollywood'},{value:'Bollywood'}, {value: 'Tollywood'}];
    const infantsOptions   =[{value: 'Yes'},{value: 'No'}];
    const wheelChairOptions=[{value: 'Yes'},{value: 'No'}];

    console.log('Default value are',luggage,meal,PayPerView,infants,wheelChair)
    const handelSubmitForAuxilaryService =(event)=>{
        event.preventDefault();
        console.log('Auxilary Service submitted', luggage)
    }
    return(
        <div className='passenger-auxilary-services-container'>
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
                         defaultValue={PayPerView} handleChange={setPayPerView}/> 
                 </div>

                <div className= 'passenger-info-items'> 
                        <span>With Infants</span>
                        <DisplayValue editable={editable} name='Infants' id='Infants' options={infantsOptions}
                         defaultValue={infants?'Yes':'No'} handleChange={setinfants}/> 
                 </div>
                <div className= 'passenger-info-items'> 
                        <span>With WheelChair</span>
                        <DisplayValue editable={editable} name='WheelChair' id='WheelChair' options={wheelChairOptions}
                         defaultValue={wheelChair?'Yes':'No'} handleChange={setwheelChair}/> 
                 </div>

                <div className= 'passenger-info-button'>
                {editable? <CustumButon type= 'submit'>Save Changes</CustumButon>:
                    <CustumButon onClick={()=>seteditable(true)} >Edit Aux-Services</CustumButon>
                }
                </div>
            </form>
        </div>
    )
}


export default PassengerAuxilaryServiceInfo;