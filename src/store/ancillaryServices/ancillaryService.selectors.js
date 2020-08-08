import {createSelector} from 'reselect';


export const selectAncillaryService =state=> state.AncillaryService;

export const selectIsLoading = createSelector([selectAncillaryService],ancillaryServiceData=>ancillaryServiceData.isLoading);

export const selectIsError = createSelector([selectAncillaryService],ancillaryServiceData=>ancillaryServiceData.isError);

export const selectAncilliaryData = createSelector([selectAncillaryService],ancillaryServiceData=>ancillaryServiceData.ancilliaryData);


export const selectFilghtData=(airlineNumber)=>
    createSelector([selectAncilliaryData],ancilliaryData=>ancilliaryData.filter(
            data=> data.airlineNumber ===airlineNumber )[0]);


export const selectAllActiveAncillaryService = (airlineNumber)=> createSelector([selectAncilliaryData],
    data=>{
    let userFlight = data.filter(eachData=>eachData.airlineNumber ===airlineNumber)[0]; 
    return {
        isInFlightShoppingActive: userFlight.ancillaryServices['In-Flight-Shopping'],
        isPayPerViewActive: userFlight.ancillaryServices['Pay-Per-View'],
        isLuggageActive: userFlight.ancillaryServices['luggage'],
        isMealActive: userFlight.ancillaryServices['meal'],
    } 
    })

export const selectLagguageAllowedValue = (airlineNumber)=> createSelector([selectAncilliaryData],
    data=>{
    let userFlight = data.filter(eachData=>eachData.airlineNumber ===airlineNumber); 
    return userFlight[0].ancillaryServiceSelectedValue.luggage
    })

export const selectMealAllowedValue = (airlineNumber)=> createSelector([selectAncilliaryData],
    data=>{
    let userFlight = data.filter(eachData=>eachData.airlineNumber ===airlineNumber); 
    return userFlight[0].ancillaryServiceSelectedValue.meal
    })

export const selectPayPerViewAllowedValue = (airlineNumber)=> createSelector([selectAncilliaryData],
    data=>{
    let userFlight = data.filter(eachData=>eachData.airlineNumber ===airlineNumber); 
    return userFlight[0].ancillaryServiceSelectedValue['Pay-Per-View']
    })
