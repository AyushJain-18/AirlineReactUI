import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';


import ErrorContainer from '../errorContainer/error-container';
import WithSpinnerContaienr from '../with-spinner-container/with-spinner.container';
import SaetMapComponent from '../../components/seat-map/seat-map-container/seat-map.component';
import { 
    selectAllPassengerFetchngStatus,
    selectAllPassengerErrorStatus
        } from '../../store/allpassenger/allpassenger.select';

const mapStateToProps = (state)=>{
    return{
        isLoading: selectAllPassengerFetchngStatus(state),
        isError: selectAllPassengerErrorStatus(state)
    }
}
const SeatMapContainer= compose(
    connect(mapStateToProps),
    WithSpinnerContaienr,
    ErrorContainer
)(SaetMapComponent)

export default SeatMapContainer;