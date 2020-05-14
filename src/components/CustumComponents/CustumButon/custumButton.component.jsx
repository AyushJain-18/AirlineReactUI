import React from 'react'
import './custumButton.styles.scss'

// {children,...otherprops}
const CustumButton =({children,isGoogleSignIN, inverted ,...otherprops})=>{
    return(
                <button 
                    className ={
                                `${isGoogleSignIN? 'google-button custom-button': 
                                (inverted? 'inverted custom-button': 'custom-button') }`
                            }
                     {...otherprops}>
                         {children}
                </button>
    )
}

export default CustumButton
