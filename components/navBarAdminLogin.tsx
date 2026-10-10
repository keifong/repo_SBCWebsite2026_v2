import Link from 'next/link'
import './style_navbar.css'
import Image from 'next/image'

function NavbarLanding() {
    return(
        <div className='divNav'>
            <Image src='src/assets/churchLogo/sbc_logoBlack.png' alt='logo' width={100} height={100}/>
            <nav style={{display:'flex', gap:'1rem'}}>
                <Link href="/">Back</Link>
                <Link href="/ContactUs">Contact Us</Link>
               
            </nav>
        </div>
    )
}

export default NavbarLanding