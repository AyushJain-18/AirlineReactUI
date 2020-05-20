
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CustumButton from '../CustumComponents/CustumButon/custumButton.component';
import PNRInputCompoennt from './enter-pnr.component';
import PassengerAuxilarysDescriptionComponent from '../passenger-info/passenger-auxilarys-discription/passenger-auxilarys-description.component';
import {selectNextButtonState} from '../../store/allpassenger/allpassenger.select'

import {connect} from 'react-redux'
/**
 * QontoConnector
 * An element to be placed between each step.
*/
const QontoConnector = withStyles({
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
const useQontoStepIconStyles = makeStyles({
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
function QontoStepIcon(props) {
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
const useStyles = makeStyles((theme) => ({
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

function getSteps() {
  return ['Enter PNR', 'Seat Selection', 'Auxilary Service'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PNRInputCompoennt/>
    case 1:
        return 'This is the bit I really care about!';
    case 2:
      return <PassengerAuxilarysDescriptionComponent/>;
    default:
      return 'Unknown step';
  }
}
 const  WebCheckInStepperComponent=({nextButtonState})=> {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
     
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
                <div className={classes.stepLabel}>{label}</div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>


      <div>
        {activeStep === steps.length ? (
          <div className ={classes.finish}>
            <Typography className={classes.finishText}>SuccessFully Checked In</Typography>
            <CustumButton style={{width: '100px'}} onClick={handleReset} inverted>NEW-PNR</CustumButton>
          </div>
            ) : (
          <div className= {classes.instructions}>
                {getStepContent(activeStep)}
                <div className={classes.buttonContainer}>
                    <CustumButton  onClick={handleBack} disabled={activeStep === 0}>
                        Back
                    </CustumButton>
                    <CustumButton onClick={handleNext} disabled={!nextButtonState}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </CustumButton>
                </div>
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps =(state)=>{
  return{
    nextButtonState: selectNextButtonState(state)
  }
} 

export default connect(mapStateToProps)(WebCheckInStepperComponent);