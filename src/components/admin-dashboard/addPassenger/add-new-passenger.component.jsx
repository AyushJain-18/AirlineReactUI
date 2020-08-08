import React, { Fragment , useState, useEffect} from 'react';
import './add-new-passengers.styles.scss'

import { connect } from 'react-redux';
import { 
    selectEmptySeatsOfParticularFlight ,
    selectEmptyPNRForParticularFlight,
    selectLoadingState } from '../../../store/admin/admin.selector';

import DisplayValue from '../../CustumComponents/custum-select/custumSelect.component';
import PassengerGerenralInfoForAdmin from '../../passenger-info/passenger-info-for-admin/passenger-info-admin.component';
import { Link } from 'react-router-dom';
import Spinner from '../../CustumComponents/spinner/spinner.component';


const AddNewPassenger =()=>{
    const [flightNo, setflightNo] = useState('PQ001');  
    const defaultValeuForFlightSelector = `Flight-${flightNo}`;
    const filterDisplayOptions = [{value:'Flight-PQ001'},{value:'Flight-PQ002'},
                                    {value:'Flight-PQ003'},{value:'Flight-PQ004'},
                                    {value:'Flight-PQ005'}];

    const handleChangeForFilter =value=>{
        const flightNumber = value.split('-')[1];
        setflightNo(flightNumber)
    }    
    return(
        <Fragment key={flightNo}>
                <p className = 'add-passenger-heading'>ADD PASSENGERS</p>
                <div className = 'add-passenger-btn-container'>
                    <Link style={{paddingRight: '4px', fontWeight: "bolder", cursor: "pointer",color:'cornflowerblue'}} 
                        to = '/'>Dashboard</Link>
                    <Link style={{paddingRight: '4px', fontWeight: "bolder", cursor: "pointer",color:'cornflowerblue'}} 
                        to = '/admin/manage'>Manage Services</Link>
                    <div style={{marginBottom: '10px'}}> <span> Select Flight &nbsp;: &nbsp;&nbsp; </span>  
                        <DisplayValue name='Fligt-Selection' id='Flight-Selection'editable = {true} 
                        defaultValue={defaultValeuForFlightSelector} options ={filterDisplayOptions}
                        handleChange ={handleChangeForFilter}/>
                    </div>
                </div>
                <AddPassengerComponent flightNo={flightNo} />
        </Fragment>
    )
}

// 2 component 

const  PassengerComponent =({flightNo, emptySeats,newPnr,isLoading})=>{
   
    const [newPNR, setnewPNR] = useState('')
    const samplePassengerData ={
        id: `${newPNR.split('Y')[1]}`,
        PNR: `${newPNR}`,
        airlineNumber: `${flightNo}`,
        // age: 28,
        // Image: "https://randomuser.me/api/portraits/men/2.jpg",
        // contactNumber: 9811954293,
        // firstName: "William",
        // lastName: "Volonte",
        // luggage: 'N/A',
        // meal: 'N/A',
        // payPerView: 'N/A',
        // infants: undefined,
        // wheelChair: undefined
    }
    useEffect(()=>{setnewPNR(newPnr)},[newPnr])
    return(
        <Fragment>
            { newPnr ==='Flight Full'? 
                    <div style={{marginTop: '10px' , fontSize: '25px'}}>SORRY! Flight is Full</div>
                    :
                   <div>
                       <div className= 'empty-seats'>Total empty seats for flight no <b>{flightNo}</b> are <b>{emptySeats.length}</b></div>
                        <div style ={{boxShadow:'10px 10px 10px darkgrey', margin: '3vw'}}>
                         {isLoading? <Spinner/>: <PassengerGerenralInfoForAdmin 
                                                    key ={emptySeats.length} 
                                                     passengerData ={samplePassengerData}
                                                     unOccupiedSeats={emptySeats} 
                                                     isAdd={true} />
                          }
                         </div>
                   </div> 
            }                
        </Fragment>
    )
}
const mapStateToProps = (state, ownProps)=>({
    emptySeats: selectEmptySeatsOfParticularFlight(ownProps.flightNo)(state),
    newPnr: selectEmptyPNRForParticularFlight (ownProps.flightNo)(state),
    isLoading: selectLoadingState(state)

})
const AddPassengerComponent = connect(mapStateToProps)(PassengerComponent);

export default AddNewPassenger

