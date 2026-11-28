"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Button from "@/components/button/button";
import styles from "./ferrySection.module.css";

export interface ContactPerson {
    title: string;
    name?: string;
    phoneNum?: string;
    officeHrs?: string;
    images: string[];
}

type Pickup = {
    title: string;
    mapSrc: string;
    imageIndex: number; // position in ferryDetails.images
    alt: string;
    description: string;
};

// Plain JS strings: use a normal ' here, not &apos; (that only works in JSX text)
const PICKUPS: Pickup[] = [
    {
        title: "Pek Kio Market",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1915408547378!2d103.84901596957802!3d1.3158635999169814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c369a0f687%3A0x5bc4e8430a592629!2s42%20Cambridge%20Rd%2C%20Singapore%20210042!5e0!3m2!1sen!2ssg!4v1775733461009!5m2!1sen!2ssg",
        imageIndex: 2,
        alt: "Pek Kio Market pickup point",
        description:
            "Pick up location is right in front of Pek Kio Market, beside Blk 42 Cambridge Road, there are seats in the shade right before where the church van will turn in.",
    },
    {
        title: "Blk 40 Cambridge Rd",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.383081709676!2d103.84836955641062!3d1.315863599666535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c319853287%3A0x3be2efa1823e5d47!2s40%20Cambridge%20Rd%2C%20Block%2040%2C%20Singapore%20210040!5e0!3m2!1sen!2ssg!4v1775757972171!5m2!1sen!2ssg",
        imageIndex: 0,
        alt: "Blk 40 Cambridge Rd pickup point",
        description:
            "Pick up location is right at the entrance of the turn-in to residential HDB blocks alongside Cambridge Road, next to Block 40, in front of the multi-story carpark 37A.",
    },
    {
        title: "Farrer Park Exit C",
        // TODO: this is the same embed as Pek Kio Market, replace with the Farrer Park Exit C link
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1915408547378!2d103.84901596957802!3d1.3158635999169814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c369a0f687%3A0x5bc4e8430a592629!2s42%20Cambridge%20Rd%2C%20Singapore%20210042!5e0!3m2!1sen!2ssg!4v1775733461009!5m2!1sen!2ssg",
        imageIndex: 1,
        alt: "Farrer Park Exit C pickup point",
        description:
            "Pick up location is at Farrer Park Exit C's pick up point, to the right of Exit C. Can be seen once you step out of Exit C. There are seats at the pick up point.",
    },
];

type FerrySectionProps = {
    id?: string;
    drivers: ContactPerson[];
    ferryDetails?: ContactPerson;
    onSeekHelp?: () => void;
};

function FerrySection({id, drivers, ferryDetails, onSeekHelp }: FerrySectionProps) {

    const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!zoom) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setZoom(null);
        };

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";   // stops the page scrolling behind the popup
        document.addEventListener("keydown", onKey);
        closeRef.current?.focus();

        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener("keydown", onKey);
        };
    }, [zoom]);

    return (
        <div id={id} className={`div_column ${styles.div_directions}`}>
            <div className={`div_column ${styles.div_sundayFerry}`}>
                <div className={styles.ferryTitle}>
                    <h2>Sunday Service Ferry</h2>
                    <div className={styles.seekHelpWrap} onClick={onSeekHelp}>
                        <Button title="SEEK HELP" />
                    </div>
                </div>

                <div className={styles.div_drivers}>
                    {drivers.map((person, index) => (
                        <div key={index} className={`div_column ${styles.div_ferryDriver}`}>
                            <h3>{person.name}</h3>
                            <p>{person.phoneNum}</p>

                            {person.images?.[0] && (
                                <Image
                                    className={styles.img_sunFerry}
                                    src={person.images[0]}
                                    alt={person.name ?? "Driver photo"}
                                    width={150}
                                    height={150}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <h3 className={styles.pickupDeet}>Pick up details</h3>

                <p className={styles.ferryDeclaration}>
                    Most of the time, we know who we are picking up.
                    The person will call as well to notify. These are
                    the current pick up locations that we go to. If
                    you have any persons of need that requires this
                    ferry pickup service near our church, please give
                    us a call so we can accomodate
                </p>

                {ferryDetails && (
                    <div className={`${styles.div_ferryRow} ${styles.ferryMapInfo}`}>
                        {PICKUPS.map((pickup) => {
                            const photo = ferryDetails.images?.[pickup.imageIndex];

                            return (
                                <div key={pickup.title} className={`div_column ${styles.div_ferryPickup}`}>
                                    <h4 className={styles.locTitle}>{pickup.title}</h4>

                                    <iframe
                                        src={pickup.mapSrc}
                                        title={`Map of ${pickup.title}`}
                                        className={styles.iframe_ferryPickup}
                                        allowFullScreen={true}
                                        loading="lazy"
                                    />

                                    <div className={styles.locDeets}>
                                        {photo && (
                                            <Image
                                                className={styles.img_pickupLocations}
                                                src={photo}
                                                alt={pickup.alt}
                                                width={200}
                                                height={150}
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`Enlarge photo: ${pickup.alt}`}
                                                onClick={() => setZoom({ src: photo, alt: pickup.alt })}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        setZoom({ src: photo, alt: pickup.alt });
                                                    }
                                                }}
                                            />
                                        )}

                                        <p className={styles.p_locDeets}>{pickup.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {zoom &&
              createPortal(
                  <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={zoom.alt} onClick={() => setZoom(null)}>
                      <button
                          ref={closeRef}
                          type="button"
                          className={styles.lightboxClose}
                          aria-label="Close photo"
                          onClick={() => setZoom(null)}
                      >
                          ×
                      </button>

                      <div className={styles.lightboxFrame} onClick={(e) => e.stopPropagation()}>
                          <Image src={zoom.src} alt={zoom.alt} fill sizes="80vw" className={styles.lightboxImg} />
                      </div>
                  </div>,
                  document.body
              )}
        </div>
    );
}

export default FerrySection;
