import Link from 'next/link'
import './style_navbar.css'
//not implemented the page yet, nav bar for admin portal

function NavbarAdmin() {
    return(
        <div id='divNav'>
            <Link to="/HomeAdmin">
                <img src='src/assets/churchLogo/sbc_logoBlack.png'/>
            </Link>
            <nav style={{display:'flex', gap:'1rem'}}>
                <Link to='/Home'>User Home</Link>
                <Link to="/Fellowships">Fellowships</Link>
                <Link to="/Leadership">Leadership Stewards</Link>
                <Link to="/Events">Events</Link>
                <Link to="/AboutUs">About Us</Link>
                <Link to="/ContactUs">Contact Us</Link>
            </nav>
        </div>
    )
}

export default NavbarAdmin