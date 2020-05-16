import {createSelector} from 'reselect';

export const selectUser = (state)=> state.user;


export const selectDisplaySpinnerStatus = createSelector(
    [selectUser], user=>user.isDisplayUserSpinner
)

export const selectUserError = createSelector(
    [selectUser], user=>user.userError
)

export const selectUserData = createSelector(
    [selectUser], user=>user.userData
)

export const selectUserSignInStatus = createSelector(
    [selectUser], user=>(!!user.userData)
)

export const selectUserEnteredWrongCredentialStatue = createSelector(
    [selectUser], user=>user.isWrongCredentialsEntered
)

export const selectPassenger = createSelector(
    [selectUser], user=>user.passenger
)