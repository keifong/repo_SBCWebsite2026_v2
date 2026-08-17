import styles from './footer.module.css'
// import '../pages/style_general.css'
import whatsappBtn from '@/public/icons/whatsappButton.png'
import instaBtn from '@/public/icons/instaButton.png'
import youtubeBtn from '@/public/icons/youtubeButton.png'
import Image from 'next/image'

function Footer() {
    return (
        <>
            <div className={styles.greenSeperator}/>
            <div className={styles.divFooter}>
                <div className={styles.div_socialButtons}>
                    <div className={styles.div_imgButtons}>
                    <a href="">
                        <Image className={styles.img_socialMedia} src={whatsappBtn} alt="WhatsApp" width={50} height={50} />
                    </a>
                    </div>
                    <div className={styles.div_imgButtons}>
                    <a href="">
                        <Image className={styles.img_socialMedia} src={instaBtn} alt="Instagram" width={50} height={50} />
                        
                    </a>
                    </div>
                    <div className={styles.div_imgButtons}>
                    <a href="https://youtube.com/@tsbc?si=Pr6etpuOYowuxB2M">
                        <Image className={styles.img_socialMedia} src={youtubeBtn} alt="YouTube" width={50} height={50} />
                    </a>
                    </div>
                </div>
                <hr className={styles.footer_separator}/>
                {/* temp copyright section */}
                <p>© 2026, Singapore Baptist Church. All Rights Reserved</p>
            </div>
        </>
    )
}

export default Footer