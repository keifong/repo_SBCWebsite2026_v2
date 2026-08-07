import './style_footer.css'
import '../pages/style_general.css'
import whatsappBtn from '../assets/icons/whatsappButton.png'
import instaBtn from '../assets/icons/instaButton.png'
import youtubeBtn from '../assets/icons/youtubeButton.png'

function Footer() {
    return (
        <>
        <div id='greenSeperator'></div>
        <div className="divFooter">
            <div id="div_socialButtons">
                <div className='div_imgButtons'>
                <a href="">
                    <img className="img_socialMedia" src={whatsappBtn}/>
                </a>
                </div>
                <div className='div_imgButtons'>
                <a href="">
                    <img className="img_socialMedia" src={instaBtn}/>
                    
                </a>
                </div>
                <div className='div_imgButtons'>
                <a href="https://youtube.com/@tsbc?si=Pr6etpuOYowuxB2M">
                    <img className="img_socialMedia" src={youtubeBtn}/>
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