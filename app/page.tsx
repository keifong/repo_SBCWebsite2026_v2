"use client"
import { useEffect, useState } from 'react'
import './style_landing.css'
import '../app/globals.css'
import Button from '../components/button'
import Link from 'next/link'

import imgCross from "../public/landingPg/crossNew.jpg"
import NavBarBlack from '../public/churchLogo/sbc_logoBlack.png'


function Landing() {
  // fetching data
  // const [imgURL, setImgURL] = useState('')
  const [imgURL, setImgURL] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/landing')
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
            <Link id="btn_enter" href="/home"><Button title="Enter" /></Link>
            
          </div>
      </div>
    </>
  )
}


export default Landing