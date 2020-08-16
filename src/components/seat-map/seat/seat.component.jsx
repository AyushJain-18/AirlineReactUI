import React , {Fragment, useState}from 'react';
import './seat.styles.scss'

import {getSeatColorForSeatNumber} from '../../../utils/seat.utils';

import SeatCircle from '../../CustumComponents/SeatCircle/SeatCircle.component';

import {connect} from 'react-redux'

import {
    onNewSeatSelected,
      setSelectedPassengerSeatNo,
     clearNewSeatSelectedByPassenger} from '../../../store/allpassenger/allpassenger.action';
 

import {
        selectUnoccupiedSeat,selectUpdatedSeat
} from '../../../store/allpassenger/allpassenger.select'
// Seat compoent contains total seats a flight have 

const Seat = ({passengers,totalSeats, isWebCheckIn, 
                setPassengerSeatNoAction, clearNewSeatSelected,newSeat,
                unOccupiedSeats, setNewSeatNumber})=>{
    const [seatSelected, setSeatSelectedStatus] = useState(false);                
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
    const isOccupiedSeat=(seatNo)=>{
        return !(unOccupiedSeats.includes(seatNo))

    }
    const setPassengerSeatNo =(seatNo)=>{
        if(isWebCheckIn){
            if(!isOccupiedSeat(seatNo)){
                setSeatSelectedStatus(true); // this we have to change seat color
                setNewSeatNumber(seatNo)
            } 
        } else{
            setPassengerSeatNoAction(seatNo)
            clearNewSeatSelected()
        }
    }
 
    return(
        <Fragment >
                { passengers &&
                    seatNumberArray.map((seat,index)=>{
                        columnCounter++;
                        updateRowAndColumnCounter(index)
                        let seatNuber = `${seatColumnNumber[columnCounter]}`+rowCounter;
                        let seactColor = getSeatColorForSeatNumber(seatNuber,passengers);
                        let seatOccupied = isOccupiedSeat(seatNuber) && isWebCheckIn;
                        
                    return  <div key ={seatNuber} 
                                className='seprator-container' 
                                onClick= {()=>setPassengerSeatNo(seatNuber)}> 
                                <SeatCircle key={seatNuber} 
                                            isSeatOccupied ={seatOccupied}
                                            color= {seatSelected && seatNuber ===newSeat ?
                                                        'lightCoral':seactColor}>
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
    unOccupiedSeats: selectUnoccupiedSeat(false)(state),
    newSeat: selectUpdatedSeat(state) 
})
const mapDispatchToProps =(dispatch)=>{
    return{
        setPassengerSeatNoAction : (seatNo)=>dispatch(setSelectedPassengerSeatNo(seatNo)),
        clearNewSeatSelected: ()=>dispatch(clearNewSeatSelectedByPassenger()),
        setNewSeatNumber: (seatno)=> dispatch(onNewSeatSelected(seatno))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Seat);