export const getActiveAncillaryService =(passengersAncillaryService , activeService)=>{
    const displayAncillaryService = [];
    let activeAncService = Object.entries(activeService);
    passengersAncillaryService.map(eachAncSer=>{
        let eachAncSerArray = eachAncSer.split(':');
        activeAncService.map(eachActiveAncillaryService=>{
            if(eachAncSerArray[0].toLowerCase().trim() === eachActiveAncillaryService[0].toLowerCase().trim()) {
                if(eachActiveAncillaryService[1]){
                    displayAncillaryService.push(eachAncSer);
                }
            }
        })
    });
    return displayAncillaryService;
}