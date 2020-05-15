import React ,{useState, useEffect} from 'react';
import './sign-in.comonent.scss'

import FormInput from '../CustumComponents/form-input/form-input.component'
import CustumButton from '../CustumComponents/CustumButon/custumButton.component'

import {Link} from 'react-router-dom'

import {connect} from 'react-redux';

const  SignInComponent =()=>{

    const [userCrendetial, setUserCredebtials]= useState({email: '', password: ''}); 
    const {email, password} =userCrendetial;
    const handleSubmit=(event)=>{
        event.preventDefault();
       
        // emailLoginStart(email, password)
    }
    const handleOnchnage=(event)=>{
            const{name,value} = event.target;
            setUserCredebtials({...userCrendetial, [`${name}`]: value})
    }
    return(
        <div className ="sign-in">
            <h2 className = "sign-in-form-title">LOGIN IN HERE!</h2>
            
                <form className = 'sign-in-form'onSubmit={handleSubmit}> 
                    <div className='sign-in-label'>
                        <FormInput 
                            type="email" 
                            name="email" 
                            label={"PNR/ Email"}
                            value={userCrendetial.email} 
                            required
                            handleChange={handleOnchnage} />
                            
                        <FormInput
                                type="password"
                                name="password"
                                label={"AGE/ Password"}
                                value={userCrendetial.password} 
                                required
                                handleChange ={handleOnchnage}/>
                         </div>       
                            <div className='form-button'>
                                <CustumButton 
                                    type ="submit">
                                        Sign In
                                </CustumButton>
                         </div>
                </form> 
          </div>
    );
// }
}
const mapDispatchToProps =(dispatch)=>({
})
  
export default connect(null,mapDispatchToProps)(SignInComponent) ;