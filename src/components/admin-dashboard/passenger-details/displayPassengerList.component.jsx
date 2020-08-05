import React, { Fragment, useEffect, useState } from 'react';
import './admin-dashboard.styles.scss';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Link} from 'react-router-dom'

import Spinner from '../../CustumComponents/spinner/spinner.component' ;
import ErrorComponent from '../../CustumComponents/ErrorComponent/errorComponent' ;
import PassengerInfo from './passenger-info-display.component';
import DisplayValue from '../../CustumComponents/custum-select/custumSelect.component';


import{
    startFetchingAdminPassengers
} from '../../../store/admin/admin.action'
import{
    selectLoadingState,
    selectErrorState,
    selectAllPassengers,
    selectAllPassengersWithWheelChairs,
    selectAllPassengersWithInfants,
    selectAllPassengersWithMeals,
    selectAllPassengersWithInPayPerView,
    selectAllCheckedInPassengers,
    selectAllNotCheckedInPassengers,
    selectFlightNoMappedPassengers,
    selectAllPassengersWithoutAddress,
    selectAllPassengersWithoutDOB,
    selectAllPassengersWithoutPassport,
    selectAllPassengersWithWheelChairsForParticularFlight,
    selectAllPassengersWithInfantsForParticularFlight,
    selectAllPassengersWithPayPerViewForParticularFlight,
    selectPassengerForParticularFlight,
    selectAllNotCheckedInPassengersForParticularFlight,
    selectAllCheckedInPassengersForParticularFlight,
    selectAllPassengersWithMealsForParticularFlight,
    selectAllPassengersWithoutMealsForParticularFlight,
    selectAllPassengersWithoutDOBForParticularFlight,
    selectAllPassengersWithoutAddressForParticularFlight,
    selectAllPassengersWithoutPassportForParticularFlight
    
} from '../../../store/admin/admin.selector'
import { selectSignUserType } from '../../../store/user/user.selector';





 const DisplayPassengersList =({
    airlineNo,userType,isLoading, isError, startFetchingAllPassengers,
    flightNoBasedPassengers,flightMappedPassengers,allWheelChairPassengers,
    allPassengersWithInfants, allPassengersWithPayPerView,notCheckedInPassengers,
    allCheckedInPassengers,allPassengersWithMeals,allPassengersWithoutMeals,
    allPassengersWithoutAddress,allPassengersWithoutDOB,allPassengersWithoutPassport,
    totalPassengers,totalCheckedInPassengers,totalPassengersWithInfants,totalNotCheckedInPassengers,
    totalWheelChairPassengers,totalPassengersWithMeals,totalPassengersWithPayPerView,
    totalPassengersWithoutAddress,totalPassengersWithoutDOB,totalPassengersWithoutPassport
    })=>{
    
    const[displayPassengers , setdisplayPassengers] = useState();

    useEffect(()=>{startFetchingAllPassengers()},[]);
    useEffect(()=>{ 
            if(airlineNo){
                setdisplayPassengers(flightNoBasedPassengers)
           }else{
            setdisplayPassengers(totalPassengers)
           }
        },[flightNoBasedPassengers, airlineNo,totalPassengers]);
    
    const filterDisplayOptionsForParticularFlight = [
            {value:'All'},{value: 'Checked IN'},{value: 'Not Checked IN'}, {value: 'With-Infants'},{value: 'With-PayPerView'},
            {value: 'With-Wheelchair'},{value: 'with Meals'},{value: 'without Meals'},{value: 'without passport'}
            ,{value: 'without Address'},{value: 'without DOB'}  
        ];
        
    const filterDisplayOptions = [    
        {value:'All'},{value:'Flight-PQ001'},{value:'Flight-PQ002'},{value:'Flight-PQ003'},{value:'Flight-PQ004'},
        {value:'Flight-PQ005'},{value: 'With-Infants'},{value: 'With-PayPerView'},{value: 'With-Wheelchair'}
        ,{value: 'Checked IN'},{value: 'with Meals'},{value: 'Not Checked IN'},{value: 'without passport'}
        ,{value: 'without Address'},{value: 'without DOB'}];

    const changeFilterForParticularFlight =(value)=>{
        if(value === 'All'){setdisplayPassengers(flightNoBasedPassengers)};
        if(value ==='With-Wheelchair'){setdisplayPassengers(allWheelChairPassengers)};
        if(value ==='With-Infants'){setdisplayPassengers(allPassengersWithInfants)};
        if(value ==='With-PayPerView'){setdisplayPassengers(allPassengersWithPayPerView)}
        if(value ==='Checked IN'){setdisplayPassengers(allCheckedInPassengers)}
        if(value ==='Not Checked IN'){setdisplayPassengers(notCheckedInPassengers)}
        if(value ==='with Meals'){setdisplayPassengers(allPassengersWithMeals)}
        if(value ==='without Meals'){setdisplayPassengers(allPassengersWithoutMeals)}
        if(value ==='without passport'){setdisplayPassengers(allPassengersWithoutPassport)}  
        if(value ==='without Address'){setdisplayPassengers(allPassengersWithoutAddress)}  
        if(value ==='without DOB'){setdisplayPassengers(allPassengersWithoutDOB)}   
    }   
    
    const changeFilter =(value)=>{
        if(value === 'All'){setdisplayPassengers(totalPassengers)};
        if(value ==='With-Wheelchair'){setdisplayPassengers(totalWheelChairPassengers)};
        if(value ==='With-Infants'){setdisplayPassengers(totalPassengersWithInfants)};
        if(value ==='With-PayPerView'){setdisplayPassengers(totalPassengersWithPayPerView)}
        if(value ==='Checked IN'){setdisplayPassengers(totalCheckedInPassengers)}
        if(value ==='Not Checked IN'){setdisplayPassengers(totalNotCheckedInPassengers)}
        if(value ==='with Meals'){setdisplayPassengers(totalPassengersWithMeals)}
        if(value ==='without passport'){setdisplayPassengers(totalPassengersWithoutPassport)}  
        if(value ==='without Address'){setdisplayPassengers(totalPassengersWithoutAddress)}  
        if(value ==='without DOB'){setdisplayPassengers(totalPassengersWithoutDOB)} 
        if(value.startsWith('F')){
                const flightNumber = value.split('-')[1];
                setdisplayPassengers(flightMappedPassengers[flightNumber])
            }       
    } 
    return(
        <Fragment>
            { isLoading? <Spinner/>: isError? <ErrorComponent/>:
                <div className='all-passenger-description-container'>
                  <div style ={{paddingBottom: '25px', fontWeight: "bolder" , fontSize:'22px'}}>
                     {airlineNo? `Passengers list for Flight No - ${airlineNo}`: `All Passengers List`} 
                  </div>    
                  <div className='alp-filter'>
                       <Link style={{paddingRight: '4px', fontWeight: "bolder", cursor: "pointer",color:'cornflowerblue'}} to = '/'>
                             Dashboard</Link>
                             
                      { userType=== 'Admin' && <Link style={{paddingRight: '4px', fontWeight: "bolder", cursor: "pointer",color:'cornflowerblue'}} 
                                to ={airlineNo?'/admin/manage': '/admin/addpassengers' } > 
                                {airlineNo? 'Manage Services': 'Add Passengers'}
                                </Link>}
                                
                        <div style={{paddingRight: '4px'}}>Total Passengers&nbsp;:&nbsp;&nbsp;{ displayPassengers && displayPassengers.length} </div>  
                        <div> <span > Filter By &nbsp;: &nbsp;&nbsp; </span>  
                        <DisplayValue name='passenger-filter' id='passenger-filter'editable = {true} 
                        handleChange ={airlineNo? changeFilterForParticularFlight: changeFilter } 
                        options ={airlineNo?filterDisplayOptionsForParticularFlight: filterDisplayOptions} 
                        />
                        </div>
                  </div>
                   <div className='alp-discription-title'>
                        <div className= 'alp-heading'>S.No</div>
                        <div className= 'alp-heading'>Name</div>
                        <div className= 'alp-heading'>SeatNo</div>
                        <div className= 'alp-heading'>Ancillary Services</div>
                        <div className= 'alp-heading'>Delete</div>
                        <div className= 'alp-heading'>Update</div>
                        
                    </div>
                        {displayPassengers && displayPassengers.map((passenger, index)=>{
                           return <PassengerInfo key={index} data={passenger} sno={index}/> 
                        }
                                      
                         )}
                </div>
            }
        </Fragment>
    )
}

