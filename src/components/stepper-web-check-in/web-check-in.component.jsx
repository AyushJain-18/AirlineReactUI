
import React from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux';

import GetStepContentComponent ,{
        QontoConnector,
        QontoStepIcon,
        useStyles,
        getSteps
}from './web-check-in-stepper.component';
import CustumButton from '../CustumComponents/CustumButon/custumButton.component';
import {selectNextButtonState} from '../../store/allpassenger/allpassenger.select';




 const  WebCheckInStepperComponent=({nextButtonState})=> {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if(nextButtonState){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
      if(activeStep>0){
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      }
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
                <GetStepContentComponent step ={activeStep}/>
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