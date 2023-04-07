import React from 'react';
import ErrorComponent from '../components/CustumComponents/ErrorComponent/errorComponent';

class ErrorBoundary extends React.Component{
  constructor(){
    super();
    this.state ={
      hasError: false
    }
  }
  static getDerivedStateFromError(){
    return({hasError: true})
  }
  componentDidCatch(error){
    console.log(error)
  }
  render(){
    if(this.state.hasError){
      return(<ErrorComponent/>)
    }
    return(this.props.children)
       
  }
}

export default ErrorBoundary