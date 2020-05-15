import React from 'react';
import './routes.styles.scss'
import {Switch , Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../components/header/header.component'
import  DashboardContainer from '../containers/dashboard-container/dashboardContainer';
import {startFlightFetching} from '../store/flight/flight.actions';
import {selectFlights} from '../store/flight/flight.selector';
import SignInContainer from '../containers/sign-in-container/signIn-container'
import PassengerDashBoard from '../components/passengerDashBoard/passengerDashBoard.component';


class AllRoutesComponent extends React.Component{
    componentWillMount(){
        const{startFetchingFlights, flights} = this.props;
        if(flights.length===0){
            startFetchingFlights()
        }
    }
    render(){
        return(
            <div>
                <Header/>
                <div className= 'routes-div-container'>
                    <Switch > 
                            <Route exact path= '/' component={DashboardContainer}/>
                            <Route exact path= '/signIn' component={SignInContainer}/>
                            <Route exact path ='/passengerDashboard'component={PassengerDashBoard} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
        flights: selectFlights(state)
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        startFetchingFlights: ()=>dispatch(startFlightFetching())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllRoutesComponent); 
