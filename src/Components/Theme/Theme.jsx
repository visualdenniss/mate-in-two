import React from 'react'

import './Theme.css'
const Theme = ({darkTheme, lightTheme}) => {
    return (
        <div className='theme'>
            <button className='dark-btn' 
            onClick={()=>darkTheme()}
            ></button>
            <button className='light-btn'
            onClick={()=>lightTheme()}></button>
        </div>
    )
}

export default Theme
