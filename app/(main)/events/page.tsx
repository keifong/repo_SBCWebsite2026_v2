"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./events.module.css";
import EventCard from "./eventCard";
import EventPopup from "./eventPopup";
import {
    carouselImages,
    fellowshipsList,
    fellowshipMap,
} from "./eventsData";
import type { EventItem } from "./eventsData";
import brickWall from "@/public/brickWall.png";
import brickOutline from "@/public/brickOutlines.png";

function Events() {
    const [currImage, setCurrImage] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    // const [popup, setPopup] = useState(null);
    const [popup, setPopup] = useState<EventItem | null>(null);
    // const [selFellowship, setSelFellowship] = useState(null);
    const [selFellowship, setSelFellowship] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");

    const [events, setEvents] = useState<EventItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch("/api/events");

                if (!response.ok) {
                    throw new Error(`Failed to fetch events: ${response.status}`);
                }

                const data = await response.json();

                const formattedEvents: EventItem[] = data.map((item: any) => ({
                    id: item.id,
                    created_at: item.created_at,
                    title: item.e_Title,
                    dateTime: item.e_DateTime,
                    venue: item.e_Venue,
                    fellowships: item.e_fellowship ?? [],
                    description: item.e_Description,
                    images: [
                        ...(item.coverImage ? [item.coverImage.trim()] : []),
                        ...(item.e_imagesArray ?? []).map((url: string) => url.trim()),
                    ],
                }));

                setEvents(formattedEvents);
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setError("Unable to load events. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

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


    const calculateProgress = () => {
        if (sortedEvents.length === 0) return 0;

        const today = new Date();
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
    
    return (
        <div className={styles.events_wrap}>
            <Image
                src={brickWall}
                className={styles.bw1_event}
                alt="Brick wall"
                width={100}
                height={100}
            />

            <Image
                src={brickWall}
                className={styles.bw2_event}
                alt="Brick wall"
                width={100}
                height={100}
            />
            <div className={`div_row ${styles.div_eventsTitle}`}>
                <div className={styles.div_carouselWrapper}>
                    <Image
                        className={`${styles.img_carousel2} ${
                            isTransitioning
                                ? styles.fade_out
                                : styles.fade_in
                        }`}
                        src={carouselImages[currImage]}
                        key={currImage}
                        alt="Carousel image"
                        width={1920}
                        height={1080}
                        sizes="100vw"
                    />
                    </div>
                    <div className={styles.carousel_texts}>
                        <h1>Events for<br/>2026</h1>
                        <p>Disclaimer: This is a tentative skeleton of the events our church will have for this year</p>
                        <p>Subject to addition of events as the year progresses</p>
                        <Image
                            src={brickOutline}
                            className={styles.bo_events}
                            alt="Brick outline"
                            width={100}
                            height={100}
                        />
                    </div>
            </div>
            <div className='greenSeperator'></div>
                <div className={styles.div_eventsProgressBar}>
                    <div className={styles.div_timeline_line}>
                        <div
                            className={styles.div_progressFill}
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    
                    {sortedEvents.map((event, index) => (
                        <div
                            className={`${styles.div_timelineNode} ${
                                index % 2 === 0
                                    ? styles.node_above
                                    : styles.node_below
                            }`}
                            key={index}
                            style={{
                                left: `${
                                    sortedEvents.length === 1
                                        ? 0
                                        : (index / (sortedEvents.length - 1)) * 100
                                }%`,
                            }}
                        >
                            <div className={styles.node_dot} />
                            <div className={`${styles.div_pbdetails} ${
                                    parseDate(event.dateTime) <= today
                                        ? styles.node_past
                                        : styles.node_future
                                }`}>
                                <div className={styles.node_label}>
                                    {event.title}
                                </div>

                                <div className={styles.node_dt}>
                                    {event.dateTime}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            <div className={`div_row ${styles.div_legends_search}`}>
                <div className="div_column">
                    <h4 className={styles.filterby}>
                        Filter By
                    </h4>

                    <div
                        className={`div_row ${styles.div_fellowbtns}`}
                    >
                        {fellowshipsList.map((fellowship, index) => (
                            <button
                                key={index}
                                className={`${styles.fellowship_btn} ${
                                    selFellowship === fellowshipMap[fellowship.name]
                                        ? styles.fellowship_btn_selected
                                        : ''
                                }`}
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
                <input
                    placeholder="search"
                    className={styles.input_search}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
                        {isLoading ? (
                <p>Loading events...</p>
            ) : error ? (
                <p>{error}</p>
            ) : filteredEvents.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <div className={`div_row ${styles.div_eventsListings}`}>
                    {filteredEvents.map((myEvent) => (
                        <EventCard
                            key={myEvent.id}
                            event={myEvent}
                            onClick={() => setPopup(myEvent)}
                        />
                    ))}
                </div>
            )}

            {popup && (
                <EventPopup
                    event={popup}
                    onClose={() => setPopup(null)}
                />
            )}
        </div>
    );
}

export default Events;