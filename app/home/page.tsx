"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import "./style_home.css";

import Footer from "@/components/footer";
import NavbarWhite from "@/components/navbarWhite";
import HomeButton from "@/components/homeButton";
import Button from "@/components/button";

import brickWall from "../../public/brickWall.png";
import bl1 from "../../public/home/brickLines1.png";
import bl2 from "../../public/home/brickLines2.png";
import bl3 from "../../public/home/brickLines3.png";
import brickLines from "../../public/brickOutlines.png";

function Home() {
    const [currImage, setCurrImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [homeImages, setHomeImages] = useState<any[]>([]);

    // Load data from Supabase through the Next.js API route
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/home')

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch home data: ${response.status}`
                    );
                }

                const data = await response.json();

                console.log("data:", data);

                setHomeImages(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // -------- assign images --------

    const leadershipBtn = homeImages.find(
        (img) => img.imageName === "choirBtn"
    )?.image;

    const choirBtn = homeImages.find(
        (img) => img.imageName === "choirBtn"
    )?.image;

    const fellowshipBtn = homeImages.find(
        (img) => img.imageName === "fellowshipBtn"
    )?.image;

    const eventsBtn = homeImages.find(
        (img) => img.imageName === "abtUsBtn"
    )?.image;

    const abtUsBtn = homeImages.find(
        (img) => img.imageName === "abtUsBtn"
    )?.image;

    const yay = homeImages.find(
        (img) => img.imageName === "yay"
    )?.image;

    const liftConstruction = homeImages.find(
        (img) => img.imageName === "liftConstruction"
    )?.image;

    const prayer = homeImages.find(
        (img) => img.imageName === "prayer"
    )?.image;

    // ----------------------------

    if (loading) {
        return (
            <div className="loading_screen">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <>
            <div className="div_wrapper_home">

                <NavbarWhite />

                {/* Background image */}
                <div id="img_bg">
                    {yay && (
                        <img
                            src={yay}
                            alt="Singapore Baptist Church"
                        />
                    )}
                </div>

                <div className="div_column">

                    {/* Welcome section */}
                    <div className="div_column" id="div_home_2nd">

                        <div className="div_column" id="div_title">

                            <img
                                src={brickWall}
                                id="home_bw1"
                                alt=""
                            />

                            <h3 id="h3_welcome">
                                WELCOME TO
                            </h3>

                            <h1>
                                SINGAPORE
                                <br />
                                BAPTIST CHURCH
                            </h1>

                            <h3 id="h3_cn">
                                新加坡浸信教会
                            </h3>

                            <img
                                src={brickWall}
                                id="home_bw2"
                                alt=""
                            />

                        </div>

                        {/* Home buttons */}
                        <div
                            className="div_row"
                            id="div_btns_home"
                        >

                            <Link
                                href="/leadership"
                                className="link_btn"
                            >
                                {leadershipBtn && (
                                    <HomeButton
                                        image={leadershipBtn}
                                        title="Pastoral Leadership"
                                        subText="Learn More"
                                    />
                                )}
                            </Link>

                            <Link
                                href="/fellowshipsAdult"
                                className="link_btn"
                            >
                                {fellowshipBtn && (
                                    <HomeButton
                                        image={fellowshipBtn}
                                        title="Fellowships"
                                        subText="Learn More"
                                    />
                                )}
                            </Link>

                            {choirBtn && (
                                <HomeButton
                                    image={choirBtn}
                                    title="Choir"
                                    subText="Learn More"
                                />
                            )}

                            <Link
                                href="/events"
                                className="link_btn"
                            >
                                {eventsBtn && (
                                    <HomeButton
                                        image={eventsBtn}
                                        title="Events"
                                        subText="Learn More"
                                    />
                                )}
                            </Link>

                            <Link
                                href="/aboutUs"
                                className="link_btn"
                            >
                                {abtUsBtn && (
                                    <HomeButton
                                        image={abtUsBtn}
                                        title="About Us"
                                        subText="Learn More"
                                    />
                                )}
                            </Link>

                        </div>

                    </div>

                    <div id="greenSeperator" />

                    {/* Service Timing */}
                    <div
                        className="div_row"
                        id="div_mission"
                    >

                        <img
                            src={bl1}
                            id="home_bl1_1"
                            alt=""
                        />

                        <img
                            src={bl2}
                            id="home_bl2"
                            alt=""
                        />

                        <img
                            src={bl3}
                            id="home_bl3"
                            alt=""
                        />

                        <div
                            className="div_column"
                            id="div_serviceTiming"
                        >

                            <h1>
                                Join Us in Worship
                            </h1>

                            <h3>
                                Every Sunday
                            </h3>

                            <h3>
                                10.30am - 12pm
                            </h3>

                            <p>
                                Fellowship with us afterwards through Lunch
                            </p>

                            <p id="freep_freel">
                                Free Parking, Free Lunch
                            </p>

                        </div>

                        {prayer && (
                            <img
                                src={prayer}
                                id="img_missionImg"
                                alt="Church fellowship"
                            />
                        )}

                    </div>

                    {/* Contact Us */}
                    <div
                        className="div_row"
                        id="div_mission"
                    >

                        {liftConstruction && (
                            <img
                                src={liftConstruction}
                                id="img_missionImg"
                                alt="Singapore Baptist Church"
                            />
                        )}

                        <div
                            className="div_column"
                            id="div_cuText"
                        >

                            <img
                                src={brickLines}
                                id="cuText_bl"
                                alt=""
                            />

                            <h2>
                                Contact Us
                            </h2>

                            <h4>
                                1 Cambridge Rd, Singapore 219677
                            </h4>

                            <p>
                                Office Hours:
                                <br />
                                Monday to Fridays: 9.00am - 5.30pm
                                <br />
                                Saturdays: 9.00am to 1.00pm
                            </p>

                            <div
                                className="div_row"
                                id="div_tel"
                            >

                                <div className="div_column">

                                    <p className="tel">
                                        Tel: 62993845
                                    </p>

                                    <p className="tel">
                                        Fax: 62938946
                                    </p>

                                </div>

                                <Link
                                    href="/contactUs"
                                    className="link_btn"
                                >
                                    <Button title="CONTACT US" />
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

                <Footer />

            </div>
        </>
    );
}

export default Home;