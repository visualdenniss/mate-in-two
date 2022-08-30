import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {GiDiceFire} from 'react-icons/gi'

import './Cats.css'
import Loading from '../../Components/Loading/Loading'
const Cats = () => {

    const [cat, setCat] = useState('https://cdn2.thecatapi.com/images/199.gif')

    const url = 'https://api.thecatapi.com/v1/images/search?mime_types=gif'

    const getCat = async () => {
        const res = await axios.get(url)
        const cat = res.data[0].url
        setCat(cat)
    }

    return (
        <div className='cats'>

            <img className='cat-img' src={cat} alt="" />
            <button className="gen-btn" onClick={()=>getCat()}>
                <GiDiceFire></GiDiceFire>
            </button>
        </div>
    )
}

export default Cats
