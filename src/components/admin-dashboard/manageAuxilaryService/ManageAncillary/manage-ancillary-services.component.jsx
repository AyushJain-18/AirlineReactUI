import React, {useState, Fragment,useEffect} from 'react';
import {connect} from 'react-redux'

import './manage-ancillary-services.scss'

import DetailedAccordion from '../accordian/accordian-view';
import {
    fetchAllAncillaryServiceDataStart
} from '../../../../store/ancillaryServices/ancillaryService.actions';

import {
    selectAncilliaryData,
    selectIsLoading
} from '../../../../store/ancillaryServices/ancillaryService.selectors'
import { Link } from 'react-router-dom';


const ManageAncillaryServices = ({startFetchingDataForAncillaryService, allFlightsdatae,isLoading})=>{
   
    const [expandAllState, setexpandAllState] = useState(false);
    useEffect(()=>{startFetchingDataForAncillaryService()},[])

    
    return(
        <Fragment>
            <div className ='headingContainer'>
                <div> <Link style={{paddingRight: '4px', fontWeight: "bolder", cursor: "pointer",color:'cornflowerblue',fontSize: '18px'}} 
                        to = '/'>Dashboard</Link></div>
                <div className='heading'>Manage Ancillary Services</div>
                {expandAllState? 
                        <div style={{cursor:'pointer'}}  onClick={()=> setexpandAllState(false)}> <b>- Collapse All</b></div>
                       :<div  style={{cursor:'pointer'}} onClick={()=> setexpandAllState(true)}> <b>+ Expand All</b></div> }
              </div>
              <div className='accordianContainer'>
                {
                  allFlightsdatae && allFlightsdatae.map((eachFlightData,index)=> (
                            <DetailedAccordion key ={index+`${expandAllState}`} 
                                               index={index} 
                                               flightDetails ={eachFlightData}
                                               isExpandALL= {expandAllState}
                                               />
                  ))   
                }
            </div>
        </Fragment>
    )
}
const mapStateToProps = state=>({
    allFlightsdatae: selectAncilliaryData(state),
    isLoading: selectIsLoading(state)
})
const dispatchMapStateToProps =(dispatch)=>({
    startFetchingDataForAncillaryService: ()=>dispatch(fetchAllAncillaryServiceDataStart())
})
export default connect(mapStateToProps, dispatchMapStateToProps)(ManageAncillaryServices); 
