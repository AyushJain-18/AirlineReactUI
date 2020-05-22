import React from 'react';
import logo from './logo.svg';
import './App.css';
import AllRoutesComponent from './routes/routes.component';
import HeaderComponent from './components/header/header.component';


function App() {
  return (
    <div className="App">
        <HeaderComponent/>
        <AllRoutesComponent/>
    </div>
  );
}

export default App;
