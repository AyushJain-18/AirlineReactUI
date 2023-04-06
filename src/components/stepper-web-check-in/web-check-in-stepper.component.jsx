import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

//style
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
//react-redux
import {connect} from 'react-redux';
// component
import PNRInputCompoennt from './enter-pnr.component';
import PassengerAuxilarysDescriptionComponent from '../passenger-info/passenger-auxilarys-discription/passenger-auxilarys-description.component';
import SeatMapContainer  from '../../containers/seat-map-conatiner/seat-map.container'
import Spinner from '../CustumComponents/spinner/spinner.component';
import CustumButton from '../CustumComponents/CustumButon/custumButton.component';
import{changeStateOfDisplayNext} from '../../store/allpassenger/allpassenger.action';

//selector
import {
    selectFlightNoFromPNREnteredWhileWebCheckIn,
    selectSeatNoOfFetchedPassengerFromPNR,
    selectUpdatedSeat,
    selectPassengerInfoOfFetchedPassengerFromPNR,
    selectAllPassengerFetchngStatus
} from '../../store/allpassenger/allpassenger.select'
//acion
import{
  clearNewSeatSelectedByPassenger,
  onNewSeatSelected
} from '../../store/allpassenger/allpassenger.action'

import {
  startPassengerInfoUpdate
} from '../../store/user/user.actions'
import { useState } from 'react';
import { StepContent } from '@material-ui/core';



/**
 * QontoConnector
 * An element to be placed between each step.
*/
export const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#aeabab'//'#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor:'#aeabab'// '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);
  
   // icon style classes
  export const useQontoStepIconStyles = makeStyles({
      root: {
        color: "#eaeaf0",
        display: "flex",
        height: 22,
        alignItems: "center"
      },
      active: {
        color: '#aeabab' // "#784af4"
      },
      circle: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor"
      },
      completed: {
        color: 'black',//"#784af4",
        zIndex: 1,
        fontSize: 18
      }
    });
  // CompoentIcons:- to be displyed in place of number/step

  export function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
  };
  
  // web-check-in component styles
 export  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      // height: '1000px'
    },
    stepLabel:{
      fontFamily: 'Open Sans Condensed',
      fontSize: '16px',
      fontWeight: "bold"
    },
    buttonContainer: {
      display: 'flex',
      margin: '100px 0px',
      width: '264px',
      justifyContent:' space-around'
    },
     finish: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
    },
    finishText: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontFamily: 'Open Sans Condensed',
      fontSize: '26px',
    },
    instructions: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Open Sans Condensed',
      fontSize: '16px',
      fontWeight: "bold"
    },
    seatStatus:{
      fontSize: "20px",
      color: "lightcoral"
    },
    centerButtonContainer: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: 'center'
    },
    AuxilaryContainer: {
      display: 'flex',
      flexDirection: "column",
      justifyContent: 'center'
    }
  }));
  
 export  function getSteps() {
    return ['Enter PNR', 'Update seat', 'Auxilary Service'];
  }
  
  const GetStepContentComponent=({step,flightNo,seatNo,updatedSeatNo,isLoading,
          newSeatNumber,removeAlreadySelectedSeat, fetchedPassenger,updateSeat,changeNextButtonState})=> {
            const classes= useStyles()
      const[stepNo, setStepNo]  = useState(0)
      useEffect(()=>{
        removeAlreadySelectedSeat();
      },[flightNo])

      useEffect(()=>{
        if(stepNo === 1){
          if(!!seatNo || !!updatedSeatNo ){ // when anyone of them have value 
            changeNextButtonState(true) // display next button
          }else{
            changeNextButtonState(false)  // when both are empty then dont display next button
          }
        }
      }, [seatNo,updatedSeatNo,stepNo])

    const setPreviousSeatNumber=(seatNo)=>{
      newSeatNumber(seatNo);
      removeAlreadySelectedSeat()
    }  
    const onUpdateSeat =()=>{
      const {id,airlineNumber,PNR} = fetchedPassenger;
      const updatedData = {...fetchedPassenger, seatNo:updatedSeatNo}
      updateSeat(id,airlineNumber,updatedData,'Crew',PNR)
    }
    const getStepComponent =(step)=>{
       //PQ001XY20
      switch (step) {
        case 0:
          if(stepNo !==0){
            setStepNo(step);
          }
          return <PNRInputCompoennt/>
        case 1:
          if(stepNo !==1){
            setStepNo(step);
          }
            return(
                <Fragment>
                    { updatedSeatNo? 
                      <div className= {classes.seatStatus}> Your new seat number is {updatedSeatNo}
                          <span onClick ={()=>setPreviousSeatNumber(seatNo)}style={{cursor: 'pointer', color: 'black'}}> &#10008;</span>
                      </div>:
                      <div className= {classes.seatStatus}> {seatNo? `Your seat number is ${seatNo}`: 'Please slect a seat'} </div>
                    }
                    <SeatMapContainer airlineNo={flightNo} style ={{widht: '100%'}} isWebCheckIn={true} />
                   { updatedSeatNo && <div className ={classes.centerButtonContainer}>
                      <CustumButton onClick ={onUpdateSeat}> Update Seat here </CustumButton>
                    </div>}
                </Fragment>
            ) 
        case 2: 
        if(stepNo !==2){
          setStepNo(step);
        }
        //key= {new Date().getMilliseconds()}s
          return(
               <div className ={classes.AuxilaryContainer}>
                 {isLoading && <Spinner/>}
                 { updatedSeatNo? 
                      <div className= {classes.seatStatus} style={{marginBottom: '20px'}}> Your new seat number is {updatedSeatNo}
                          <span onClick ={()=>setPreviousSeatNumber(seatNo)}style={{cursor: 'pointer', color: 'black'}}> &#10008;</span>
                      </div>:
                      <div className= {classes.seatStatus} style={{marginBottom: '20px'}}> {seatNo? `Your seat number is ${seatNo}`: 'NO seat Selected, Please press back button and slect a new seat'} </div>
                    }
                    <div className={classes.centerButtonContainer}>
                   { (updatedSeatNo || seatNo) &&  <PassengerAuxilarysDescriptionComponent 
                        passengerData={fetchedPassenger}
                        width={'80%'}
                        editable ={true}
                        />}
                    </div>
                </div>
                )
        
        default:
          return  <div>Unknown step</div>;
      }
    }
    return(
      <div key={step} style={{width: '100%'}}>
      { getStepComponent(step)}
      </div>
    )
   
  }

  const mapStateToProps =(state)=>({
        flightNo: selectFlightNoFromPNREnteredWhileWebCheckIn(state),
        seatNo: selectSeatNoOfFetchedPassengerFromPNR(state),
        updatedSeatNo:  selectUpdatedSeat(state),
        fetchedPassenger: selectPassengerInfoOfFetchedPassengerFromPNR(state),
        isLoading:  selectAllPassengerFetchngStatus(state)
  })

  const mapDispatchToProps =(dispatch)=>({
      removeAlreadySelectedSeat: ()=>dispatch(clearNewSeatSelectedByPassenger()),
      changeNextButtonState: (value)=>(dispatch(changeStateOfDisplayNext(value))),
      newSeatNumber: (seatNo)=> dispatch(onNewSeatSelected(seatNo)),
      updateSeat: (id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR)=>dispatch(startPassengerInfoUpdate(id,airlineNumber,updatedData,logedInUserType,checkInPassengerPNR))
  })
  export default connect(mapStateToProps, mapDispatchToProps)(GetStepContentComponent);