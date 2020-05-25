import React, {Fragment,lazy,Suspense} from 'react';
import './routes.styles.scss'
import {Switch , Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

//import  DashboardContainer from '../containers/dashboard-container/dashboardContainer';
//import SignInContainer from '../containers/sign-in-container/signIn-container'
// import DashboardToogleBarContainer from '../containers/DashBoard-ToogleBar-container/Dashboard-toogleBarContainer';
// import AddNewPassenger from '../components/admin-dashboard/add-new-passenger.component';


import {startFlightFetching} from '../store/flight/flight.actions';
import {selectFlights} from '../store/flight/flight.selector';
import { selectSignUserType } from '../store/user/user.selector';
import { selectAllPassengers } from '../store/admin/admin.selector';


import Spinner from '../components/CustumComponents/spinner/spinner.component';
import ErrorBoundary from './ErrorBoundaryForLazy';


const DashboardContainer = lazy(()=> import('../containers/dashboard-container/dashboardContainer'))
const SignInContainer = lazy(()=> import('../containers/sign-in-container/signIn-container'))
const DashboardToogleBarContainer = lazy(()=>import('../containers/DashBoard-ToogleBar-container/Dashboard-toogleBarContainer'));
const AddNewPassenger = lazy(()=>import('../components/admin-dashboard/add-new-passenger.component'))
class AllRoutesComponent extends React.Component{
    
    componentWillMount(){
        const{startFetchingFlights,flights} = this.props;
        if(!flights){
            startFetchingFlights();
            } 
         }
    render(){
        const{signInUserType, allPassengers} = this.props;
       //  console.log('signInUserType', signInUserType)
        return(
            <ErrorBoundary>
            <Suspense fallback = {<Spinner  />}>
                <div className='routes-div-container'>
                    <Switch > 
                            <Route exact path= '/' component={DashboardContainer}/>
                            <Route exact path= '/signIn' component={SignInContainer}/>
                            {/* <Route exaxt path ={`/${signInUserType}`} 
                                render= {()=>signInUserType?(<DashboardToogleBarContainer/>):(<Redirect to ='/'/>)}/> */}
                             {signInUserType?
                                <Route exact path ={`/${signInUserType}`}component={DashboardToogleBarContainer} />:<Redirect to ='/'/>
                            }
                            {
                              signInUserType&& allPassengers&& signInUserType==='Admin'?
                              <Route exact path ='/Admin/addPassengers' component={AddNewPassenger} />:<Redirect to ='/Admin'/>
                          
                            }
                    </Switch>
                </div>
            </Suspense>
            </ErrorBoundary>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
        flights: selectFlights(state),
        signInUserType: selectSignUserType(state),
        allPassengers: selectAllPassengers(state)
    }
}
const mapDispatchToProps =(dispatch)=>{
    return{
        startFetchingFlights: ()=>dispatch(startFlightFetching())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllRoutesComponent); 
