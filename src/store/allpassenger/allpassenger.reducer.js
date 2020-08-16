import All_PASSANGER_TYPES from './allpassenger.types';

const ALL_PASSANGER_INITIAL_STATE={
    passengers: [],
    selectedPassengerSeatNo: null,
    isError: null,
    isFetching: false,
    newSeatNumber: null,
    nextDisplayButtonState: false,
    passengerPNR: null,
    seatUpdateMessage: null,
    PassengerInfoBasedOnPNR: null, //pnrPassenger
    crewView: "CREW"
}

const passengerReducer = (state=ALL_PASSANGER_INITIAL_STATE,action)=>{
    switch(action.type){
        case All_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_START:
        case All_PASSANGER_TYPES.PNR_PASSENGER_INFO_FETCHING_START:
            return{
                ...state,
                isFetching: true,
                isError:false,
            }
        case All_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_SUCCESS:
        return{
            ...state,
            isFetching: false,
            isError:false,
            selectedPassengerSeatNo: null,
            newSeatNumber: null,
            passengers: action.payload
        }
        case All_PASSANGER_TYPES.ALL_PASSANGER_INFO_FETCHING_FAILURE:
        case All_PASSANGER_TYPES.PNR_PASSENGER_INFO_FETCHING_FAILURE:    
            return{
                ...state,
                isFetching: false,
                isError:true,
            }
        case All_PASSANGER_TYPES.REMOVE_FETCHED_PASSENGERS:
            return{
                ...state,
                isFetching: false,
                isError:false,
                selectedPassengerSeatNo: null,
                newSeatNumber: null,
                PassengerInfoBasedOnPNR: null,
                passengers:[]
            }
        case All_PASSANGER_TYPES.SET_SELECTED_PASSENGER_SEAT_NO:
            return{
                ...state,
                selectedPassengerSeatNo: action.payload
            }
        case All_PASSANGER_TYPES.REMOVE_SELECTED_PASSENGER_SEAT_NO:
            return{
                ...state,
                selectedPassengerSeatNo: null
            }
        case All_PASSANGER_TYPES.SELECT_NEW_SEAT:
            return{
                ...state,
                newSeatNumber: action.payload
            }
        case All_PASSANGER_TYPES.CLEAR_NEW_SEAT:
            return{
                ...state,
                newSeatNumber: null
            }
        case All_PASSANGER_TYPES.CHANGE_DISPLAY_BUTTON_NEXT:
            return {
                ...state,
                nextDisplayButtonState: action.payload
            }
        case All_PASSANGER_TYPES.PNR_PASSENGER_INFO_FETCHING_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    isError:false,
                    PassengerInfoBasedOnPNR: action.payload
                }
        case All_PASSANGER_TYPES.PNR_PASSENGER_INFO_FETCHING_REMOVE:
            return {
                ...state,
                passengerPNR: null,
                PassengerInfoBasedOnPNR: null
            }
        case All_PASSANGER_TYPES.ADD_PASSANGER_PNR_TO_REDUCER:
            return {
                ...state,
                passengerPNR: action.payload
            }
        case All_PASSANGER_TYPES.SEAT_UPDATE_START_FOR_CREW_LOGED_IN: 
            return{
                ...state,
                seatUpdateMessage: 'Loading...'
            }    
        case All_PASSANGER_TYPES.SEAT_UPDATE_SUCCESS_FOR_CREW_LOGED_IN: 
        return{
            ...state,
            seatUpdateMessage: 'Success'
        }
        case All_PASSANGER_TYPES.SEAT_UPDATE_FAILURE_FOR_CREW_LOGED_IN: 
        return{
            ...state,
            seatUpdateMessage: 'Failed'
        }
        case All_PASSANGER_TYPES.SET_CREW_VIEW:
            return{
                    ...state,
                    crewView: action.payload
                }   
        default:
            return state
    }

}

export default passengerReducer;