import {createSelector} from 'reselect';
import {
  mapPassengersToSeat,
  getUnOccupiedSeats,
  mapAllPassengersToPNR, // allpassengers Array
  mapAllPassengesToFligthNo, // allpassengers Array
  getSelectedAncillaryServices 
} from '../../utils/seat.utils'

export const selectAdmin =state=> state.Admin;

export const selectLoadingState = createSelector([selectAdmin], admin=>admin.isLoading)

export const selectErrorState = createSelector([selectAdmin], admin=>admin.isError)

export const selectAllPassengers =  createSelector([selectAdmin], admin=>admin.allPassengers);


export const selectPNRMappedPassenngers =  createSelector([selectAllPassengers], passengers=> mapAllPassengersToPNR(passengers));

export const selectFlightNoMappedPassengers =  createSelector([selectAllPassengers], passengers=>passengers?mapAllPassengesToFligthNo(passengers):null);

export const selectPassengerDataFromPNR = (PNR)=>{
  return createSelector([selectPNRMappedPassenngers], pnrMappedPassengersAray=>pnrMappedPassengersAray[PNR]);
} 

export const selectPassengerForParticularFlight = (airlineNo) =>{
  return createSelector([selectFlightNoMappedPassengers],flightMappedPassengers =>flightMappedPassengers?flightMappedPassengers[airlineNo]:null )
}

export const selectEmptySeatsOfParticularFlight = (flightNo,passengerSeatNo)=>createSelector([selectFlightNoMappedPassengers], 
  flightNoMappedPassengersAray=>{
    const allPassengersOfSelectedFlightNo = flightNoMappedPassengersAray[flightNo]
    const seatMappedPassengers = mapPassengersToSeat(allPassengersOfSelectedFlightNo);
    const emptySeatsOfParticularFlight = getUnOccupiedSeats(passengerSeatNo,seatMappedPassengers);
    return  emptySeatsOfParticularFlight
  })

export const selectAncillaryServicesOfPassengers = (pnr)=>createSelector([selectPNRMappedPassenngers],   
  allPnrMappedPassengers=>{
    const passengerDetails = allPnrMappedPassengers[pnr]
    const selectedAncillaryServices = getSelectedAncillaryServices(passengerDetails);
    return  selectedAncillaryServices
  })
export const selectAllPassengersWithWheelChairs = createSelector([selectAllPassengers],
  allPassengers=> {
    const allWheelChairsPassengers =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.wheelChair){
        allWheelChairsPassengers.push(passengers)
      } 
    }) 
    return allWheelChairsPassengers;
  })

export const selectAllPassengersWithMeals = createSelector([selectAllPassengers],
  allPassengers=> {
    const allPassengersWithMeals =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.meal){
        allPassengersWithMeals.push(passengers)
      } 
    }) 
    return allPassengersWithMeals;
  })

export const selectAllPassengersWithInfants = createSelector([selectAllPassengers],
  allPassengers=> {
    const allPassengersWithInfants =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.infants){
        allPassengersWithInfants.push(passengers)
      } 
    }) 
    return allPassengersWithInfants;
  })

export const selectAllPassengersWithInPayPerView = createSelector([selectAllPassengers],
  allPassengers=> {
    const allPassengersWithPayPerView =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.payPerView){
        allPassengersWithPayPerView.push(passengers)
      } 
    }) 
    return allPassengersWithPayPerView;
  })

export const selectAllCheckedInPassengers = createSelector([selectAllPassengers],
  allPassengers=> {
    const allCheckedInPassengers =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.seatNo){
        allCheckedInPassengers.push(passengers)
      } 
    }) 
    return allCheckedInPassengers;
  })

export const selectAllNotCheckedInPassengers = createSelector([selectAllPassengers],
  allPassengers=> {
    const allNotCheckedInPassengers =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(!passengers.seatNo){
        allNotCheckedInPassengers.push(passengers)
      } 
    }) 
    return allNotCheckedInPassengers;
  })

export const selectAllPassengersWithoutPassport = createSelector([selectAllPassengers],
  allPassengers => {
    const allPassengersWithoutPassport = [];
    allPassengers && allPassengers.forEach(passengers => {
      if (!passengers.passport) {
        allPassengersWithoutPassport.push(passengers)
      }
    })
    return allPassengersWithoutPassport;
  })
export const selectAllPassengersWithoutAddress = createSelector([selectAllPassengers],
  allPassengers => {
    const allPassengersWithoutAddress = [];
    allPassengers && allPassengers.forEach(passengers => {
      if (!passengers.address) {
        allPassengersWithoutAddress.push(passengers)
      }
    })
    return allPassengersWithoutAddress;
  })
export const selectAllPassengersWithoutDOB = createSelector([selectAllPassengers],
  allPassengers => {
    const allPassengersWithoutDOB = [];
    allPassengers && allPassengers.forEach(passengers => {
      if (!passengers.dob) {
        allPassengersWithoutDOB.push(passengers)
      }
    })
    return allPassengersWithoutDOB;
  })

    


