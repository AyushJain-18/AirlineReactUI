import React from 'react';
import Spinner from '../../components/CustumComponents/spinner/spinner.component'

const WithSpinnerContainer = (ComponentToBeWrappedWithSpinner)=>{
    return  ({isLoading, ...otherComponentProps})=> (
        <div>
                {
                    isLoading? <Spinner/>: <ComponentToBeWrappedWithSpinner {...otherComponentProps}/>
                }
        </div>
    )
}

export default WithSpinnerContainer;