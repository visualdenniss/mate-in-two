import React from 'react'

import './Loading.scss'
const Loading = () => {
    return (
        <div className='loading'>
            <div className="loading">
                <div className="hollowLoader">
                    <div className="largeBox">
                        <div className="smallBox"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading
