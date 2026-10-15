"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./fellowship.module.css";

import Button from "@/components/button/button";
import placeholder from "@/public/events/jaydon.png";   // local fallback photo
import brickWall from "@/public/brickWall.png";
import brickOutline from "@/public/brickOutlines.png";

type FellowshipProps = {
  name: string;
  color: string;
  tag: string;
  showCellGroups: boolean;
  info: string[];
  cellgroups: string[];
  cgTexts: string[];
};

// Decorative corner brick: static import, so no width/height needed
function Brick({ className }: { className: string }) {
  return (
    <Image
      src={brickWall}
      alt=""
      aria-hidden="true"
      sizes="15vw"
      className={`${styles.brick} ${className}`}
    />
  );
}

function FellowshipsPage({ name, color, tag, showCellGroups, info, cellgroups, cgTexts }: FellowshipProps) {
  const [fellowshipData, setFellowshipData] = useState<any>(null);
  const [selectedCG, setSelectedCG] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/fellowships?tag=${tag}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => setFellowshipData(Array.isArray(data) ? data[0] : data))
      .catch((err) => {
        if (err?.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [tag]);

  // adjust these field names to your Supabase columns
  const videoSrc: string | undefined = fellowshipData?.videoArray?.[0];
  const photo1 = fellowshipData?.imageArray?.[0] ?? placeholder;
  const photo2 = fellowshipData?.imageArray?.[1] ?? placeholder;

  useEffect(() => {
    console.log("Fellowship data:", fellowshipData);
    console.log("Upcoming events:", fellowshipData?.upcomingEvents);
  }, [fellowshipData]);

  return (
    <div className={styles.fellowship_wrapper}>
      {/* HERO: the video lives only in this section */}
      <section className={styles.hero} style={{ backgroundColor: color }}>
        
    <div className={styles.heroVideoBackground}>
    {videoSrc && (
        <video
        key={videoSrc}
        className={styles.heroVideo}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        />
    )}
    </div>


        <div className={`div_column ${styles.div_faTitle}`}>
          <h1 style={{ color }}>{name.toUpperCase()}</h1>
        </div>

        <div className={`div_row ${styles.faInfo}`}>
          <div className={styles.photoFrame}>
            <Image src={photo1} alt="" fill sizes="40vw" className={styles.photo} />
          </div>

          <div className={`div_column ${styles.wwd}`}>
            <Brick className={styles.brickTR} />
            <h3 style={{ color }}>WHAT WE DO</h3>
            <h5 style={{ color }}>{info[1]}</h5>
            <p>{info[2]}</p>
            <Button title="Reach Out" />
          </div>
        </div>
      </section>

      {/* ATTENTION BAR */}
      <div className={styles.div_attentionAction} style={{ backgroundColor: color }}>
        <h3>{info[3]}</h3>
      </div>

      {/* BELOW THE BAR: placeholder design, a soft tint of the fellowship colour */}
      <section
        className={styles.belowBar}
        style={{ backgroundColor: `color-mix(in srgb, ${color} 10%, white)` }}
      >
        {showCellGroups && (
          <div className={`div_column ${styles.cgBtnContainer}`}>
            <h3 style={{ color }}>Cell Groups</h3>
            <div className={`div_row ${styles.div_faCGs}`}>
              {cellgroups.map((cg, index) => (
                <button
                  key={cg}
                  type="button"
                  className={styles.div_CG_btn}
                  onClick={() => setSelectedCG(index)}
                  style={{ backgroundColor: selectedCG === index ? color : "#808080" }}
                >
                  {cg}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={`div_row ${styles.faInfo}`}>
          <div className={`div_column ${styles.wwd}`}>
            <Brick className={styles.brickTL} />
            <p>{cgTexts[selectedCG]}</p>
          </div>

          <div className={styles.photoFrame}>
            <Image src={photo2} alt="" fill sizes="40vw" className={styles.photo} />
          </div>
        </div>

        <div className={`div_column ${styles.div_upcoming}`}>
          <h3 style={{ color }}>Upcoming</h3>
          <div className="div_row">
            {fellowshipData?.upcomingEvents?.map((event: any, index: number) => (
              <div key={index} className={styles.div_upcomingSingle}>
                <div><h4>{event.name}</h4></div>
                <p>{event.book}</p>
                <p>{event.venue}</p>
                <p>{event.dateTime}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM IMAGE SECTION */}
      <div className={styles.div_imgSection} style={{ backgroundColor: color }}>
        <Image src={brickOutline} alt="" aria-hidden="true" sizes="10vw" className={`${styles.outline} ${styles.outlineTL}`} />
        <Image src={brickOutline} alt="" aria-hidden="true" sizes="10vw" className={`${styles.outline} ${styles.outlineBR}`} />
        img section
      </div>
    </div>
  );
}

export default FellowshipsPage;