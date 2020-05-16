import React from 'react';
import passengerInfoComponent from '../../components/passengerInfo/passengerInfo.component';
import ErrorContainer from '../errorContainer/error-container';
import WithSpinnerContainer from '../with-spinner-container/with-spinner.container';

import {connect} from 'react-redux';
import {compose} from 'redux'

import{selectDisplaySpinnerStatus, selectUserError} from '../../store/user/user.selector';

const mapStateToProps =(state)=>(
    {
        isLoading: selectDisplaySpinnerStatus(state),
        isError: selectUserError(state)
    }
)
const InFlightDashBoardContainer = compose(
connect(mapStateToProps),
WithSpinnerContainer,
ErrorContainer
)(passengerInfoComponent);

export default InFlightDashBoardContainer;