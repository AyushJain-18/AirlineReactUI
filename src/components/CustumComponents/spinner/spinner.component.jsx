import React, { Fragment } from'react';

import './spinner.styles.scss';

const Spinner = ()=>{
  return(
    <Fragment>
      <div className ='spinnercontainer'>
        <div className = 'spinnerOverlay'/>
      </div>
    </Fragment>
  )
}

export default Spinner