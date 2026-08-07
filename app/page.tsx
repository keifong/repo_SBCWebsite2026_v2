// import { useState } from 'react'
import './style_landing.css'
import './style_general.css'
import Button from '../components/button'
import { Link } from 'react-router-dom'

import imgCross from "../assets/Photos/landingPg/SBCBuilding_cross.png"
import NavBarBlack from '../assets/churchLogo/sbc_logoBlack.png'
import { useEffect, useState } from 'react'

function Landing() {
  // fetching data
  // const [imgURL, setImgURL] = useState('')
  const [imgURL, setImgURL] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/.netlify/functions/getLanding')
      const data = await response.json()
      console.log('data:', data)
      setImgURL(data[0].image)
    }
    fetchData()
  }, [])
  

  
  return (
    <>

      <div className="div_flexRow" id="div_content">
        {imgURL && <img id="imgChurchCross" src={imgURL} />}

          <div className='div_flexColumn' id="div_welcome">
            <img src={NavBarBlack} id='img_landingLogo'/>
            <p id='welcome'>Hello there!</p>
            <p id='description'>Welcome to a family of practicing believers. Saved by the grace of the Lord Jesus Christ, we in turn extend our hand to you.</p>
            <Link id="btn_enter" to="/home"><Button title="Enter" /></Link>
            
          </div>
      </div>
    </>
  )
}


export default Landing