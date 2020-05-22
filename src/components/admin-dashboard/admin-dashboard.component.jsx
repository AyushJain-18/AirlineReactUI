import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './admin-dashboard.styles.scss';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Spinner from '../CustumComponents/spinner/spinner.component' ;
import ErrorComponent from '../CustumComponents/ErrorComponent/errorComponent' ;
import PassengerAuxilarysDescriptionComponent from '../passenger-info/passenger-auxilarys-discription/passenger-auxilarys-description.component';
import PassengerGeneralInfoComponent from '../passenger-info/passenger-gerenral-info/passenger-general-info.component';

import{
    startFetchingAdminPassengers
} from '../../store/admin/admin.action'
import{
    selectLoadingState,
    selectErrorState,
    selectAllPassengers
} from '../../store/admin/admin.selector'

const PassengerInfo =({data, sno})=>{
    const{PNR, age, airlineNumber,firstName}= data;
    const[display, setdisplay]= useState(false);
    if(window.innerWidth === 700){
        
    }
    return(
        <Fragment>
            <div className='alp-passenger-container'>
                    <div className='alp-passenger-discription'>
                        <div className= 'alp-discription'>{sno +1}</div>
                        <div className= 'alp-discription'>{PNR}</div>
                        <div className= 'alp-discription'>{age}</div>
                        <div className= 'alp-discription'>{airlineNumber}</div>
                        <div className= 'alp-discription'>{firstName}</div>
                        <div className= 'alp-discription'>
                            { display && <span className='pointer' onClick={()=>setdisplay(false)} >&#10008;</span> }
                            { !display && <FontAwesomeIcon className='pointer' icon={faBars} onClick={()=>setdisplay(true)}/>}
                        </div>
                    </div>  
                   {display && <div className= 'alp-update'>
                                        <PassengerGeneralInfoComponent passengerData={data} width={'35%'}/>
                                         <PassengerAuxilarysDescriptionComponent passengerData={data} width={'35%'}/>
                                </div>
                    }
                </div>
        </Fragment>
    )
}

 const AdminDashBoardComponent =({isLoading, isError, startFetchingAllPassengers,allPassengers})=>{
    useEffect(()=>{
        startFetchingAllPassengers()
    },[])
    return(
        <Fragment>
            { isLoading? <Spinner/>: isError? <ErrorComponent/>:
                <div className='all-passenger-description-container'>
                    <div className='alp-discription-title'>
                        <div className= 'alp-heading'>S.No</div>
                        <div className= 'alp-heading'>PNR</div>
                        <div className= 'alp-heading'>Age</div>
                        <div className= 'alp-heading'>Flight No</div>
                        <div className= 'alp-heading'>Name</div>
                        <div className= 'alp-heading'>Update</div>
                    </div>
                    <div className='alp-passengers-info'>
                        {allPassengers &&
                         allPassengers.map((passenger, index)=> <PassengerInfo key={index} data={passenger} sno={index}/>)
                        }
                    </div>
                </div>
            }
        </Fragment>
    )
}

const mapStateToProps =createStructuredSelector(
    {
        isLoading: selectLoadingState,
        isError: selectErrorState,
        allPassengers: selectAllPassengers
    }
)
const mapDispatchToprops =dispatch=>{
    return{
        startFetchingAllPassengers: ()=>dispatch(startFetchingAdminPassengers())
    }
}

export default connect(mapStateToProps,mapDispatchToprops)(AdminDashBoardComponent);