import React , {Fragment}from 'react';
import './seat.styles.scss'

import {getSeatColorForSeatNumber} from '../../../utils/seat.utils';

import SeatCircle from '../../CustumComponents/SeatCircle/SeatCircle.component';

import {connect} from 'react-redux'

import {
    onNewSeatSelected,
      setSelectedPassengerSeatNo,
     clearNewSeatSelectedByPassenger} from '../../../store/allpassenger/allpassenger.action';
 

import {
        selectUnoccupiedSeat
} from '../../../store/allpassenger/allpassenger.select'
// Seat compoent contains total seats a flight have 

const Seat = ({passengers,totalSeats, showNotAllowedPointer, 
                setPassengerSeatNoAction, clearNewSeatSelected,
                unOccupiedSeats, setNewSeatNumber})=>{
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
       // console.log('seatNo',seatNo);
       // console.log('isOccupiedSeat',unOccupiedSeats);
        if(showNotAllowedPointer){
            if(!isOccupiedSeat(seatNo)){
               // console.log('seat new seat')
                setNewSeatNumber(seatNo)
            } 
        } else{
            setPassengerSeatNoAction(seatNo)
            clearNewSeatSelected()
        }
    }
    const isOccupiedSeat=(seatNo)=>{
            return   !(unOccupiedSeats.includes(seatNo))

    }
    return(
        <Fragment >
                { passengers &&
                    seatNumberArray.map((seat,index)=>{
                        columnCounter++;
                        updateRowAndColumnCounter(index)
                        let seatNuber = `${seatColumnNumber[columnCounter]}`+rowCounter;
                        let seactColor = getSeatColorForSeatNumber(seatNuber,passengers);
                        let seatOccupied = isOccupiedSeat(seatNuber) && showNotAllowedPointer;
                        
                    return  <div key ={index} 
                                className='seprator-container' 
                                onClick= {()=>setPassengerSeatNo(seatNuber)}> 
                                <SeatCircle key={index} 
                                            isSeatOccupied ={seatOccupied}
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
const mapStateToProps =(state)=>({
    unOccupiedSeats: selectUnoccupiedSeat(false)(state)
})
const mapDispatchToProps =(dispatch)=>{
    return{
        setPassengerSeatNoAction : (seatNo)=>dispatch(setSelectedPassengerSeatNo(seatNo)),
        clearNewSeatSelected: ()=>dispatch(clearNewSeatSelectedByPassenger()),
        setNewSeatNumber: (seatno)=> dispatch(onNewSeatSelected(seatno))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Seat);