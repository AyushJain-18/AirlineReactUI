import React, { Fragment , useState, useEffect} from 'react';
import './admin-dashboard.styles.scss'

import { connect } from 'react-redux';
import { selectEmptySeatsOfParticularFlight , selectEmptyPNRForParticularFlight } from '../../store/admin/admin.selector';

import DisplayValue from '../CustumComponents/custum-select/custumSelect.component';
import PassengerGerenralInfoForAdmin from '../passenger-info/passenger-info-for-admin/passenger-info-admin.component';



const AddNewPassenger =()=>{
    const [flightNo, setflightNo] = useState('PQ001'); 
    const defaultValeuForFlightSelector = `Flight-${flightNo}`;
    const filterDisplayOptions = [
        {value:'Flight-PQ001'},{value:'Flight-PQ002'},{value:'Flight-PQ003'},{value:'Flight-PQ004'},{value:'Flight-PQ005'}
    ];
    const handleChangeForFilter =(value)=>{
        const flightNumber = value.split('-')[1];
                setflightNo(flightNumber)
        }    

    return(
        <Fragment key={flightNo}>
                <div className='all-passenger-description-container'>
                    <div style={{marginBottom: '10px'}}> <span> Select Flight &nbsp;: &nbsp;&nbsp; </span>  
                    <DisplayValue name='Fligt-Selection' id='Flight-Selection'editable = {true} 
                      defaultValue={defaultValeuForFlightSelector} options ={filterDisplayOptions}
                      handleChange ={handleChangeForFilter}/>
                </div>
                    < PassengerGerenralInfoForAdminContainer flightNo={flightNo}/>
                </div>
        </Fragment>
    )
}

// 2 component 

const  PassengerComponent =({flightNo, emptySeats, newPnr})=>{
    const [newPNR, setnewPNR] = useState('')
    const samplePassengerData ={
        id: `${newPNR.split('Y')[1]}`,
        PNR: `${newPNR}`,
        age: 28,
        airlineNumber: `${flightNo}`,
        Image: "https://randomuser.me/api/portraits/men/2.jpg",
        contactNumber: 9811954293,
        firstName: "William",
        lastName: "Volonte",
        luggage: 'N/A',
        meal: 'N/A',
        payPerView: 'N/A',
        infants: undefined,
        wheelChair: undefined
    }
    useEffect(()=>{
        setnewPNR(newPnr)
    },[newPnr])
    return(
        <Fragment>
            { newPnr ==='Flight Full'? <div style={{marginTop: '10px' , fontSize: '25px'}}>
                    SORRY! Flight is Full</div>:
                   <div>
                       <div style={{margin: '10px' }}>Empty Seats: {emptySeats.length}</div>
                       <PassengerGerenralInfoForAdmin passengerData ={samplePassengerData} unOccupiedSeats={emptySeats} />
        
                   </div> 
                 
            }                
        </Fragment>
    )
}
const mapStateToProps = (state, ownProps)=>({
    emptySeats: selectEmptySeatsOfParticularFlight(ownProps.flightNo)(state),
    newPnr: selectEmptyPNRForParticularFlight (ownProps.flightNo)(state)

})
const PassengerGerenralInfoForAdminContainer = connect(mapStateToProps)(PassengerComponent);

export default AddNewPassenger

