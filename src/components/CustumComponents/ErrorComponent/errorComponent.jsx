import React from 'react';
import './error-component.styles.scss'

const ErrorComponent =()=>{

    return(
        <div className= "backgroundImage">
            <div className = "ErrorImageOverlay">
                <div className = "ErrorImageText">
                    <h2>This Page is Lost in Space</h2> 
                    <h5> Please Check Your Internet Connection And Try Again!  </h5>
                </div>
                {/* "src= {'https://i.imgur.com/A040Lxr.png'} */}
                <img  className = "ErrorImageContainer"src= '/LostImage.png' alt ='Error occured'/>
            </div> 
        </div>

                )
        }

export default ErrorComponent

// return(
//     this.props.children
//   )

// background-image: ${({ imageUrl }) => `url(${imageUrl})`};