// import { useState } from 'react'
import './style_contactUs.css'
import './style_general.css'

import placeholderIcon from '../assets/Photos/contactUs/churchAdmin.jpg'
import sundayFerryPlaceholder from '../assets/Photos/joshChoir.jpg'
import Footer from '../components/footer'
import Button from '../components/button'
import brickWall from '../assets/Photos/brickWall.png'
// import brickOutlines from '../assets/Photos/brickOutlines.png'
import joshua from '../assets/Photos/contactUs/josh.png'
import { useEffect, useState } from 'react'

function ContactUs() {
    const [cuData, setcuData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    // set true later

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/.netlify/functions/getContactUs')
                const data = await response.json()
                setcuData(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
       fetchData()
    }, [])


    const ferryDetails = cuData.find(person => person.title === "FerryDetails")

    if (loading) {
        return(
             <div className="loading_screen">
                <h2>Loading...</h2>
            </div>
        )
    }
    return (
        <div className='div_column' id='cu_wrap'>
            <div id='div_seekFind'>
                <h1>Seek</h1>
                <h3>and you will find</h3>
                <p>Matthew 7.7</p>
                <img src={brickWall}></img>
                {/* <img src={brickOutlines} id='bo'></img> */}
            </div>
           
            {cuData.length > 1 && (
            <div className='div_row' id='div_personsWrapper'>

                {cuData.slice(0, 2).map((person, index) => (
                    <div key={index} className='div_column div_box'>

                        <h3 id='h3_title'>{person?.title}</h3>

                        <div className='div_row' id='div_cont'>
                            {person?.images?.[0] && (
                                <img id='personImg' src={person.images[0]} />
                            )}

                            <div className='div_column div_deet'>
                                <h2>{person?.name}</h2>
                                <p>{person?.phoneNum}</p>

                                <div className='div_row' id='div_officeHrs'>
                                    <h3>Office Hours:</h3>
                                    <p>{person?.officeHrs}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}

            <div id='greenSeperator'></div>
            <div className='div_row'>
                <div className='div_column' id='div_form'>
                    <div className='div_column' id='div_form_title'>
                        <h2 id='h2_reach'>Reach out to us</h2>
                        <p id='p_getBack'>We will get back to you as soon as possible</p>
                    </div>  
                    <div className='div_column' id='div_secondaryWrap'>
                        <form id='form_contactUs'>
                            <div className='div_row' id='div_fnamefemail'>
                                <input className='form_input' type='text' placeholder='Name' required/>
                                <input className='form_input' type='email' placeholder='Email' required/>
                            </div>
                            <input className='form_input' type='tel' placeholder='Contact Number'/>
                            <textarea className='form_input' id='form_message' placeholder='Message' required></textarea>
                            <Button title='SEND'/>
                        </form>
                        <img src={brickWall} id='bw'></img>
                    </div>
                    </div>

                    {/* maps */}
                    <div className='div_column' id='maps'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.770210408459!2d103.84396887548526!3d1.313330398674216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c23eeb7f3f%3A0xcd2eed47b58f9d5d!2sSingapore%20Baptist%20Church!5e0!3m2!1sen!2ssg!4v1774265692009!5m2!1sen!2ssg" id='iframe_map' allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    
                        <div className='div_row' id='directionDeets'>
                            <div className='div_column div_mrtBus'>
                                <h3>Nearest MRT</h3>
                                <p>NS20 Novena</p>
                                <p>NE7/DT12 Little India</p>
                                <p>NE8 Farrer Park</p>
                            </div> 
                            <div className='div_column div_mrtBus'>
                                <h3>Nearest Bus</h3>
                                <p>56, 57, 166, 851</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='div_column' id='div_directions'>
                {cuData.length > 1 && (
                <div className='div_column' id='div_sundayFerry'>
                    <div className='div_row' id='ferryTitle'>
                        <h2>Sunday Service Ferry</h2>
                        <Button title='SEEK HELP'/>
                    </div>
                    <div className='div_row' id='div_drivers'>
                        {cuData.slice(2,5).map((person, index) => (
                            <div key={index} className='div_column' id='div_ferryDriver'>
                                <h3>{person.name}</h3>
                                <p>{person.phoneNum}</p>
                                <img id='img_sunFerry' src={person.images[0]}/>
                            </div>
                        ))}
                    </div>
                    <h3 id='pickupDeet'>Pick up details</h3>
                    <p id='ferryDeclaration'>Most of the time, we know who we are picking up. The person will call as well to notify. These are the current pick up locations that we go to. If you have any persons of need that requires this ferry pickup service near our church, please give us a call so we can accomodate</p>
                    {cuData.length > 1 &&
                    <div className='div_ferryRow' id='ferryMapInfo'>
                        <div className='div_column div_ferryPickup'>
                            {/* pek kio market pickup point, next to Blk 42 Cambridge Rd */}
                            <h4 className='locTitle'>Pek Kio Market</h4>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1915408547378!2d103.84901596957802!3d1.3158635999169814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c369a0f687%3A0x5bc4e8430a592629!2s42%20Cambridge%20Rd%2C%20Singapore%20210042!5e0!3m2!1sen!2ssg!4v1775733461009!5m2!1sen!2ssg" className='iframe_ferryPickup' allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <div className='div_row locDeets'>
                                <img src={ferryDetails.images[2]} id='img_pickupLocations'/>
                                <p className='p_locDeets'>Pick up location is right in front of Pek Kio Market, beside Blk 42 Cambridge Road, there are seats in the shade right before where the church van will turn in.</p>
                            </div>
                        </div>
                        <div className='div_column div_ferryPickup'>
                            {/*Blk 40 Cambridge Rd */}
                            <h4 className='locTitle'>Blk 40 Cambridge Rd</h4>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.383081709676!2d103.84836955641062!3d1.315863599666535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c319853287%3A0x3be2efa1823e5d47!2s40%20Cambridge%20Rd%2C%20Block%2040%2C%20Singapore%20210040!5e0!3m2!1sen!2ssg!4v1775757972171!5m2!1sen!2ssg" className='iframe_ferryPickup' allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <div className='div_row locDeets'>
                                <img src={ferryDetails.images[0]} id='img_pickupLocations'/>
                                <p className='p_locDeets'>Pick up location is right at the entrance of the turn-in to residential HDB blocks alongside Cambridge Road, next to Block 40, in front of the multi-story carpark 37A.</p>
                            </div>
                        </div>
                        <div className='div_column div_ferryPickup'>
                            {/* farrer park exit C */}
                            <h4 className='locTitle'>Farrer Park Exit C</h4>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1915408547378!2d103.84901596957802!3d1.3158635999169814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c369a0f687%3A0x5bc4e8430a592629!2s42%20Cambridge%20Rd%2C%20Singapore%20210042!5e0!3m2!1sen!2ssg!4v1775733461009!5m2!1sen!2ssg" className='iframe_ferryPickup' allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            <div className='div_row locDeets'>
                                <img src={ferryDetails.images[1]} id='img_pickupLocations'/>
                                <p className='p_locDeets'>Pick up location is at Farrer park exit C's pick up point, to the right of exit C. Can be seen once you step out of exit C. There are seats at the pick up point.</p>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                )}
                
                

            </div>
            <Footer/>
        </div>
    )
}

export default ContactUs