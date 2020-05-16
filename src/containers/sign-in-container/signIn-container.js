import React from 'react';

import {connect} from 'react-redux'

import {compose} from 'redux'

import {createStructuredSelector} from 'reselect'

import SignInComponent from '../../components/sign-in/sign-in.component';
import WithSpinnerContainer from '../with-spinner-container/with-spinner.container';
import ErrorContainer from '../errorContainer/error-container';
import {selectDisplaySpinnerStatus,selectUserError} from '../../store/user/user.selector'

const mapStateToProps = createStructuredSelector({
    isLoading:selectDisplaySpinnerStatus,
    isError:selectUserError
})
const SignInContainer = compose(
    connect(mapStateToProps),
    WithSpinnerContainer,
    ErrorContainer
)(SignInComponent);


export default SignInContainer;