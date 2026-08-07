import { Link } from 'react-router-dom'
import './style_navbar.css'

function NavbarLanding() {
    return(
        <div id='divNav'>
            <img src='src/assets/churchLogo/sbc_logoBlack.png'/>
            <nav style={{display:'flex', gap:'1rem'}}>
                <Link to="/">Back</Link>
                <Link to="/ContactUs">Contact Us</Link>
               
            </nav>
        </div>
    )
}

export default NavbarLanding