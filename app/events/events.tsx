interface EventItem {
    title: string;
    dateTime: string;
    venue: string;
    fellowships: string[];
    description: string;
    images: string[];
}

import { useEffect, useState } from 'react'
import "./style_general.css"
import "./style_events.css"

import placeholder1 from "../assets/Photos/events/gifting.png"
import placeholder2 from "../assets/Photos/events/happy.png"
import placeholder3 from "../assets/Photos/events/jaydon.png"
import placeholder4 from "../assets/Photos/events/robes.jpg"
import brickWall from "../assets/Photos/brickWall.png"
import brickOutline from "../assets/Photos/brickOutlines.png"
import Footer from '../components/footer'
// import Button from '../components/button'

function Events() {
    const [currImage, setCurrImage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    // const [popup, setPopup] = useState(null);
    const [popup, setPopup] = useState<EventItem | null>(null);
    const [carousel_popupIndex, setCarousel_popupIndex] = useState(0);
    const [isResetting, setIsResetting] = useState(false);
    // const [selFellowship, setSelFellowship] = useState(null);
    const [selFellowship, setSelFellowship] = useState<string | null>(null);
    // const [searchText, setSearchText] = useState('');
    const [searchText, setSearchText] = useState<string>('');

    // to implement once connected to supabase data
    // const [loading, setLoading] = useState(true)



    // const fellowshipMap = {
    //     "Adult": "adult",
    //     "Young Adult": "ya",
    //     "Youth": "y",
    //     "Kidz": "kidz",
    //     "Kidz Jr": "kjr",
    //     "All": null
    // }

    const fellowshipMap: Record<string, string> = {
        "Adult": "adult",
        "Young Adult": "ya",
        "Youth": "y",
        "Kidz": "kidz",
        "Kidz Jr": "kjr",
        "All": ""
    }
    
    

    const carouselImages = [
        placeholder1, 
        placeholder2, 
        placeholder3, 
        placeholder4
    ]

    const totalImages = carouselImages.length;
    const carousell_nextImg = () => {
        setIsTransitioning(true);
        setTimeout(()=> {
            setCurrImage((prev) => (prev + 1) % totalImages);
            setIsTransitioning(false)
        }, 500)
    }

    // const carousell_prevImg = () => {
    //     setIsTransitioning(true);
    //     setTimeout(()=> {
    //         setCurrImage((prev) => (prev - 1 + totalImages) % totalImages)
    //         setIsTransitioning(false)
    //     }, 500)
    // }

    useEffect(() => {
        const interval = setInterval(() => {
            carousell_nextImg();
        },5000)

        return() => clearInterval(interval);
    }, [currImage])

    const popup_nextImg = () => {
        if (popup) {
            const totImg = popup.images.length;
            const visibleImg = 3;
            
            // Calculate how many shifts needed (round up)
            // const maxShifts = Math.ceil(totImg / visibleImg);
            const maxShifts = Math.floor(totImg / visibleImg) + 1;
            
            // Calculate current shift number (starts at 0)
            const currentShift = Math.floor(carousel_popupIndex / visibleImg);
            
            if (currentShift >= maxShifts - 1) {
                // Reached last shift, reset
                setIsResetting(true);
                setCarousel_popupIndex(0);
                setTimeout(() => setIsResetting(false), 50);
            } else {
                // Move to next shift (by 3)
                setCarousel_popupIndex((prev) => prev + 1);
            }
        }
    };

    // const popup_prevImg = () => {
    //     if (popup) {
    //         setCarousel_popupIndex((prev) => (prev - 1 + popup.images.length) % popup.images.length);
    //     }
    // };

    useEffect(() => {
        if (popup) {
            const interval = setInterval(() => {
                popup_nextImg();
            }, 3000);
            return () => clearInterval(interval)
        }
    },[popup, carousel_popupIndex])

    // --------------
    // event object
    // attributes: title, date, time, venue, fellowsips, description,images
    // fellowships and images are arrays
    // placeholder1 should be the listing main image
    const events = [
        {
            title: "HOA Beach Trip",
            dateTime: "03/03/2026, 10.30am",
            venue: "Sentosa Palawan Beach",
            fellowships: [
                "adult",
                "ya",
                "y"
            ],
            description: "01 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            images: [
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1
                // placeholder2, 
                // placeholder3, 
                // placeholder4
            ]
        },
        {
            title: "Church Anniversary",
            dateTime: "03/01/2026, 10.30am",
            venue: "Singapore Baptist Church",
            fellowships: [
                "adult",
                "ya",
                "y",
                "kidz",
                "kjr"
            ],
            description: "01 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            images: [
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1
                // placeholder2, 
                // placeholder3, 
                // placeholder4
            ]
        },
        {
            title: "Saint John Island Trip",
            dateTime: "17/01/2026, 9.30am",
            venue: "Saint John Island, Singapore",
            fellowships: [
                "y"
            ],
            description: "02 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            images: [
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4
            ]
        },
        {
            title: "Missions Food Fair",
            dateTime: "08/02/2026, 12.00pm",
            venue: "Singapore Baptist Church",
            fellowships: [
                "adult",
                "ya",
                "y",
                "kidz",
                "kjr"
            ],
            description: "03 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            images: [
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4
            ]
        },
        {
            title: "YA New Year Event",
            dateTime: "31/01/2026, 2.30pm",
            venue: "Singapore Baptist Church",
            fellowships: [
                "ya"
            ],
            description: "04 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            images: [
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4
            ]
        },
        {
            title: "Easter Service",
            dateTime: "06/04/2026, 10.30am",
            venue: "Singapore Baptist Church",
            fellowships: [
                "adult",
                "ya",
                "y",
                "kidz",
                "kjr"
            ],
            description: "05 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            images: [
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4
            ]
        },
        {
            title: "Good Friday Service",
            dateTime: "03/04/2026, 6.30pm",
            venue: "Singapore Baptist Church",
            fellowships: [
                "adult",
                "ya",
                "y",
                "kidz",
                "kjr"
            ],
            description: "06 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            images: [
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4
            ]
        },
        {
            title: "Zoo Visit",
            dateTime: "22/08/2026, 8.30am",
            venue: "Singapore Zoo",
            fellowships: [
                "kidz",
                "kjr"
            ],
            description: "07 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            images: [
                placeholder1, 
                placeholder2, 
                placeholder3, 
                placeholder4,
                placeholder1, 
                placeholder2
            ]
        },
    ]
    // --------------
    const fellowshipsList = [
        {name: "Adult", bgColour: "#A41216", txtColor: "#FFFFFF"},
        {name: "Young Adult", bgColour: "#37393A", txtColor: "#FFFFFF"},
        {name: "Youth", bgColour: "#254188", txtColor: "#FFFFFF"},
        {name: "Kidz", bgColour: "#A46512", txtColor: "#FFFFFF"},
        {name: "Kidz Jr", bgColour: "#7D12A4", txtColor: "#FFFFFF"},
        {name: "All", bgColour: "#999999", txtColor: "#000000"}
    ]
    
    // const filteredEvents = selFellowship
    // ? events.filter(e => e.fellowships.includes(selFellowship))
    // : events
    

    //  progress bar
    // step 1: parse dates to javascript date objects and sort the events chronologically
    const parseDate = (dateTimeStr: string) => {
        const datePart = dateTimeStr.split(',')[0].trim() // "03/01/2026"
        const [day, month, year] = datePart.split('/')   // ["03", "01", "2026"]
        return new Date(`${year}/${month}/${day}`)        // new Date("2026/01/03")
    }

    const sortedEvents = [...events].sort((a, b) => 
        parseDate(a.dateTime).getTime() - parseDate(b.dateTime).getTime()
    )
    // console.log(sortedEvents.map(e => e.title + " - " + e.dateTime))

    const filteredEvents = [...events]
        .filter(e => selFellowship ? e.fellowships.includes(selFellowship) : true)
        .filter(e => searchText ? e.title.toLowerCase().includes(searchText.toLowerCase()) : true)
        .sort((a, b) => parseDate(a.dateTime).getTime() - parseDate(b.dateTime).getTime())

    //Step 2 — Build the timeline layout
    // Create the horizontal line with nodes positioned alternately above and below, each connected by a vertical line.

    // Step 3 — Calculate midpoints
    // For each pair of adjacent events, calculate the midpoint position and render a checkpoint circle on the horizontal line.
    
    const calculateProgress = () => {
        const today = new Date()
        // console.log("today is: " + today)
        today.setHours(0, 0, 0, 0) // strip time, compare dates only
        // check if today's date is past the first event
        if (today < parseDate(sortedEvents[0].dateTime)) return 0

        // check if today's date is past the last event
        if (today >= parseDate(sortedEvents[sortedEvents.length - 1].dateTime)) return 100

        // find which segment today is in
        for (let i = 0; i < sortedEvents.length - 1; i++) {
            const segmentStart = parseDate(sortedEvents[i].dateTime)
            const segmentEnd = parseDate(sortedEvents[i + 1].dateTime)

            if (today >= segmentStart && today < segmentEnd) {
                // exactly on an event node
                if (today.getTime() === segmentStart.getTime()) {
                    return (i / (sortedEvents.length - 1)) * 100
                }
                // anywhere between two events = 50% of that segment
                return ((i + 0.5) / (sortedEvents.length - 1)) * 100
            }
        }
        return 0
    }
    const progressPercent = calculateProgress()
    // console.log(progressPercent)
    const today = new Date()
    
    // Step 4 — Calculate progress
    // Compare today's date against the sorted events to determine which segment we're currently in, then calculate what percentage of that segment has elapsed.

    // Step 5 — Render the progress fill
    // Use the percentage from Step 4 to set the width of a fill div inside the horizontal line.

    // Step 6 — Style everything
    // Style the nodes, line, checkpoints, fill, and alternating above/below layout to match your design.


    // to activate once connected to supabase data
    // if (loading) {
    //     return (
    //         <div className="loading_screen">
    //             <h2>Loading...</h2>
    //         </div>
    //     )
    // }
    return (
        <div id='events_wrap'>
            <img src={brickWall} id='bw1_event'/>
            <img src={brickWall} id='bw2_event'/>
            <div className='div_row' id='div_eventsTitle'>
                {/* should i leave the overlay? */}
                {/* <div id='div_overlay'></div> */}
                <div className='div_carouselWrapper'>
                    <img id='img_carousel2' src={carouselImages[currImage]}
                        key={currImage}
                        className={isTransitioning ? 'fade_out': 'fade_in'}></img>
                    </div>
                    <div id='carousel_texts'>
                        <h1>Events for<br/>2026</h1>
                        <p>Disclaimer: This is a tentative skeleton of the events our church will have for this year</p>
                        <p>Subject to addition of events as the year progresses</p>
                        <img src={brickOutline} id='bo_events'/>
                    </div>
            </div>
            <div id='greenSeperator'></div>
                {/* <div id='div_progressGrower'>progress grower</div> */}
                {/* step 2 */}
                <div id='div_eventsProgressBar'>
                    <div id='div_timeline_line'>
                        <div id='div_progressFill' style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    
                    {sortedEvents.map((event, index) => (
                        <div 
                            className={`div_timelineNode ${index % 2 === 0 ? 'node_above' : 'node_below'} `}
                            key={index}
                            style={{ left: `${(index / (sortedEvents.length - 1)) * 100}%` }}
                        >
                            <div className='node_dot'></div>
                            <div id="div_pbdetails" className={`${parseDate(event.dateTime) <= today ? 'node_past' : 'node_future'}`}>
                                <div className='node_label'>{event.title}</div>
                                <div className='node_dt'>{event.dateTime}</div>
                            </div>
                        </div>
                    ))}
                </div>
            <div className='div_row' id='div_legends_search'>
                <div className='div_column'>
                    <h4 id='filterby'>Filter By</h4>
                    <div className='div_row' id='div_fellowbtns'>
                        {fellowshipsList.map((fellowship, index) => (
                            <button
                                key={index}
                                className={`fellowship_btn ${selFellowship === fellowshipMap[fellowship.name] ? 'fellowship_btn_selected' : ''}`}
                                style={{backgroundColor: fellowship.bgColour}}
                                onClick={() => {
                                    setSearchText(''),
                                    setSelFellowship(
                                    fellowship.name === "All" ? null : fellowshipMap[fellowship.name]
                                )
                                }}>
                                {fellowship.name}
                            </button>
                        ))}
                    </div>
                </div>
                <input placeholder='search' id='input_search' value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                {/* <img src={brickWall} id='bw1_event'/> */}
            </div>
            <div id='div_chart'></div>
            <div className='div_row' id='div_eventsListings'>
                {/* {events.map((myEvent, index) => ( */}
                
                {/* {sortedEvents.map((myEvent, index) => ( */}
                {filteredEvents.map((myEvent, index) => (
                    <div className='div_column' id='div_eventElement' key={index} onClick={() => {
                        setPopup(myEvent);
                        setCarousel_popupIndex(0);}}>
                        <img src={myEvent.images[0]}/>
                        <h2>{myEvent.title}</h2>
                        <h3>{myEvent.dateTime}</h3>
                        <p>{myEvent.venue}</p>
                    </div>
                ))}
            </div>
            {popup && (
                <div>
                    <div id='div_overlay_background' onClick={() => setPopup(null)}>
                        <div className='div_column' id='div_popup'>
                            <img id='popup_primeImage' src={popup.images[0]}></img>
                            <div className='div_row' id='div_overlay_title'>
                                <div id='div_overlay_header' className='div_column'>
                                    <h1>{popup.title}</h1>
                                    <h3>{popup.dateTime}</h3>
                                    <h3>Venue: {popup.venue}</h3>
                                </div>
                                {/* add fellowship tag */}
                                <button id='btn_overlayCU'>Contact Us</button>
                            </div>
                            <p id='p_overlay_des'>{popup.description}</p>
                            <h3 style={{fontFamily: 'Oxygen'}}>Take a look</h3>
                            <div className='div_row' id='div_overlay_carousel'>
                                <div className='carousel-track-popup' 
                                    style={{
                                        transform: `translateX(-${carousel_popupIndex * 12}vw)`,
                                        transition: 'transform 0.5s ease-in-out'
                                }}>
                                {/* {popup.images.map((img, index) => (
                                    <img src={img} key={index} id='img_popup_carou'/>
                                ))} */}
                                {popup.images.map((img: string, index: number) => (
                                    <img src={img} key={index} id='img_popup_carou'/>
                                ))}
                                </div>
                            </div>  
                            <img src={brickWall} id='o_bw'/>
                            <img src={brickWall} id='o_bw2'/>
                        </div>
                        
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    )
}

export default Events