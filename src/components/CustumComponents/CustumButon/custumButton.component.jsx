import React from 'react'
import './custumButton.styles.scss'

// {children,...otherprops}
const CustumButton =({children,disabled, inverted ,...otherprops})=>{
    return(
                <button 
                    className ={
                                `${disabled? 'google-button custom-button': 
                                (inverted? 'inverted custom-button': 'custom-button') }`
                            }
                     {...otherprops}>
                         {children}
                </button>
    )
}

export default CustumButton
