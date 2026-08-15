import '../app/globals.css'
import "./style_hb.css"
import Image from 'next/image'

type HB_props = {
    image: string;
    title: string;
    subText: string;
}


function HomeButton({image, title, subText}:HB_props) {
    return (
        <>
        <div className="div_column" id="div_HB">
            <Image src={image} alt={title} width={300} height={200} />
            <h3>{title}</h3>
            <p>{subText}</p>
        </div>
        </>
    )
}

export default HomeButton;