import {createSelector} from 'reselect';
import {
    mapPassengersToSeat,
    getUnOccupiedSeats,
    mapAllPassengersToPNR, // allpassengers Array
    mapAllPassengesToFligthNo, // allpassengers Array
} from '../../utils/seat.utils'
import { combineReducers } from 'redux';

export const selectAdmin =state=> state.Admin;

export const selectLoadingState = createSelector([selectAdmin], admin=>admin.isLoading)

export const selectErrorState = createSelector([selectAdmin], admin=>admin.isError)

export const selectAllPassengers =  createSelector([selectAdmin], admin=>admin.allPassengers);


export const selectPNRMappedPassenngers =  createSelector([selectAllPassengers], passengers=> mapAllPassengersToPNR(passengers));

export const selectFlightNoMappedPassengers =  createSelector([selectAllPassengers], passengers=>passengers?mapAllPassengesToFligthNo(passengers):null);

export const selectPassengerDataFromPNR = (PNR)=>{
    return createSelector([selectPNRMappedPassenngers], pnrMappedPassengersAray=>pnrMappedPassengersAray[PNR]);
} 

export const selectEmptySeatsOfParticularFlight = (flightNo,passengerSeatNo)=>createSelector([selectFlightNoMappedPassengers], 
        flightNoMappedPassengersAray=>{
                const allPassengersOfSelectedFlightNo = flightNoMappedPassengersAray[flightNo]
                const seatMappedPassengers = mapPassengersToSeat(allPassengersOfSelectedFlightNo);
                const emptySeatsOfParticularFlight = getUnOccupiedSeats(passengerSeatNo,seatMappedPassengers);
                return  emptySeatsOfParticularFlight
        })

export const selectAllPassengersWithWheelChairs = createSelector([selectAllPassengers],
      allPassengers=> {
        const allWheelChairsPassengers =[]; 
            allPassengers && allPassengers.forEach(passengers=> {
                if(passengers.wheelChair){
                    allWheelChairsPassengers.push(passengers)
                } 
            })
        // console.log('allWheelChairsPassengers', allWheelChairsPassengers)   
        return allWheelChairsPassengers;
    })

export const selectAllPassengersWithInfants = createSelector([selectAllPassengers],
        allPassengers=> {
          const allPassengersWithInfants  =[]; 
              allPassengers && allPassengers.forEach(passengers=> {
                  if(passengers.infants){
                    allPassengersWithInfants.push(passengers)
                  } 
              })
          // console.log('allPassengersWithInfants', allPassengersWithInfants)   
          return allPassengersWithInfants;
})

export const selectAllPassengersWithPayPerView = createSelector([selectAllPassengers],
    allPassengers=> {
      const allPassengersWithPayPerView  =[]; 
          allPassengers && allPassengers.forEach(passengers=> {
              if(passengers.payPerView){
                allPassengersWithPayPerView.push(passengers)
              } 
          })
      // console.log('allPassengersWithInfants', allPassengersWithPayPerView)   
      return allPassengersWithPayPerView;
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
