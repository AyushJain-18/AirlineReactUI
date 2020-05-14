import React from 'react';
import {Switch , Route} from 'react-router-dom'
import {connect} from 'react-redux'

import  DashboardContainer from '../containers/dashboard-container/dashboardContainer';
import {startFlightFetching} from '../store/flight/flight.actions';


class AllRoutesComponent extends React.Component{
    componentWillMount(){
        const{startFetchingFlights} = this.props;
        startFetchingFlights()
    }
    render(){
        return(
            <div>
                    <Switch> 
                        <Route exact path= '/' component={DashboardContainer}/>
                    </Switch>
            </div>
        )
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        startFetchingFlights: ()=>dispatch(startFlightFetching())
    }
}
export default connect(null, mapDispatchToProps)(AllRoutesComponent); 
