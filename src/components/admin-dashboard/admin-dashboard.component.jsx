import React, { Fragment, useEffect, useState } from 'react';
import './admin-dashboard.styles.scss';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Spinner from '../CustumComponents/spinner/spinner.component' ;
import ErrorComponent from '../CustumComponents/ErrorComponent/errorComponent' ;
import PassengerInfo from './passenger-info-display.component';
import DisplayValue from '../CustumComponents/custum-select/custumSelect.component';

import{
    startFetchingAdminPassengers
} from '../../store/admin/admin.action'
import{
    selectLoadingState,
    selectErrorState,
    selectAllPassengers,
    selectFlightNoMappedPassengers,
    selectAllPassengersWithWheelChairs,
    selectAllPassengersWithInfants,
    selectAllPassengersWithPayPerView
    
} from '../../store/admin/admin.selector'




 const AdminDashBoardComponent =({isLoading, isError, startFetchingAllPassengers,allPassengersInitial,
    flightMappedPassengers,allWheelChairPassengers, allPassengersWithInfants, allPassengersWithPayPerView})=>{
    const[allPassengers , setallPassengers] = useState();
    useEffect(()=>{startFetchingAllPassengers()},[]);
    useEffect(()=>{ setallPassengers(allPassengersInitial)},[allPassengersInitial]);
    const filterDisplayOptions = [
            {value:'All'},{value:'Flight-PQ001'},{value:'Flight-PQ002'},{value:'Flight-PQ003'},{value:'Flight-PQ004'},
            {value:'Flight-PQ005'},{value: 'With-Infants'},{value: 'With-PayPerView'},{value: 'With-Wheelchair'}
        ]
    const handleChangeForFilter =(value)=>{
        if(value === 'All'){setallPassengers(allPassengersInitial)};
        if(value ==='With-Wheelchair'){setallPassengers(allWheelChairPassengers)};
        if(value ==='With-Infants'){setallPassengers(allPassengersWithInfants)};
        if(value ==='With-PayPerView'){setallPassengers(allPassengersWithPayPerView)}
        // for all flight filters
        if(value.startsWith('F')){
                const flightNumber = value.split('-')[1];
                setallPassengers(flightMappedPassengers[flightNumber])
            }       
    }    
    return(
        <Fragment>
            { isLoading? <Spinner/>: isError? <ErrorComponent/>:
                <div className='all-passenger-description-container'>
                  <div className='alp-filter'>
                  <div>Total Passengers&nbsp;:&nbsp;&nbsp;{ allPassengers && allPassengers.length} </div> 
                      <div>
                        <span> Filter By &nbsp;: &nbsp;&nbsp; </span>  
                        <DisplayValue name='passenger-filter' id='passenger-filter'editable = {true} 
                        options ={filterDisplayOptions} handleChange ={handleChangeForFilter}/>
                      </div>
                    </div>
                    <div className='alp-discription-title'>
                        <div className= 'alp-heading'>S.No</div>
                        <div className= 'alp-heading'>PNR</div>
                        <div className= 'alp-heading'>Age</div>
                        <div className= 'alp-heading'>Flight No</div>
                        <div className= 'alp-heading'>Name</div>
                        <div className= 'alp-heading'>Update</div>
                    </div>
                        {allPassengers && allPassengers.map((passenger, index)=>
                           <PassengerInfo key={index} data={passenger} sno={index}/>            
                         )}
                </div>
            }
        </Fragment>
    )
}

const mapStateToProps =createStructuredSelector(
    {
        isLoading: selectLoadingState,
        isError: selectErrorState,
        allPassengersInitial: selectAllPassengers,
        flightMappedPassengers: selectFlightNoMappedPassengers,
        allWheelChairPassengers: selectAllPassengersWithWheelChairs,
        allPassengersWithInfants:selectAllPassengersWithInfants,
        allPassengersWithPayPerView: selectAllPassengersWithPayPerView
    }
)
const mapDispatchToprops =dispatch=>{
    return{
        startFetchingAllPassengers: ()=>dispatch(startFetchingAdminPassengers())
    }
}

export default connect(mapStateToProps,mapDispatchToprops)(AdminDashBoardComponent);