"use client";

import styles from "./historyCard.module.css";
import { useEffect, useRef, useState } from "react";

interface NodePosition {
  x: number;
  y: number;
}

interface HCProps {
  images: string[];
  title: string;
  date: string;
  description: string;
  onClose: () => void;
  x: number;
  y: number;
  containerWidth: number;
  containerHeight: number;
  nodePositions: NodePosition[];
}

export default function HistoryCard(props: HCProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % props.images.length);
  };

  const previousImage = () => {
    setCurrentImage(
      (currentImage - 1 + props.images.length) % props.images.length
    );
  };

  // Close the popup when clicking outside it.
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        props.onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [props.onClose]);

  // Keep the popup within the timeline container.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const padding = 12;

    const maxLeft = Math.max(
      padding,
      props.containerWidth - cardWidth - padding
    );

    const maxTop = Math.max(
      padding,
      props.containerHeight - cardHeight - padding
    );

    const left = Math.max(
      padding,
      Math.min(props.x - cardWidth / 2, maxLeft)
    );

    const top = Math.max(
      padding,
      Math.min(props.y - cardHeight / 2, maxTop)
    );

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }, [
    props.x,
    props.y,
    props.containerWidth,
    props.containerHeight,
  ]);


  return (
    <div
      ref={cardRef}
      className={`div_column ${styles.containerHC}`}
    >
      <div className={`div_row ${styles.headerHC}`}>
        <div className="div_column">
          <h3>{props.title}</h3>
          <h4>{props.date}</h4>
        </div>

        <button
          className={styles.closeButton}
          onClick={props.onClose}
        >
          ×
        </button>
      </div>

      <div className={styles.carousel}>
        <button onClick={previousImage}>‹</button>

        <img
          src={props.images[currentImage]}
          alt={props.title}
        />

        <button onClick={nextImage}>›</button>
      </div>

      <p>{props.description}</p>
    </div>
  );
}