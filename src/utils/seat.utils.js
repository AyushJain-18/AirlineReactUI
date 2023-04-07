
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
export const getSeatColorForSeatNumber =(seatNumber, mappedPassengersToSeat,displaySpecialMeal)=>{
  const passenger = mappedPassengersToSeat[seatNumber];
  let seatColor = 'blanchedalmond';
  if(displaySpecialMeal && passenger){
    seatColor= passenger.meal === 'Special Meal'? 'IndianRed': 'gainsboro';
  } 
  else if(passenger){
    seatColor= passenger.infants?(passenger.wheelChair? 'darkgrey':'cornflowerblue'):(passenger.wheelChair? 'coral':'gainsboro'); 
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

// allpassengers -> PNRmapped -> flightMapped -> seatMap -> getUnoccupiedSeats(seat no amd seatMapped Passengers)

// take in array
export const mapAllPassengersToPNR =(allPassengers)=>{
  return allPassengers.reduce((accumulator, eachPassenger)=>{
    return{
      ...accumulator,
      [eachPassenger.PNR]: eachPassenger
    }
  },{})
}
// take in array
export const  mapAllPassengesToFligthNo =(allPassengers)=>{
  let flightMappedPassengers =  allPassengers.reduce((accumulator, eachPassenger)=>{
    return {
      ...accumulator,
      [eachPassenger.airlineNumber]: accumulator[eachPassenger.airlineNumber]?
        accumulator[eachPassenger.airlineNumber].concat(eachPassenger): [eachPassenger]
    }
  },{})
  return flightMappedPassengers;
}

export const  getSelectedAncillaryServices =(passengerDetails)=>{
  let ancillaryServices = [];
  // eslint-disable-next-line no-unused-expressions
  passengerDetails && passengerDetails.payPerView? ancillaryServices.push( `Pay-Per-View: ${passengerDetails.payPerView}`): '';
  // eslint-disable-next-line no-unused-expressions
  passengerDetails && passengerDetails.meal? ancillaryServices.push(`Meal: ${passengerDetails.meal}`): '';
  // eslint-disable-next-line no-unused-expressions
  passengerDetails && passengerDetails.luggage? ancillaryServices.push(`Luggage: ${passengerDetails.luggage}`): '';

  // eslint-disable-next-line no-unused-expressions
  passengerDetails&& passengerDetails.inFlightShopping? 
    ancillaryServices.push(`In-Flight-Shopping: Yes`):ancillaryServices.push(`In-Flight-Shopping: No`);
  return ancillaryServices;
}

// let data = [
//     {
//       "airlineNumber": "PQ001",
//       "firstName": "YaYa",
//       "lastName": "Volonte",
//     },
//     {
//       "airlineNumber": "PQ001",
//       "firstName": "William",
//       "lastName": "Volonte",
//     }
// ]
// let a= data.reduce((accumulator, eachPassenger)=>{
//     return {
//                 ...accumulator,
//                 [eachPassenger.airlineNumber]:  accumulator[eachPassenger.airlineNumber]?
//                                                      accumulator[eachPassenger.airlineNumber].concat(eachPassenger): [eachPassenger]
//             }
//     },{})

