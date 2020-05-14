import React from 'react'
import './flight-overview.styles.scss'

const FilghtOverview = ({FlightSummaryDetails})=>{
    return(
            <div>
                {FlightSummaryDetails.name}
            </div>
    )
}

export default FilghtOverview;