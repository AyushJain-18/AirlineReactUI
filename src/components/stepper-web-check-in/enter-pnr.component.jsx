import React ,{useState, useEffect}from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import FormInput from '../CustumComponents/form-input/form-input.component';
import { connect } from 'react-redux';
import {
    changeStateOfDisplayNext,
    addPassengerPNRToReducer,
    pnrPassengerInfoStart
} from '../../store/allpassenger/allpassenger.action'

import{selectIsPNRFecthedHasAlreadyCheckedIn} from '../../store/allpassenger/allpassenger.select'
const useStyle = makeStyles(()=>{
    return{
        pnrContainer:{
                width:'95%',
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
        },
        errorMsg:{
            color: 'red',
            letterSpacing: '1px'
        },
        checkInMsg:{
            color: 'blue',
            letterSpacing: '1px'
        }
    }
})

const PNRInputCompoennt =({fetchPassengerInfoFromPNR,addPNRToStore,changeNextButtonState,isPassengerCheckIn})=>{
    console.log('isPassengerCheckIn',isPassengerCheckIn)
    const classes = useStyle()
    const [pnrValue, setpnrValue] = useState('');
    const [displayPNRFormatError, setdisplayPNRFormatError] = useState(false);
    useEffect(() => {
        changeNextButtonState(false)
      }, [])
    useEffect(() => {
        if(pnrValue.length>0 && !displayPNRFormatError){
            console.log('event Fired')
           //  changeNextButtonState(true)
           fetchPassengerInfoFromPNR(pnrValue)
           addPNRToStore(pnrValue)
        } else{
            changeNextButtonState(false)
        } 
      }, [pnrValue,displayPNRFormatError])
    const checkPNRPatter=(value)=>{
        const regexPattern= /PQ00([1-5])XY([0][1-9]|[1-2][0-9]|[3][0])$/; 
        let isEnterPNRmatched =  regexPattern.test(value);
        console.log(isEnterPNRmatched)
        setdisplayPNRFormatError(!isEnterPNRmatched)
    }
    const handelChange =(event)=>{
        let {value} = event.target;
        setpnrValue(value);
        checkPNRPatter(value);
        
    }
    return(
        <div className={classes.pnrContainer}>
                <FormInput
                    handleChange={handelChange}
                    label={'Enter PNR'}
                    value={pnrValue}
                    name='enter PNR'
                    id='pnr-1'
                />
                {
                    displayPNRFormatError? <div className ={classes.errorMsg}>
                        Pls check your PNR</div>: null
                    
                }
                {
                   isPassengerCheckIn? <div className ={classes.checkInMsg}>
                       Passenger Already Check In</div>: null
                        // <div>{()=>changeNextButtonState(true)}</div>
                    
                }
        </div>
    )
}
const mapStateToProps =(state)=>({
    isPassengerCheckIn: selectIsPNRFecthedHasAlreadyCheckedIn(state)
})

const mapDispatchToProps =(dispatch)=>{
    return{
        changeNextButtonState: (value)=>dispatch(changeStateOfDisplayNext(value)),
        addPNRToStore: (PNR)=> dispatch(addPassengerPNRToReducer(PNR)),
        fetchPassengerInfoFromPNR:(PNR)=>dispatch(pnrPassengerInfoStart(PNR))
    }
   
}

export default connect(mapStateToProps, mapDispatchToProps)(PNRInputCompoennt) 