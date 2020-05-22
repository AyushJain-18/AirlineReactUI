import React from 'react';
import './routes.styles.scss'
import {Switch , Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../components/header/header.component';
import  DashboardContainer from '../containers/dashboard-container/dashboardContainer';
import {startFlightFetching} from '../store/flight/flight.actions';
import {selectFlights} from '../store/flight/flight.selector';

import SignInContainer from '../containers/sign-in-container/signIn-container'
import DashboardToogleBarContainer from '../containers/DashBoard-ToogleBar-container/Dashboard-toogleBarContainer';
import AdminDashBoardComponent from '../components/admin-dashboard/admin-dashboard.component';

class AllRoutesComponent extends React.Component{
    
    componentWillMount(){
        const{startFetchingFlights} = this.props;
            startFetchingFlights();
         }
    render(){
        return(
            <div>
                {/* <Header/> */}
                <div >
                    {/* className= 'routes-div-container' */}
                    <Switch > 
                            <Route exact path= '/' component={DashboardContainer}/>
                            <Route exact path= '/signIn' component={SignInContainer}/>
                            <Route exact path ='/In-flight'component={DashboardToogleBarContainer} />
                            <Route exact path ='/Admin'component={AdminDashBoardComponent} />
                            <Route exact path ='/Crew'component={DashboardToogleBarContainer} />
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
