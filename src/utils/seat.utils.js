
// Mapper function to map seat and passenger
export const mapPassengersToSeat =(passengers)=>{
    let passengerToSeatMap =
    passengers.reduce((accumulator, eachPassenger)=>{
        return{
            ...accumulator,
            [eachPassenger.seatNo]:eachPassenger
        }
    },{})
    return passengerToSeatMap; 
}

export const getSeatColorForSeatNumber =(seatNumber, passengerSeatMap)=>{
   const passenger = passengerSeatMap[seatNumber];
   let seatColor = 'blanchedalmond'
    if(passenger){
    seatColor= passenger.infants?(passenger.wheelChair? 'darkgrey':'cornflowerblue'):
                                (passenger.wheelChair? 'coral':'gainsboro') 
         }
         return seatColor;
}
// darkgrey -                   both infant and wheelchair
// cornflowerblue/blue-         inflant
// coral/dark red-              wheelchair
// blanchedalmond/ light red -  occupied
// light gray-                  unoccupied
