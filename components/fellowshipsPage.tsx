import { useState, useEffect } from "react"
import '../pages/style_general.css'
import './style_fpage.css'
import Button from "../components/button"

import placeholder3 from "../../public/events/jaydon.png"
import brickWall from '../../public/brickWall.png'
import brickOutline from '../../public/brickOutlines.png'
import Footer from "../components/footer"
import NavbarWhite from '../components/navbarWhite'

type FellowshipProps ={
    name: string
    color: string
    tag: string     // "adult" - matches your supabase fellowships tag
    showCellGroups: boolean
    info: string[]
    cellgroups: string[]
    cgTexts: string[]
}

// info: "Cell Group", "subtext of what we do","content of what we do", "content of attention bar", "content of more information"

// upcomingInfo: "Sunday School", "studying book of?", "title of lesson", "venue", "datetime"


function FellowshipsPage({name, color, tag, showCellGroups, info, cellgroups, cgTexts}: FellowshipProps) {
    const [fellowshipData, setFellowshipData] = useState<any>(null)
    const [selectedCG, setSelectedCG] = useState(0)

    const [loading, setLoading] = useState(true)

    //fetching data
    useEffect(()=> {    
        const fetchData = async () => {
            try {
                const response = await fetch(`/.netlify/functions/getFellowships?tag=${tag}`)
                const data = await response.json()
                setFellowshipData(data[0])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [tag])


    // useEffect(() => {

    // })

    if (loading) {
        return (
            <div className="loading_screen">
                <h2>Loading...</h2>
            </div>
        )
    }
    return (
        <>
            <div className="div_wrapper">
                <NavbarWhite/>
                {/* <img src={brickWall} id="img_faBo1"/> */}
                <div className="div_column" id="div_faTitle">
                    <h1 style={{color: color}}>{name.toUpperCase()}</h1>
                </div>
                {/* actual video will be a youtube embed, NOT a video stored in supabase */}
                <div id="div_vid">
                    {fellowshipData && (
                        <video autoPlay muted loop id="vid">
                            <source src={fellowshipData.videoArray[0]} type="video/mp4"/>
                        </video>
                    )}
                </div>
                <div className="div_row" id="faInfo">
                        <img src={placeholder3} id="faPh"/>
                        <div className="div_column" id="wwd">
                            <h3 style={{color: color}}>WHAT WE DO</h3>
                            <h5 style={{color: color}}>{info[1]}</h5>
                            <p>{info[2]}</p>
                            <img src={brickWall} id="img_faBo1"/>
                            <Button title="Reach Out"/>
                        </div>
                </div>
                <div id="div_attentionAction" style={{backgroundColor: color}}>
                    <h3>{info[3]}</h3>
                </div>
                {showCellGroups &&
                    <div className="div_column" id="cgBtnContainer">
                        <h3 style={{color: color}}>Cell Groups</h3>
                        <div className="div_row" id="div_faCGs">
                            {cellgroups.map((cg:any, index: number)=> (
                                <div key={index} className="div_CG_btn" onClick={() => setSelectedCG(index)}
                                style={{backgroundColor: selectedCG === index ? color : "#808080"}}>
                                    {cg}
                                </div>
                            ))}
                        </div>
                    </div>
                }

                <div className="div_row" id="faInfo">
                        <div className="div_column" id="wwd">
                            <p>{cgTexts[selectedCG]}</p>
                            <img src={brickWall} id="img_faBo2"/>
                        </div>
                        <img src={placeholder3} id="faPh"/>
                </div>
               <div className="div_column" id="div_upcoming">
                    <h3>Upcoming</h3>
                    <div className="div_row">
                    {fellowshipData?.upcomingEvents?.map((event: any, index: number) => (
                        <div key={index} className="div_upcomingSingle">
                            <div>
                                <h4>{event.name}</h4>
                            </div>
                            <p>{event.book}</p>
                            <p>{event.venue}</p>
                            <p>{event.dateTime}</p>
                        </div>
                    ))}                  
                    </div>
                </div>
                <div id="div_imgSection" style={{backgroundColor: color}}>
                    <img src={brickOutline} id="faBO1"/>
                    <img src={brickOutline} id="faBO2"/>
                    img section
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default FellowshipsPage