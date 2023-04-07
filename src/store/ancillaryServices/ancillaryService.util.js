export const getActiveAncillaryService =(passengersAncillaryService , userFlightData)=>{
  const displayAncillaryService = [];
  let activeAncService = Object.entries(userFlightData.ancillaryServices);
  const selectedValues =userFlightData.ancillaryServiceSelectedValue;
  passengersAncillaryService.map(eachAncSer=>{
    let eachAncSerArray = eachAncSer.split(':');
    activeAncService.map(eachActiveAncillaryService=>{
      if(eachAncSerArray[0].toLowerCase().trim() === eachActiveAncillaryService[0].toLowerCase().trim()) {
        if(eachActiveAncillaryService[1]){
          if( eachAncSerArray[0]==='In-Flight-Shopping'||selectedValues[eachActiveAncillaryService[0]].includes(eachAncSerArray[1].trim())){
            displayAncillaryService.push(eachAncSer);
          } else{
            let ancSerData = `${eachAncSerArray[0]}:${eachAncSerArray[1]} removed by admin,  Please select other option`;
            displayAncillaryService.push(ancSerData);
          }
                    
        }
      }
    })
  });
  return displayAncillaryService;
}