"use client"

import styles from './historyCard.module.css'
import { useRef, useEffect, useState } from 'react'

interface HCProps {
  images: string[]
  title: string
  date: string
  description: string
  onClose: () => void
  x: number
  y: number
  containerWidth: number
  containerHeight: number
} 

export default function HistoryCard(HCProps: HCProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    setCurrentImage((currentImage + 1) % HCProps.images.length);
  };

  const previousImage = () => {
    setCurrentImage(
      (currentImage - 1 + HCProps.images.length) % HCProps.images.length
    );
  };

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;

    const left = Math.max(
      cardWidth / 2,
      Math.min(HCProps.x, HCProps.containerWidth - cardWidth / 2)
    );

    const top = Math.max(
      cardHeight / 2,
      Math.min(HCProps.y, HCProps.containerHeight - cardHeight / 2)
    );

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }, [HCProps.x, HCProps.y, HCProps.containerWidth, HCProps.containerHeight]);

  return(
    <>
      <div 
        className={`div_column ${styles.containerHC}`}
        style={{
          left: `${HCProps.x}px`,
          top: `${HCProps.y}px`
        }}
      >
        <button className={styles.closeButton} onClick={HCProps.onClose} > × </button>
        <div className={`div_row ${styles.headerHC}`}>
          <h5>{HCProps.date}</h5>
          <h4>{HCProps.title}</h4>
        </div>
        <div className={styles.carousel}>

        <button onClick={previousImage}>
          ‹
        </button>

        <img
          src={HCProps.images[currentImage]}
          alt={`${HCProps.title} photo ${currentImage + 1}`}
        />

        <button onClick={nextImage}>
          ›
        </button>

      </div>

      <div className={styles.indicators}>
        {HCProps.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={
              index === currentImage
                ? styles.activeIndicator
                : styles.indicator
            }
          />
        ))}
      </div>
        <p>{HCProps.description}</p>
      </div>
    </>
  )
}