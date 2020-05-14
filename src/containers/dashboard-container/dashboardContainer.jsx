import React from 'react';

import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux'


import Dashboard from '../../pages/dashboard.page';
import WithSpinnerContainer from '../with-spinner-container/with-spinner.container';
import ErrorContainer from '../errorContainer/error-container'

import { selectFlightFecthedStatus,
         selectFlightFetchedErrorStatus}
    from '../../store/flight/flight.selector';





const mapStateToProps = state=>(
    {
        isLoading: selectFlightFecthedStatus(state),
        isError: selectFlightFetchedErrorStatus(state)
    }
    )

const DashBoardContainer = compose(
    connect(mapStateToProps),
    WithSpinnerContainer,
    ErrorContainer
)(Dashboard);


export default DashBoardContainer;