export const selectAllPassengersWithWheelChairsForParticularFlight =(airlineNo) => createSelector([selectAllPassengers],
  allPassengers=> {
    const allWheelChairsPassengers =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.airlineNumber === airlineNo && passengers.wheelChair){
        allWheelChairsPassengers.push(passengers)
      } 
    }) 
    return allWheelChairsPassengers;
  })

export const selectAllPassengersWithInfantsForParticularFlight =(airlineNo) => createSelector([selectAllPassengers],
  allPassengers=> {
    const allPassengersWithInfants  =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if( passengers.airlineNumber === airlineNo && passengers.infants){
        allPassengersWithInfants.push(passengers)
      } 
    })
    // console.log('allPassengersWithInfants', allPassengersWithInfants)   
    return allPassengersWithInfants;
  })

export const selectAllPassengersWithPayPerViewForParticularFlight =(airlineNo) =>createSelector([selectAllPassengers],
  allPassengers=> {
    const allPassengersWithPayPerView  =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.airlineNumber === airlineNo && passengers.payPerView){
        allPassengersWithPayPerView.push(passengers)
      } 
    })
    // console.log('allPassengersWithInfants', allPassengersWithPayPerView)   
    return allPassengersWithPayPerView;
  })
export const selectAllCheckedInPassengersForParticularFlight =(airlineNo) =>createSelector([selectAllPassengers],
  allPassengers=> {
    const allCheckedInPassengers  =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.airlineNumber === airlineNo && !!passengers.seatNo){
        allCheckedInPassengers.push(passengers)
      } 
    })
    // console.log('allPassengersWithInfants', allPassengersWithPayPerView)   
    return allCheckedInPassengers;
  })

export const selectAllNotCheckedInPassengersForParticularFlight =(airlineNo) =>createSelector([selectAllPassengers],
  allPassengers=> {
    const notCheckedInPassengers  =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.airlineNumber === airlineNo && !passengers.seatNo){
        notCheckedInPassengers.push(passengers)
      } 
    })
    // console.log('allPassengersWithInfants', allPassengersWithPayPerView)   
    return notCheckedInPassengers;
  })
export const selectAllPassengersWithMealsForParticularFlight =(airlineNo) =>createSelector([selectAllPassengers],
  allPassengers=> {
    const allPassengersWithMeals  =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.airlineNumber === airlineNo && !!passengers.meal){
        allPassengersWithMeals.push(passengers)
      } 
    })
    // console.log('allPassengersWithInfants', allPassengersWithPayPerView)   
    return allPassengersWithMeals;
  })
export const selectAllPassengersWithoutMealsForParticularFlight =(airlineNo) =>createSelector([selectAllPassengers],
  allPassengers=> {
    const allPassengersWithoutMeals  =[]; 
    allPassengers && allPassengers.forEach(passengers=> {
      if(passengers.airlineNumber === airlineNo && !passengers.meal){
        allPassengersWithoutMeals.push(passengers)
      } 
    })
    // console.log('allPassengersWithInfants', allPassengersWithPayPerView)   
    return allPassengersWithoutMeals;
  })



export const selectAllPassengersWithoutPassportForParticularFlight =(airlineNo)=> createSelector([selectAllPassengers],
  allPassengers => {
    const allPassengersWithoutPassport = [];
    allPassengers && allPassengers.forEach(passengers => {
      if (passengers.airlineNumber === airlineNo && !passengers.passport) {
        allPassengersWithoutPassport.push(passengers)
      }
    })
    return allPassengersWithoutPassport;
  })
export const selectAllPassengersWithoutAddressForParticularFlight =(airlineNo)=> createSelector([selectAllPassengers],
  allPassengers => {
    const allPassengersWithoutAddress = [];
    allPassengers && allPassengers.forEach(passengers => {
      if (passengers.airlineNumber === airlineNo && !passengers.address) {
        allPassengersWithoutAddress.push(passengers)
      }
    })
    return allPassengersWithoutAddress;
  })
export const selectAllPassengersWithoutDOBForParticularFlight =(airlineNo)=> createSelector([selectAllPassengers],
  allPassengers => {
    const allPassengersWithoutDOB = [];
    allPassengers && allPassengers.forEach(passengers => {
      if (passengers.airlineNumber === airlineNo && !passengers.dob) {
        allPassengersWithoutDOB.push(passengers)
      }
    })
    return allPassengersWithoutDOB;
  })

 


export const selectEmptyPNRForParticularFlight =(flightNo)=> createSelector([selectFlightNoMappedPassengers],
  flightNoMappedPassengers=> {
    const occupiedPNRs= []
    flightNoMappedPassengers[flightNo].forEach(passengers=>{
      occupiedPNRs.push(passengers.PNR) 
    })
    let occupiedPnrNumber =occupiedPNRs.map(PNR=> PNR.split('Y')[1]);
    let maxNumber= 0;
    occupiedPnrNumber.forEach(number=>{
      maxNumber =  Math.max(maxNumber,number)
    })
    if(maxNumber>59){
      return 'Flight Full'
    }
    let newPNR = `${flightNo}XY${maxNumber+1}`
    return newPNR;
             
  })
