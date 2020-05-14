import React from 'react';
import './routes.styles.scss'
import {Switch , Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../components/header/header.component'
import  DashboardContainer from '../containers/dashboard-container/dashboardContainer';
import {startFlightFetching} from '../store/flight/flight.actions';


class AllRoutesComponent extends React.Component{
    componentWillMount(){
        const{startFetchingFlights} = this.props;
        startFetchingFlights()
    }
    render(){
        return(
            <div className= 'routes-container'>
                <Header/>
                <div className= 'routes-div-container'>
                    <Switch > 
                            <Route exact path= '/' component={DashboardContainer}/>
                    </Switch>
                </div>
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
