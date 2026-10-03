"use client"

import styles from './historyCard.module.css'
import { useEffect, useRef, useState } from 'react'

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
  const [currentImage, setCurrentImage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % HCProps.images.length);
  };

  const previousImage = () => {
    setCurrentImage(
      (currentImage - 1 + HCProps.images.length) % HCProps.images.length
    );
  };

  // Close the popup when clicking anywhere outside the popup
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        HCProps.onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [HCProps.onClose]);

  // Position the popup relative to historyCardsAU
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;

    // Start by centering the popup on the clicked node
    let left = HCProps.x - cardWidth / 2;
    let top = HCProps.y - cardHeight / 2;

    // Prevent the popup from going outside the left side
    if (left < 0) {
      left = 0;
    }

    // Prevent the popup from going outside the right side
    if (left + cardWidth > HCProps.containerWidth) {
      left = HCProps.containerWidth - cardWidth;
    }

    // Prevent the popup from going outside the top
    if (top < 0) {
      top = 0;
    }

    // Prevent the popup from going outside the bottom
    if (top + cardHeight > HCProps.containerHeight) {
      top = HCProps.containerHeight - cardHeight;
    }

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }, [
    HCProps.x,
    HCProps.y,
    HCProps.containerWidth,
    HCProps.containerHeight
  ]);

  return (
    <div
      ref={cardRef}
      className={`div_column ${styles.containerHC}`}
    >
      <div className={`div_row ${styles.headerHC}`}>
        <div className="div_column">
          <h3>{HCProps.title}</h3>
          <h4>{HCProps.date}</h4>
        </div>

        <button
          className={styles.closeButton}
          onClick={HCProps.onClose}
        >
          ×
        </button>
      </div>
      <div className={styles.carousel}>
        <button onClick={previousImage}>
          ‹
        </button>

        <img
          src={HCProps.images[currentImage]}
          alt={HCProps.title}
        />

        <button onClick={nextImage}>
          ›
        </button>
      </div>
      <p>{HCProps.description}</p>

    </div>
  );
}