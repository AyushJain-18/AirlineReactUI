import React ,{useState} from 'react';
import './sign-in.comonent.scss'

import FormInput from '../CustumComponents/form-input/form-input.component'
import CustumButton from '../CustumComponents/CustumButon/custumButton.component'

import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux';
import { userSignInStart } from '../../store/user/user.actions';

import {createStructuredSelector} from 'reselect';
import {
  selectUserEnteredWrongCredentialStatue,
  selectUserData,
  selectSignUserType
}  from '../../store/user/user.selector'

const  SignInComponent =({userSignInStartAction,isWrongCredentialEntered,userData, userType})=>{

  const [userCrendetial, setUserCredebtials]= useState({email: '', password: ''}); 
  const handleSubmit=(event)=>{
    event.preventDefault();
    userSignInStartAction(userCrendetial)
  }
  const handleOnchnage=(event)=>{
    const{name,value} = event.target;
    setUserCredebtials({...userCrendetial, [`${name}`]: value})
  }
  return(
    <div className ="sign-in">
      <h2 className = "sign-in-form-title">LOGIN IN HERE!</h2>

      { 
        isWrongCredentialEntered?
          <div className='wrongCredentials'>Incorrect user Id Or Password</div>
          :userData?(userType === 'Crew'?<Redirect to='/'/>:<Redirect to={`${userType}`}/>)
            : null 
      }
      <form className = 'sign-in-form'onSubmit={handleSubmit}> 
        <div className='sign-in-label'>
          <FormInput 
            type="text" 
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
const mapStateToProps = createStructuredSelector(
  {
    isWrongCredentialEntered: selectUserEnteredWrongCredentialStatue,
    userData: selectUserData,
    userType: selectSignUserType
  }
)
const mapDispatchToProps =(dispatch)=>({
  userSignInStartAction: (userCrendetial)=> dispatch(userSignInStart(userCrendetial))
})
  
export default connect(mapStateToProps,mapDispatchToProps)(SignInComponent) ;