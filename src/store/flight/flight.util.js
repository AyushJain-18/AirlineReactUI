export const createFlightObject=(flights)=>{
    let flightObj=
                flights.reduce((accumulator,eachFlight)=>{
                    return{
                        ...accumulator,
                        [eachFlight.airlineNumber]: eachFlight
                    }
                },{});
    return flightObj;
}