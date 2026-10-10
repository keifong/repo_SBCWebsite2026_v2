import Link from 'next/link'
import './style_navbar.css'
import Image from 'next/image'
//not implemented the page yet, nav bar for admin portal

function NavbarAdmin() {
    return(
        <div className='divNav'>
            <Link href="/HomeAdmin">
                <Image src='src/assets/churchLogo/sbc_logoBlack.png' alt='logo' width={100} height={100}/>
            </Link>
            <nav style={{display:'flex', gap:'1rem'}}>
                <Link href='/Home'>User Home</Link>
                <Link href="/Fellowships">Fellowships</Link>
                <Link href="/Leadership">Leadership Stewards</Link>
                <Link href="/Events">Events</Link>
                <Link href="/AboutUs">About Us</Link>
                <Link href="/ContactUs">Contact Us</Link>
            </nav>
        </div>
    )
}

export default NavbarAdmin