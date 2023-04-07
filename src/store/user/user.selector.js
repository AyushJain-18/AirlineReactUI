import {createSelector} from 'reselect';

export const selectUser = (state)=> state.user;


export const selectDisplaySpinnerStatus = createSelector(
  [selectUser], user=>user.isDisplayUserSpinner
)

export const selectisError = createSelector(
  [selectUser], user=>user.isError
)

export const selectUserData = createSelector(
  [selectUser], user=>user.userData
)

export const selectUserSignInStatus = createSelector(
  [selectUser], user=>(!!user.userData)
)
export const selectSignUserType = createSelector(
  [selectUser], user=>{
    if(user.userData && user.userData.isAdmin){
      return 'Admin'
    } 
    if(user.userData && user.userData.isCrew){
      return 'Crew'
    } 
    if(user.userData &&  user.userData.isPassenger){
      return 'In-flight'
    } 
  }
)

export const selectUserEnteredWrongCredentialStatue = createSelector(
  [selectUser], user=>user.isWrongCredentialsEntered
)

export const selectPassenger = createSelector(
  [selectUser], user=>user.passenger
)
export const selectFlightNo = createSelector(
  [selectUser], user=>user.flightNo
)