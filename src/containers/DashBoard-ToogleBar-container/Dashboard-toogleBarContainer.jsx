import React from 'react';
import DashboardToogleBarComponent from '../../pages/Dashboard-with-toogleBar/DashboardToogleBar.component';
import ErrorContainer from '../errorContainer/error-container';
import WithSpinnerContainer from '../with-spinner-container/with-spinner.container';

import {connect} from 'react-redux';
import {compose} from 'redux'

import{selectDisplaySpinnerStatus,selectisError} from '../../store/user/user.selector';

const mapStateToProps =(state)=>(
    {
        isLoading: selectDisplaySpinnerStatus(state),
        isError: selectisError(state)
    }
)
const DashboardToogleBarContainer = compose(
connect(mapStateToProps),
WithSpinnerContainer,
ErrorContainer
)(DashboardToogleBarComponent);

export default DashboardToogleBarContainer;