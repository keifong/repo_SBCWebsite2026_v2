// import { Link } from 'react-router-dom'
// NOT USED ANYMORE
import './style_navbar.css'

import NavBarBlack from '../assets/churchLogo/sbc_logoBlack.png'

function NavbarLanding() {
    return(
        <div id='divNav'>
            <img src={NavBarBlack}/>
            <nav style={{display:'flex', gap:'1rem'}}>
                {/* <Link to="/admin_login">Admin</Link> */}
                {/* <Link to="/">Back</Link> */}
               
            </nav>
        </div>
    )
}

export default NavbarLanding



// NOT USED ANYMORE