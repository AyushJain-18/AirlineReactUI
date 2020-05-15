import {createSelector} from 'reselect';

export const selectUser = (state)=> state.user;


export const selectUserSignInProgressStatus = createSelector(
    [selectUser], user=>user.userSignInOutInProgress
)

export const selectUserSignInOutError = createSelector(
    [selectUser], user=>user.userSignInOutError
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