const mapStateToProps =(state, propsFromParrentComponent)=>(
  {
        isLoading: selectLoadingState(state),
        userType: selectSignUserType(state),
        isError: selectErrorState(state),
        flightMappedPassengers: selectFlightNoMappedPassengers(state),
        totalPassengers: selectAllPassengers(state),
        totalWheelChairPassengers:selectAllPassengersWithWheelChairs(state),
        totalPassengersWithInfants:selectAllPassengersWithInfants(state),
        totalPassengersWithMeals:selectAllPassengersWithMeals(state),
        totalPassengersWithPayPerView:selectAllPassengersWithInPayPerView(state),
        totalCheckedInPassengers:selectAllCheckedInPassengers(state),
        totalNotCheckedInPassengers: selectAllNotCheckedInPassengers(state),
        totalPassengersWithoutAddress:selectAllPassengersWithoutAddress(state),
        totalPassengersWithoutDOB:selectAllPassengersWithoutDOB(state),
        totalPassengersWithoutPassport:selectAllPassengersWithoutPassport(state),
        allWheelChairPassengers: selectAllPassengersWithWheelChairsForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        allPassengersWithInfants:selectAllPassengersWithInfantsForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        allPassengersWithPayPerView: selectAllPassengersWithPayPerViewForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        flightNoBasedPassengers: selectPassengerForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        notCheckedInPassengers:selectAllNotCheckedInPassengersForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        allCheckedInPassengers: selectAllCheckedInPassengersForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        allPassengersWithMeals: selectAllPassengersWithMealsForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        allPassengersWithoutMeals:selectAllPassengersWithoutMealsForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        allPassengersWithoutDOB:selectAllPassengersWithoutDOBForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        allPassengersWithoutAddress:selectAllPassengersWithoutAddressForParticularFlight(propsFromParrentComponent.airlineNo)(state),
        allPassengersWithoutPassport:selectAllPassengersWithoutPassportForParticularFlight(propsFromParrentComponent.airlineNo)(state)
    }
)
const mapDispatchToprops =dispatch=>{
    return{
        startFetchingAllPassengers: ()=>dispatch(startFetchingAdminPassengers())
    }
}

export default connect(mapStateToProps,mapDispatchToprops)(DisplayPassengersList);