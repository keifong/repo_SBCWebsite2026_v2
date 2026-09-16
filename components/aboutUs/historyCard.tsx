"use client"

import styles from './historyCard.module.css'
import { useState } from 'react'

interface HCProps {
  images: string[]
  title: string
  date: string
  description: string
} 

export default function HistoryCard(HCProps: HCProps) {

  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () => {
    setCurrentImage((currentImage + 1) % HCProps.images.length);
  };

  const previousImage = () => {
    setCurrentImage(
      (currentImage - 1 + HCProps.images.length) % HCProps.images.length
    );
  };

  return(
    <>
      <div className={`div_column ${styles.containerHC}`}>
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