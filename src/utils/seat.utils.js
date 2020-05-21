
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
/** 
* getSeatColorForSeatNumber fn return seat color passed on there informaion
* darkgrey -                   both infant and wheelchair
* cornflowerblue/blue-         inflant
* coral/dark red-              wheelchair
* blanchedalmond/ light red -  occupied
* light gray-                  unoccupied
*/
export const getSeatColorForSeatNumber =(seatNumber, mappedPassengersToSeat)=>{
   const passenger = mappedPassengersToSeat[seatNumber];
   let seatColor = 'blanchedalmond'
    if(passenger){
    seatColor= passenger.infants?(passenger.wheelChair? 'darkgrey':'cornflowerblue'):
                                (passenger.wheelChair? 'coral':'gainsboro') 
         }
         return seatColor;
}

export const getUnOccupiedSeats =(seatNo, mappedPassengersToSeat)=>{
        const seatColumnNumber= ['A','B','C','D','E','F']
        const allSeats =[];
        // create seat Array
        for(let i=1;i<=10;i++){
            seatColumnNumber.forEach(eachColumn=>{
                let newSeatNumber = eachColumn+i;
                allSeats.push(newSeatNumber)
            })
        }
        const allOccupiedSeats = Object.keys(mappedPassengersToSeat);
        let unOccupiedSeats = allSeats.filter(eachSeat=>!(allOccupiedSeats.includes(eachSeat)))
        if(seatNo){
            unOccupiedSeats.push(seatNo)
        }
        
        return unOccupiedSeats;
}
