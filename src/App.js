import React, {lazy,Suspense} from 'react';
import './App.css';

import {Switch , Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux' //


import {selectFlights} from './store/flight/flight.selector';
import { selectSignUserType } from './store/user/user.selector';
import { selectAllPassengers } from './store/admin/admin.selector';

import Spinner from './components/CustumComponents/spinner/spinner.component';
import ErrorBoundary from './routes/ErrorBoundaryForLazy';


// import HeaderComponent from './components/header/header.component';
// import AllRoutesComponent from './routes/routes.component';

const HeaderComponent = lazy(()=> import('./components/header/header.component'))
const DashboardContainer = lazy(()=> import('./containers/dashboard-container/dashboardContainer'))
const SignInContainer = lazy(()=> import('./containers/sign-in-container/signIn-container'))
const DashboardToogleBarContainer = lazy(()=>import('./containers/DashBoard-ToogleBar-container/Dashboard-toogleBarContainer'));
const AddNewPassenger = lazy(()=>import('./components/admin-dashboard/add-new-passenger.component'))


function App({signInUserType, allPassengers}) {
  return (
    <div className="App">
        <ErrorBoundary>
            <Suspense fallback = {<Spinner/>}>
                <HeaderComponent/>
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
                              <Route exact path ='/Admin/addPassengers' component={AddNewPassenger} />:<Redirect to ='/'/>
                          
                            }
                    </Switch>
                </div>
            </Suspense>
            </ErrorBoundary>
    </div>
  );
}

const mapStateToProps =(state)=>{
    return{
        flights: selectFlights(state),
        signInUserType: selectSignUserType(state),
        allPassengers: selectAllPassengers(state)
          }
    }
export default connect(mapStateToProps)(App)








