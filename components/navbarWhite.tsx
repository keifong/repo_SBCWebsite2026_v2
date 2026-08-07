import { Link } from 'react-router-dom'
import './style_navbar.css'
import { useState, useEffect } from 'react';

import sbcLogoWhite from '../assets/churchLogo/sbc_logoWhite.png'

function NavbarWhite() {
    const [navOpacity, setNavOpacity] = useState(0);
    const [showFellowship, setShowFellowship] = useState(false);

    
        useEffect(() => {
            const handleScroll = () => {
                const scrollY = window.scrollY
                // when scrollY is 0, opacity is 0
                // when scrollY is 100, opacity is 0.5
                const opacity = Math.min(scrollY / 100 * 0.5, 0.3)
                setNavOpacity(opacity)
            }
    
            window.addEventListener('scroll', handleScroll)
            return() => window.removeEventListener('scroll', handleScroll)
        }, [])

    return(
        <div id='divNav_white' style={{backgroundColor:`rgba(0, 0, 0, ${navOpacity})`}}>
            <Link to="/Home">
                <img src={sbcLogoWhite}/>
            </Link>
            <nav style={{display:'flex', gap:'1rem'}} id='navbar'>
                {/* <Link to="/Fellowships" className='link_btn'>Fellowships</Link> */}
                <h4 onMouseEnter={() => setShowFellowship(true)}
                    onMouseLeave={() => setShowFellowship(false)}>
                        Fellowships
                        {showFellowship && (
                        <div id='div_fellowshipDropdown'>
                            <Link to="/FellowshipsAdult" className='link_btn'>Adult</Link>
                            <Link to="/FellowshipsYA" className='link_btn'>Young Adult</Link>
                            <Link to="/FellowshipsYouth" className='link_btn'>Youth</Link>
                            <Link to="/FellowshipsKidz" className='link_btn'>Kidz</Link>
                        </div>
                )}</h4>
                <Link to="/Events" className='link_btn'>Events</Link>
                <Link to="/AboutUs" className='link_btn'>About Us</Link>
                <Link to="/ContactUs" className='link_btn'>Contact Us</Link>

                {/* temp */}
                <Link to="/LeadershipNew" className='link_btn'>Leadership</Link>
            </nav>
        </div>
    )
}

export default NavbarWhite