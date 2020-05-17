import React ,{Fragment}from 'react'
import './seat-arrangement.styles.scss'
import SeatCircle from '../../CustumComponents/SeatCircle/SeatCircle.component';

import {mapPassengersToSeat,getSeatColorForSeatNumber} from '../../../utils/seat.utils'
 
// Seat compoent contains total seats a flight have 
const Seat = ({passengers,totalSeats})=>{
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
    return(
        <Fragment >
                {
                    seatNumberArray.map((seat,index)=>{
                        columnCounter++;
                        updateRowAndColumnCounter(index)
                        let seatNuber = `${seatColumnNumber[columnCounter]}`+rowCounter;
                        let seactColor = getSeatColorForSeatNumber(seatNuber,passengers);
                        
                    return  <div key ={index} className='seprator-container'> 
                                <SeatCircle key={index} 
                                            color={seactColor}>
                                            {/* color='blanchedalmond'> */}
                                            {seatNuber}
                                </SeatCircle>
                                {isColumnCounterIs2()? <div className='seprator'>||</div>:null}
                            </div>
                    })
                }
        </Fragment>
    )
}

const SeatArrangement =({passengers,totalSeats})=>{
    const passengerToSeat = mapPassengersToSeat(passengers)
    return(
        <div className='seat-map-arrangement'> 
                <Seat passengers={passengerToSeat} totalSeats={totalSeats}/>
        </div>
    )
}

export default SeatArrangement