"use client";

import { useState, useEffect } from "react";
import styles from "./fellowship.module.css";

import Button from "@/components/button/button";
import placeholder3 from "@/public/events/jaydon.png";
import brickWall from "@/public/brickWall.png";
import brickOutline from "@/public/brickOutlines.png";

import Image from "next/image";

type FellowshipProps = {
    name: string;
    color: string;
    tag: string;
    showCellGroups: boolean;
    info: string[];
    cellgroups: string[];
    cgTexts: string[];
};

// info:
// [0] Cell Group
// [1] subtext of what we do
// [2] content of what we do
// [3] content of attention bar
// [4] content of more information

function FellowshipsPage({
    name,
    color,
    tag,
    showCellGroups,
    info,
    cellgroups,
    cgTexts,
}: FellowshipProps) {
    const [fellowshipData, setFellowshipData] =
        useState<any>(null);

    const [selectedCG, setSelectedCG] = useState(0);

    const [loading, setLoading] = useState(true);

    // Fetching data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/fellowships");

                const data = await response.json();

                setFellowshipData(data[0]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tag]);

    if (loading) {
        return (
            <div className="loading_screen">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        // <div className="div_wrapper">
        <div className={styles.fellowship_wrapper}>

            {/* Fellowship title */}

            <div className={`div_column ${styles.div_faTitle}`}>
                <h1 style={{ color: color }}>
                    {name.toUpperCase()}
                </h1>
            </div>

            {/* Fellowship video */}

            <div className={styles.div_vid}>
                {fellowshipData && (
                    <video
                        autoPlay
                        muted
                        loop
                        className={styles.vid}
                    >
                        <source
                            src={
                                fellowshipData.videoArray[0]
                            }
                            type="video/mp4"
                        />
                    </video>
                )}
            </div>

            {/* What we do */}

            <div
                className={`div_row ${styles.faInfo}`}
            >
                <Image
                    src={placeholder3}
                    alt="Placeholder"
                    className={styles.faPh}
                    width={300}
                    height={300}
                />

                <div
                    className={`div_column ${styles.wwd}`}
                >
                    <h3 style={{ color: color }}>
                        WHAT WE DO
                    </h3>

                    <h5 style={{ color: color }}>
                        {info[1]}
                    </h5>

                    <p>{info[2]}</p>

                    <Image
                        src={brickWall}
                        alt="Brick Wall"
                        className={styles.img_faBo1}
                        width={300}
                        height={300}
                    />

                    <Button title="Reach Out" />
                </div>
            </div>

            {/* Attention / action bar */}

            <div
                className={styles.div_attentionAction}
                style={{
                    backgroundColor: color,
                }}
            >
                <h3>{info[3]}</h3>
            </div>

            {/* Cell groups */}

            {showCellGroups && (
                <div
                    className={`div_column ${styles.cgBtnContainer}`}
                >
                    <h3 style={{ color: color }}>
                        Cell Groups
                    </h3>

                    <div
                        className={`div_row ${styles.div_faCGs}`}
                    >
                        {cellgroups.map(
                            (cg: string, index: number) => (
                                <div
                                    key={index}
                                    className={styles.div_CG_btn}
                                    onClick={() =>
                                        setSelectedCG(index)
                                    }
                                    style={{
                                        backgroundColor:
                                            selectedCG === index
                                                ? color
                                                : "#808080",
                                    }}
                                >
                                    {cg}
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Selected cell group information */}

            <div
                className={`div_row ${styles.faInfo}`}
            >
                <div
                    className={`div_column ${styles.wwd}`}
                >
                    <p>
                        {cgTexts[selectedCG]}
                    </p>

                    <Image
                        src={brickWall}
                        alt="Brick Wall"
                        className={styles.img_faBo2}
                        width={300}
                        height={300}
                    />
                </div>

                <Image
                    src={placeholder3}
                    alt="Placeholder"
                    className={styles.faPh}
                    width={300}
                    height={300}
                />
            </div>

            {/* Upcoming */}

            <div
                className={`div_column ${styles.div_upcoming}`}
            >
                <h3>Upcoming</h3>

                <div className="div_row">
                    {fellowshipData?.upcomingEvents?.map(
                        (event: any, index: number) => (
                            <div
                                key={index}
                                className={
                                    styles.div_upcomingSingle
                                }
                            >
                                <div>
                                    <h4>{event.name}</h4>
                                </div>

                                <p>{event.book}</p>

                                <p>{event.venue}</p>

                                <p>{event.dateTime}</p>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Bottom image section */}
            <div
                className={styles.div_imgSection}
                style={{
                    backgroundColor: color,
                }}
            >
                <Image
                    src={brickOutline}
                    alt="Brick Outline"
                    className={styles.faBO1}
                    width={300}
                    height={300}
                />

                <Image
                    src={brickOutline}
                    alt="Brick Outline"
                    className={styles.faBO2}
                    width={300}
                    height={300}
                />

                img section
            </div>
        </div>
    );
}

export default FellowshipsPage;