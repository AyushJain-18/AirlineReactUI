import React ,{useState, Fragment ,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormInput from '../CustumComponents/form-input/form-input.component';
import Spinner from '../CustumComponents/spinner/spinner.component';

import { connect } from 'react-redux';
import {
  changeStateOfDisplayNext,
  addPassengerPNRToReducer,
  pnrPassengerInfoStart,
  pnrPassengerInfoRemove
} from '../../store/allpassenger/allpassenger.action'

import{
  selectIsPNRFecthedHasAlreadyCheckedIn,
  selectPassengerInfoOfFetchedPassengerFromPNR,
  selectAllPassengerFetchngStatus
} from '../../store/allpassenger/allpassenger.select'

const useStyle = makeStyles(()=>{
  return{
    pnrContainer:{
      width:'100%',
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

const PNRInputCompoennt =({ fetchPassengerInfoFromPNR, isLoading,addPNRToStore,removeFetchedPassenger,
  changeNextButtonState,isPassengerCheckIn,passengerData})=>{
  // console.log('isPassengerCheckIn',isPassengerCheckIn)
  const classes = useStyle()
  const [pnrValue, setpnrValue] = useState('');
  const [displayPNRFormatError, setdisplayPNRFormatError] = useState(false);
  useEffect(() => {
    changeNextButtonState(false)
    removeFetchedPassenger()
  }, [])
  useEffect(() => {
    if(pnrValue.length>0 && !displayPNRFormatError){
      // console.log('event Fired')
      //  changeNextButtonState(true)
      fetchPassengerInfoFromPNR(pnrValue)
      addPNRToStore(pnrValue)
    } else{
      changeNextButtonState(false)
    } 
  }, [pnrValue,displayPNRFormatError])
  const checkPNRPatter=(value)=>{
    const regexPattern= /PQ00([1-5])XY([0][1-9]|[1-5][0-9]|[6][0])$/; 
    let isEnterPNRmatched =  regexPattern.test(value);
    //console.log(isEnterPNRmatched)
    setdisplayPNRFormatError(!isEnterPNRmatched)
  }
  const handelChange =(event)=>{
    let {value} = event.target;
    setpnrValue(value);
    checkPNRPatter(value);
        
  }
  return(
    <div className={classes.pnrContainer}>
      { !isLoading? <Fragment>
        <FormInput
          handleChange={handelChange}
          label={'Enter PNR'}
          value={pnrValue}
          name='enter PNR'
          id='pnr-1'
        />
        {displayPNRFormatError&& pnrValue? <div className ={classes.errorMsg}>
                            Pls check your PNR</div>: null
        }
        {!passengerData && pnrValue? <div className ={classes.errorMsg}>
                        No Passenger Found </div>: null
        }
        {!displayPNRFormatError && isPassengerCheckIn? <div>
                        Passenger Already Check In, Click next to update seat</div>: null    
        }
        {!displayPNRFormatError && !isPassengerCheckIn && !!passengerData? <div>
                        Passenge is not Checked In, please click next to select seat</div>: null    
        }
      </Fragment>: <Spinner/>
      }
    </div>
  )
}
const mapStateToProps =(state)=>({
  isPassengerCheckIn: selectIsPNRFecthedHasAlreadyCheckedIn(state),
  passengerData:selectPassengerInfoOfFetchedPassengerFromPNR(state),
  isLoading: selectAllPassengerFetchngStatus(state),
    
})

const mapDispatchToProps =(dispatch)=>{
  return{
    changeNextButtonState: (value)=>dispatch(changeStateOfDisplayNext(value)),
    addPNRToStore: (PNR)=> dispatch(addPassengerPNRToReducer(PNR)),
    fetchPassengerInfoFromPNR:(PNR)=>dispatch(pnrPassengerInfoStart(PNR)),
    removeFetchedPassenger:()=>dispatch(pnrPassengerInfoRemove()) 
  }
   
}

export default connect(mapStateToProps, mapDispatchToProps)(PNRInputCompoennt) 