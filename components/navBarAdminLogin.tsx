import Link from 'next/link'
import './style_navbar.css'

function NavbarLanding() {
    return(
        <div id='divNav'>
            <img src='src/assets/churchLogo/sbc_logoBlack.png'/>
            <nav style={{display:'flex', gap:'1rem'}}>
                <Link href="/">Back</Link>
                <Link href="/ContactUs">Contact Us</Link>
               
            </nav>
        </div>
    )
}

export default NavbarLanding