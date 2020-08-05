import {createSelector} from 'reselect';


export const selectAncillaryService =state=> state.AncillaryService;

export const selectIsLoading = createSelector([selectAncillaryService],ancillaryServiceData=>ancillaryServiceData.isLoading);

export const selectIsError = createSelector([selectAncillaryService],ancillaryServiceData=>ancillaryServiceData.isError);

export const selectAncilliaryData = createSelector([selectAncillaryService],ancillaryServiceData=>ancillaryServiceData.ancilliaryData);


export const selectActiveAncillaryServicesForParticularFlight=(airlineNumber)=>
    createSelector([selectAncilliaryData],ancilliaryData=>ancilliaryData.filter(
            data=> data.airlineNumber ===airlineNumber ));
