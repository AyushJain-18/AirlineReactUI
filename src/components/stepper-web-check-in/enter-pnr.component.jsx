import React ,{useState, useEffect}from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import FormInput from '../CustumComponents/form-input/form-input.component';
import { connect } from 'react-redux';
import {changeStateOfDisplayNext} from '../../store/allpassenger/allpassenger.action'
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
            letterSpacing: '1.2px'
        }
    }
})

const PNRInputCompoennt =({changeNextButtonState})=>{
    const classes = useStyle()
    const [pnrValue, setpnrValue] = useState('');
    const [displayPNRFormatError, setdisplayPNRFormatError] = useState(false);
    useEffect(() => {
        changeNextButtonState(false)
      }, [])
    useEffect(() => {
        if(pnrValue.length>0 && !displayPNRFormatError){
            console.log('event Fired')
            changeNextButtonState(true)
        } 
      }, [pnrValue,displayPNRFormatError])
    const checkPNRPatter=(value)=>{
        const regexPattern= /PQ00[1-5]XY[0-3][0-9]$/;
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
        </div>
    )
}
const mapDispatchToProps =(dispatch)=>{
    return{
        changeNextButtonState: (value)=>dispatch(changeStateOfDisplayNext(value))
    }
   
}

export default connect(null, mapDispatchToProps)(PNRInputCompoennt) 