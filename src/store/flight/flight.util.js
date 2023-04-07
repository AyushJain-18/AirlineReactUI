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


export const STATIC_FLIGHT_DATA =[
  {
    "name": " AIRWAYS 748",
    "airlineNumber": "PQ001",
    "from": "Bangalore",
    "destination": "Delhi",
    "price": 2500,
    "takeOffTime": "11:25 am",
    "landingTime": "2:15 pm",
    "totalSeats": 60,
    "type": "Domestic",
    "date": "Thu Oct 27 2019"
  },
  {
    "name": " AIRWAYS 100",
    "airlineNumber": "PQ002",
    "from": "Kolkata",
    "destination": "Jaipur",
    "price": 5200,
    "takeOffTime": "11:30 am",
    "landingTime": "3:10 pm",
    "totalSeats": 60,
    "type": "Domestic",
    "date": "Thu Oct 24 2019"
  },
  {
    "name": " AIRWAYS 122",
    "airlineNumber": "PQ003",
    "from": "Delhi",
    "destination": "Jaipur",
    "price": 4800,
    "takeOffTime": "2:30 pm",
    "landingTime": "3:50 pm",
    "totalSeats": 60,
    "type": "Domestic",
    "date": "Thu Nov 21 2019"
  },
  {
    "name": " AIRWAYS 007",
    "airlineNumber": "PQ004",
    "from": "Delhi",
    "destination": "Dubai",
    "price": 26700,
    "takeOffTime": "2:30 pm",
    "landingTime": "7:50 pm",
    "totalSeats": 60,
    "type": "International",
    "date": "Thu Nov 05 2019"
  },
  {
    "name": " AIRWAYS 008",
    "airlineNumber": "PQ005",
    "from": "Bangalore",
    "destination": "Kolkata",
    "price": "5100",
    "takeOffTime": "2:30 pm",
    "landingTime": "7:50 pm",
    "totalSeats": 60,
    "type": "Domestic",
    "date": "Thu Nov 21 2019"
  }
]
  
