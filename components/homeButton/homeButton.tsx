import styles from './homeButton.module.css'
import Image, { type StaticImageData } from 'next/image'

type HB_props = {
    image: string | StaticImageData;
    title: string;
    subText: string;
}

function HomeButton({ image, title, subText }: HB_props) {
    return (
        <div className={`div_column ${styles.div_HB}`}>
            <Image
                src={image}
                alt={title}
                sizes="(max-width: 768px) 45vw, 20vw"
                width={300}
                height={200}
            />
            <h3>{title}</h3>
            <p>{subText}</p>
        </div>
    )
}

export default HomeButton;