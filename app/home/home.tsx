import { useState, useEffect } from 'react'
import './style_home.css'
import './style_general.css'
import Footer from '../components/footer'

import placeholder1 from '../assets/Photos/joshChoir.jpg'
import placeholder2 from '../assets/Photos/heartCross.jpg'
import placeholder3 from '../assets/Photos/prayer.jpg'
import placeholder4 from '../assets/Photos/yay.jpg'

import NavbarWhite from '../components/navbarWhite'

import btnSermons from '../assets/Photos/home/sermonBtn.png'
import btnServices from '../assets/Photos/home/servicesBtn.png'
import btnFellowships from '../assets/Photos/home/fellowshipsBtn.png'
import btnAboutUs from '../assets/Photos/home/aboutUsBtn.png'

import churchDrawing from '../assets/Photos/home/churchDraw.png'
import brickWall from '../assets/Photos/brickWall.png'
import bl1 from '../assets/Photos/home/brickLines1.png'
import bl2 from '../assets/Photos/home/brickLines2.png'
import bl3 from '../assets/Photos/home/brickLines3.png'
import brickLines from '../assets/Photos/brickOutlines.png'

import { Link } from 'react-router-dom'
import HomeButton from '../components/homeButton'
import Button from '../components/button'

function Home() {
    const [currImage, setCurrImage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [homeImages, setHomeImages] = useState<any[]>([])

    //  load data from supabase
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('/.netlify/functions/getHome')
            const data = await response.json()
            console.log('data:', data)
            setHomeImages(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        
        }
        fetchData()
    }, [])

    // --------assign images-------

    const leadershipBtn = homeImages.find(img => img.imageName === 'choirBtn')?.image
    const choirBtn = homeImages.find(img => img.imageName === 'choirBtn')?.image
    const fellowshipBtn = homeImages.find(img => img.imageName === 'fellowshipBtn')?.image
    const eventsBtn = homeImages.find(img => img.imageName === 'abtUsBtn')?.image
    const abtUsBtn = homeImages.find(img => img.imageName === 'abtUsBtn')?.image
    const yay = homeImages.find(img => img.imageName === 'yay')?.image
    const liftConstruction = homeImages.find(img => img.imageName === 'liftConstruction')?.image
    const prayer = homeImages.find(img => img.imageName === 'prayer')?.image

    // ---------------

    // const carouselImages = [
    //     placeholder1, 
    //     placeholder2, 
    //     placeholder3, 
    //     placeholder4
    // ]

    // const carouselImages2 = [ 
    //     placeholder2, 
    //     placeholder3, 
    //     placeholder4,
    //     placeholder1
    // ]

    // const totalImages = carouselImages.length;

    // const carousell_nextImg = () => {
    //     setTimeout(()=> {
    //         setCurrImage((prev) => (prev + 1) % totalImages);
    //     }, 500)
    // }

    // useEffect(() => {
    //         const interval = setInterval(() => {
    //             carousell_nextImg();
    //         },5000)
    
    //         return() => clearInterval(interval);
    //     }, [currImage])

    
    if (loading) {
        return (
            <div className="loading_screen">
                <h2>Loading...</h2>
            </div>
        )
    }
    return (
        <>
        <div className='div_wrapper_home'>
            <NavbarWhite/>
            {/* <div className='div_row' id='div_carousell'> */}
                {/* just a placeholder */}
                {/* <img src={carouselImages[currImage]} id='img_ph1'/>
                <img src={carouselImages2[currImage]} id='img_ph2'/> */}
            {/* </div> */}
            <div id='img_bg'>
                {yay &&
                <img src={yay}/>
                }
            </div>
            <div className='div_column'>
                <div className='div_column' id='div_home_2nd'>
                    <div className='div_column' id='div_title'>
                        <img src={brickWall} id='home_bw1'/>
                        <h3 id='h3_welcome'>WELCOME TO</h3>
                        <h1>SINGAPORE<br/>BAPTIST CHURCH</h1>
                        <h3 id='h3_cn'>新加坡浸信教会</h3>
                        <img src={brickWall} id='home_bw2'/>
                    </div>
                    <div className='div_row' id='div_btns_home'>
                        <Link to="/LeadershipNew" className='link_btn'>
                            {leadershipBtn && 
                            <HomeButton
                                image={leadershipBtn}
                                title='Pastoral Leadership'
                                subText="Learn More"
                            />
                            }
                        </Link>
                        
                        <Link to="/Fellowships" className='link_btn'>
                            {fellowshipBtn &&
                            <HomeButton
                                image={fellowshipBtn}
                                title='Fellowships'
                                subText="Learn More"
                            />
                            }
                        </Link>
                        {choirBtn &&
                        <HomeButton
                            image={btnServices}
                            title='Choir'
                            subText="Learn More"
                        />
                        }
                        <Link to="/Events" className='link_btn'>
                            {eventsBtn &&
                            <HomeButton
                                image={btnAboutUs}
                                title='Events'
                                subText="Learn More"
                            />
                            }
                        </Link>
                        <Link to="/AboutUs" className='link_btn'>
                            {abtUsBtn &&
                            <HomeButton
                                image={abtUsBtn}
                                title='AboutUs'
                                subText="Learn More"
                            />
                            }
                        </Link>
                    </div>
                    {/* <div className='div_row' id='div_mission'>
                        <img src={bl1} id='home_bl1'/>
                        <img src={bl2} id='home_bl2'/>
                        <img src={bl3} id='home_bl3'/>
                        <div className='div_column' id='div_mTexts'>
                            <h2>Our Mission</h2>
                            <p>He is before all things, and in Him all things hold together. And He is the head of the body, the church; He is the beginning and the firstborn from among the dead, so that in everything He might have the supremacy.<br/><br/>Colossians 1:17-18</p>
                        </div>
                        <img src={prayer} id='img_missionImg'/>
                    </div> */}
                </div>
                <div id='greenSeperator'/>

                {/* <div className='div_row' id='div_growing'>
                    <div className='div_column' id='div_growText'>
                        <p>He is before all things, and in Him all things hold together. And He is the head of the body, the church; He is the beginning and the firstborn from among the dead, so that in everything He might have the supremacy.<br/>Colossians 1:17-18</p>
                        <hr id='line_home'></hr>
                        <div className='div_row' id='div_imgLM'>
                            <img src={churchDrawing}/>
                            <Button title='LEARN MORE'/>
                        </div>
                    </div>
                    <div className='div_column' id='div_g'>
                        <h1>Growing<br/>in SBC<br/>my Home.</h1>
                        <h3>成长在我家</h3>
                    </div>
                </div> */}

                {/* calendar of events */}
                {/* <div id='home_calendar'>
                    <h3>Events Overview</h3>
                    <Link to="/Events" className='link_btn' id='test'>
                        <Button title='EXPLORE'/>
                    </Link>

                    <iframe src="https://calendar.google.com/calendar/embed?src=3bf52cf57752119e30212e841a9fb1044b5f639715c4fe81ba0ce04b6190c803%40group.calendar.google.com&ctz=Asia%2FSingapore&color=%235E6931&wkst=2&src=media.tsbc%40gmail.com&ctz=Asia%2FSingapore&color=%2337393A&src=4552caeb5f44ebcf0b0a8c459d213d2c35a4e22fc6d297b23668cdec66e0ea9d%40group.calendar.google.com&ctz=Asia%2FSingapore&color=%23A41216&src=38f48952cc81f25300f974b081ba0dc8e9a68570f2b4c421c24b64470e42d032%40group.calendar.google.com&ctz=Asia%2FSingapore&color=%23254188&src=aea01de9e3161cb01766ded5bc8adf1e11884e16158aa95e7dc3618c7adf5038%40group.calendar.google.com&ctz=Asia%2FSingapore&color=%23A46512" id='iframe_gCalendarEmbed'></iframe>
                </div> */}

                {/* Service Timing */}
                <div className='div_row' id='div_mission'>
                    <img src={bl1} id='home_bl1_1'/>
                    <img src={bl2} id='home_bl2'/>
                    <img src={bl3} id='home_bl3'/>
                    <div className='div_column' id='div_serviceTiming'>
                        <h1>Join Us in Worship</h1>
                        <h3>Every Sunday</h3>
                        <h3>10.30am - 12pm</h3>
                        <p>Fellowship with us afterwards through Lunch</p>
                        <p id='freep_freel'>Free Parking, Free Lunch</p>
                    </div>
                    <img src={prayer} id='img_missionImg'/>
                </div>


                {/* contact us home */}
                <div className='div_row' id='div_mission'>
                    <img src={liftConstruction} id="img_missionImg"/>
                    <div className='div_column' id='div_cuText'>
                        <img src={brickLines} id='cuText_bl'/>
                        <h2>Contact Us</h2>
                        <h4>1 Cambridge Rd, Singapore 219677</h4>
                        <p>Office Hours:<br/>Monday to Fridays: 9.00am - 5.30pm<br/>Saturdays: 9.00am to 1.00pm</p>
                        <div className='div_row' id='div_tel'>
                            <div className='div_column'>
                                <p className='tel'>Tel: 62993845</p>
                                <p className='tel'>Fax: 62938946</p>
                            </div>
                            <Link to="/ContactUs" className='link_btn'>
                                <Button title='CONTACT US'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        
        </>
    )
}

export default Home