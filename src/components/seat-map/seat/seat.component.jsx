import React , {Fragment}from 'react';
import './seat.styles.scss'

import {getSeatColorForSeatNumber} from '../../../utils/seat.utils';

import SeatCircle from '../../CustumComponents/SeatCircle/SeatCircle.component';

import {connect} from 'react-redux'

import {setSelectedPassengerSeatNo, clearNewSeatSelectedByPassenger} from '../../../store/allpassenger/allpassenger.action';

// Seat compoent contains total seats a flight have 

const Seat = ({passengers,totalSeats,setPassengerSeatNoAction, clearNewSeatSelected})=>{
    const seatNumberArray = new Array(totalSeats).fill(1);
    const seatColumnNumber= ['A','B','C','D','E','F']
    let rowCounter = 0;
    let columnCounter =-1;
    const updateRowAndColumnCounter= (index)=>{
        if(index%6===0){
            rowCounter++;
            columnCounter=0;
        }
    }
    const isColumnCounterIs2=()=>{
            return (columnCounter%2===0 && columnCounter%3!==0 && columnCounter%4!==0 )
    }
    const setPassengerSeatNo =(seatNo)=>{
        setPassengerSeatNoAction(seatNo)
        clearNewSeatSelected()
    }
    return(
        <Fragment >
                {
                    seatNumberArray.map((seat,index)=>{
                        columnCounter++;
                        updateRowAndColumnCounter(index)
                        let seatNuber = `${seatColumnNumber[columnCounter]}`+rowCounter;
                        let seactColor = getSeatColorForSeatNumber(seatNuber,passengers);
                        
                    return  <div key ={index} className='seprator-container' onClick= {()=>setPassengerSeatNo(seatNuber)}> 
                                <SeatCircle key={index} 
                                            color={seactColor}>
                                            {seatNuber}
                                </SeatCircle>
                                {isColumnCounterIs2()? <div className='seprator'>||</div>:null}
                            </div>
                    })
                }
        </Fragment>
    )
}
const mapDispatchToProps =(dispatch)=>{
    return{
        setPassengerSeatNoAction : (seatNo)=>dispatch(setSelectedPassengerSeatNo(seatNo)),
        clearNewSeatSelected: ()=>dispatch(clearNewSeatSelectedByPassenger()),
    }
}
export default connect(null,mapDispatchToProps)(Seat);