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
import { selectisError } from '../../store/user/user.selector';


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
      marginTop: '100px',
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
  }));
  
 export  function getSteps() {
    return ['Enter PNR', 'Update seat', 'Auxilary Service'];
  }
  
  const GetStepContentComponent=({step,flightNo,seatNo,updatedSeatNo,isLoading,
          newSeatNumber,removeAlreadySelectedSeat, fetchedPassenger})=> {
      // THIS WILL RENDER OUR COMPONENT AGAIN, SO WE WILL GET NEW FILGHT NO ENTERED BY USER
      // console.log('fetchedPassenger', fetchedPassenger)
      useEffect(()=>{
        removeAlreadySelectedSeat();
      },[flightNo])
    const setPreviousSeatNumber=(seatNo)=>{
      newSeatNumber(seatNo);
      removeAlreadySelectedSeat()
    }  
    const getStepComponent =(step)=>{
      switch (step) {
        case 0:
          return <PNRInputCompoennt/>
        case 1:
            return(
                <Fragment>
                    <SeatMapContainer airlineNo={flightNo} 
                      style ={{widht: '90%'}}
                    showNotAllowedPointer={true}/>
                    { updatedSeatNo? 
                      <div>
                          Your new seat number is {updatedSeatNo}
                          <span onClick ={()=>setPreviousSeatNumber(seatNo)}
                                style={{cursor: 'pointer'}}
                          > &#10008; </span>
                      </div>:`Your seat number is ${seatNo}`
                    }
                </Fragment>
            ) 
        case 2: 
        //key= {new Date().getMilliseconds()}s
          return <Fragment>
               {isLoading && <Spinner/>}
                     <PassengerAuxilarysDescriptionComponent 
                        passengerData={fetchedPassenger}
                        width={'80%'}
                        editable ={true}
                        />
             </Fragment>;
        
        default:
          return  <div>Unknown step</div>;
      }
    }
    return(
      <Fragment key={step}>
      { getStepComponent(step)}
      </Fragment>
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
      newSeatNumber: (seatNo)=> dispatch(onNewSeatSelected(seatNo))
  })
  export default connect(mapStateToProps, mapDispatchToProps)(GetStepContentComponent);