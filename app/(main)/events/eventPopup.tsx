"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import styles from "./events.module.css";
import type { EventItem } from "./eventsData";

import brickWall from "@/public/brickWall.png";

interface EventPopupProps {
    event: EventItem;
    onClose: () => void;
}

export default function EventPopup({
    event,
    onClose,
}: EventPopupProps) {
    const [mounted, setMounted] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [isResetting, setIsResetting] = useState(false);

    const popup_nextImg = () => {
      const totImg = event.images.length;
      const visibleImg = 3;

      const maxShifts = Math.floor(totImg / visibleImg) + 1;
      const currentShift = Math.floor(carouselIndex / visibleImg);

      if (currentShift >= maxShifts - 1) {
          setIsResetting(true);
          setCarouselIndex(0);

          setTimeout(() => setIsResetting(false), 50);
      } else {
          setCarouselIndex((prev) => prev + 1);
      }
    };

    useEffect(() => {
      const interval = setInterval(() => {
          popup_nextImg();
      }, 3000);

      return () => clearInterval(interval);
  }, [carouselIndex, event]);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setCarouselIndex(0);
    }, [event]);

    useEffect(() => {
        if (event.images.length <= 3) return;

        const interval = setInterval(() => {
            setCarouselIndex((prev) =>
                prev >= event.images.length - 1 ? 0 : prev + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [event]);

    useEffect(() => {
        if (!mounted) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [mounted]);

    if (!mounted) return null;

    return createPortal(
        <div
            className={styles.div_overlay_background}
            onClick={onClose}
        >
            <div
                className={`div_column ${styles.div_popup}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className={styles.popup_close}
                    onClick={onClose}
                    aria-label="Close event details"
                >
                    &times;
                </button>

                <Image
                    className={styles.popup_primeImage}
                    src={event.images[0]}
                    alt={event.title}
                    width={1920}
                    height={1080}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div
                    className={`div_row ${styles.div_overlay_title}`}
                >
                    <div
                        className={`div_column ${styles.div_overlay_header}`}
                    >
                        <h1>{event.title}</h1>
                        <h3>{event.dateTime}</h3>
                        <h3>Venue: {event.venue}</h3>
                    </div>

                    <button className={styles.btn_overlayCU}>
                        Contact Us
                    </button>
                </div>

                <p className={styles.p_overlay_des}>
                    {event.description}
                </p>

                <h3 style={{ fontFamily: "Oxygen" }}>
                    Take a look
                </h3>

                <div className={styles.div_overlay_carousel}>
                    <div
                        className={styles.carousel_track_popup}
                        style={{
                            transform: `translateX(-${carouselIndex * 15}vw)`,
                            transition: isResetting ? "none" : "transform 0.5s ease-in-out",
                        }}
                    >
                        {event.images.map((img, index) => (
                            <Image
                                src={img}
                                key={index}
                                alt={`${event.title} photo ${index + 1}`}
                                className={styles.img_popup_carou}
                                width={600}
                                height={400}
                                sizes="15vw"
                            />
                        ))}
                    </div>
                </div>

                <Image
                    src={brickWall}
                    className={styles.o_bw}
                    alt=""
                    aria-hidden="true"
                    width={100}
                    height={100}
                />

                <Image
                    src={brickWall}
                    className={styles.o_bw2}
                    alt=""
                    aria-hidden="true"
                    width={100}
                    height={100}
                />
            </div>
        </div>,
        document.body
    );
}
