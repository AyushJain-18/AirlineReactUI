/* eslint-disable react/display-name */
import React from 'react';

import ErrorComponent from '../../components/CustumComponents/ErrorComponent/errorComponent';

const ErrorContainer = (ComponentToBeWrappedWithError)=>{
  return ({isError, ...otherProps})=>{
    return(
      <div>
        {
          isError? <ErrorComponent/>: <ComponentToBeWrappedWithError {...otherProps}/>
        }
      </div>
    )
  }
}

export default  ErrorContainer;