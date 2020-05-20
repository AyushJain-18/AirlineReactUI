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
//selector
import {
    selectFlightNoFromPNREnteredWhileWebCheckIn,
    selectSeatNoOfSelectedPassenger} from '../../store/allpassenger/allpassenger.select'
//acion
import{clearSelectedPassengerSeatNo} from '../../store/allpassenger/allpassenger.action'
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
      marginTop: '100px',
      display: 'flex',
      justifyContent: 'space-evenly',
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
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontFamily: 'Open Sans Condensed',
      fontSize: '16px',
      fontWeight: "bold"
    },
  }));
  
 export  function getSteps() {
    return ['Enter PNR', 'Seat Selection', 'Auxilary Service'];
  }
  
  const GetStepContentComponent=({step,flightNo,selectedSeat,removeAlreadySelectedPassenger})=> {
      // THIS WILL RENDER OUR COMPONENT AGAIN, SO WE WILL GET NEW FILGHT NO ENTERED BY USER
      useEffect(()=>{
        removeAlreadySelectedPassenger();
      },[flightNo])
    const getStepComponent =(step)=>{
      switch (step) {
        case 0:
          return <PNRInputCompoennt/>
        case 1:
            return(
                <Fragment>
                    <SeatMapContainer airlineNo={flightNo}/>
                    {selectedSeat&& `Seat selected is ${selectedSeat}`}
                </Fragment>
            ) 
        case 2:
          return <PassengerAuxilarysDescriptionComponent/>;
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
        selectedSeat: selectSeatNoOfSelectedPassenger(state)
  })

  const mapDispatchToProps =(dispatch)=>({
      removeAlreadySelectedPassenger: ()=>dispatch(clearSelectedPassengerSeatNo())
  })
  export default connect(mapStateToProps, mapDispatchToProps)(GetStepContentComponent);