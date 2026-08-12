import './style_footer.css'
// import '../pages/style_general.css'
import '../app/globals.css'
import whatsappBtn from '../public/icons/whatsappButton.png'
import instaBtn from '../public/icons/instaButton.png'
import youtubeBtn from '../public/icons/youtubeButton.png'
import Image from 'next/image'

function Footer() {
    return (
        <>
        <div id='greenSeperator'></div>
        <div className="divFooter">
            <div id="div_socialButtons">
                <div className='div_imgButtons'>
                <a href="">
                    <Image className="img_socialMedia" src={whatsappBtn} alt="WhatsApp" />
                </a>
                </div>
                <div className='div_imgButtons'>
                <a href="">
                    <Image className="img_socialMedia" src={instaBtn} alt="Instagram" />
                    
                </a>
                </div>
                <div className='div_imgButtons'>
                <a href="https://youtube.com/@tsbc?si=Pr6etpuOYowuxB2M">
                    <Image className="img_socialMedia" src={youtubeBtn} alt="YouTube" />
                </a>
                </div>
            </div>
            <hr/>
            {/* temp copyright section */}
            <p>© 2026, Singapore Baptist Church. All Rights Reserved</p>
        </div>
        </>
    )
}

export default Footer