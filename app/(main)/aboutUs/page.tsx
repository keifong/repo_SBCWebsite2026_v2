"use client";

import styles from "./page.module.css";
import Button from "@/components/button/button";
import HistoryCard from "@/components/aboutUs/historyCard";
import { useRef, useEffect, useState } from "react";
import { tempHistoryData } from "./historyData";
import {
  generateNodePositions,
  type NodePosition
} from "./historyLayout";


function AboutUs() {

  // Sort the history from newest → oldest
  // This means the first node is the newest event
  // and the final node is the oldest event
  const sortedHistoryData = [...tempHistoryData].sort((a, b) => {
    return new Date(`${b.date} 1`).getTime() - new Date(`${a.date} 1`).getTime();
  });

  // Group consecutive history entries by decade.
  // The data is already sorted newest to oldest.
  const eraGroups = sortedHistoryData.reduce<
    {
      decade: number;
      startIndex: number;
      endIndex: number;
    }[]
  >((groups, history, index) => {
    const year = new Date(`${history.date} 1`).getFullYear();
    const decade = Math.floor(year / 10) * 10;

    const currentGroup = groups[groups.length - 1];

    if (!currentGroup || currentGroup.decade !== decade) {
      groups.push({
        decade,
        startIndex: index,
        endIndex: index
      });
    } else {
      currentGroup.endIndex = index;
    }

    return groups;
  }, []);

  // Temporary images for each era.
  // Replace these paths with real historical church photographs later.
  const eraImages = [
    "/events/gifting.png",
    "/events/happy.png",
    "/events/jaydon.png"
  ];


  // Stores which history card is currently open
  // null means no card is open
  const [selectedHistory, setSelectedHistory] = useState<{
    history: typeof tempHistoryData[0];
    index: number;
  } | null>(null);

  // Reference to the history container
  // We use this to find its width and height
  const historyContainerRef = useRef<HTMLDivElement>(null);

  // Stores the current size of the history container
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0
  });

  // Stores the dynamically calculated height of the journey
  const [historyHeight, setHistoryHeight] = useState(0);

  // Stores the generated x/y position of every node
  const [nodePositions, setNodePositions] = useState<
    { x: number; y: number }[]
  >([]);


  // --------------------------------------------------
  // GET CONTAINER SIZE
  // --------------------------------------------------
  // This watches the history container.
  // If its width/height changes, containerSize is updated.
  // --------------------------------------------------
  // resize observer
  useEffect(() => {
    const container = historyContainerRef.current;
    if (!container) return;

    const updateSize = () => {
      setContainerSize({
        width: container.clientWidth,
        height: container.clientHeight
      });
    };

    // Get the initial size
    updateSize();

    // Continue watching for size changes
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);


  // --------------------------------------------------
  // GENERATE NODE POSITIONS
  // --------------------------------------------------
  // This runs whenever the container width changes
  // or the number of history events changes.
  // --------------------------------------------------


useEffect(() => {
  if (!containerSize.width) return;

  const result = generateNodePositions(
    sortedHistoryData,
    containerSize.width
  );

  setNodePositions(result.positions);
  setHistoryHeight(result.height);
}, [containerSize.width, sortedHistoryData.length]);




  return (
    <div className={`div_wrapper ${styles.containerAU}`}>

      {/* Page header */}
      <div className={`div_column ${styles.headerTxtAU}`}>
        <h1>About us</h1>
        <p>short subtitle about our church</p>

        {/* History search */}
        <div className={`div_row ${styles.searchAU}`}>
          <input placeholder="Type in keywords eg: Retreat, 2004" />
          <Button title="Search" />
        </div>
      </div>


      {/* --------------------------------------------------
          HISTORY JOURNEY CONTAINER
          --------------------------------------------------
          The height comes from historyHeight instead
          of using a fixed CSS height.
      -------------------------------------------------- */}

      <div
        ref={historyContainerRef}
        className={`div_column ${styles.historyCardsAU}`}
        style={{
          height: historyHeight ? `${historyHeight}px` : "0px"
        }}
      >
        
  {/* --------------------------------------------------
      ERA BACKGROUND IMAGES
      --------------------------------------------------
      Each image covers the vertical section occupied
      by that decade's history nodes.
  -------------------------------------------------- */}

      {nodePositions.length === sortedHistoryData.length &&
        eraGroups.map((era, eraIndex) => {
          const top =
            era.startIndex === 0
              ? 0
              : (
                  nodePositions[era.startIndex - 1].y +
                  nodePositions[era.startIndex].y
                ) / 2;

          const bottom =
            era.endIndex === sortedHistoryData.length - 1
              ? historyHeight
              : (
                  nodePositions[era.endIndex].y +
                  nodePositions[era.endIndex + 1].y
                ) / 2;

          const image = eraImages[eraIndex % eraImages.length];

          return (
            <div
              key={`era-${era.decade}`}
              className={styles.eraBackground}
              style={{
                top: `${top}px`,
                height: `${bottom - top}px`,
                backgroundImage: `
                  linear-gradient(
                    rgba(255, 255, 255, 0.45),
                    rgba(255, 255, 255, 0.45)
                  ),
                  url("${image}")
                `
              }}
            >
              <span className={styles.eraLabel}>
                {era.decade}
              </span>
            </div>
          );
        })}




        {/* path rendering */}
        {nodePositions.length === sortedHistoryData.length &&
          nodePositions.slice(0, -1).map((node, index) => {
            const nextNode = nodePositions[index + 1];

            const dx = nextNode.x - node.x;
            const dy = nextNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            return (
              <div
                key={`path-${index}`}
                className={styles.historyPath}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${distance}px`,
                  transform: `rotate(${angle}deg)`
                }}
              />
            );
          })}
        {/* --------------------------------------------------
            RENDER NODES
            --------------------------------------------------
            Only render them once every history item
            has successfully received a position.
        -------------------------------------------------- */}
        {nodePositions.length === sortedHistoryData.length &&
          sortedHistoryData.map((history, index) => (
            
            <button
              key={index}
              className={styles.historyNode}
              style={{
                left: nodePositions[index].x,
                top: nodePositions[index].y,
              }}
              onClick={() =>
                setSelectedHistory({ history, index })
              }
              aria-label={`View event: ${history.title}`}
              title={history.title}
            >
              <img
                src={history.images[0]}
                alt=""
                className={styles.historyNodeImage}
              />
              <span className={styles.historyNodeLabel}>
                {history.title}
              </span>
            </button>


          ))}


        {/* --------------------------------------------------
            HISTORY CARD
            --------------------------------------------------
            Only appears when selectedHistory isn't null.
        -------------------------------------------------- */}

      {selectedHistory && (
        <HistoryCard
          images={selectedHistory.history.images}
          date={selectedHistory.history.date}
          title={selectedHistory.history.title}
          description={selectedHistory.history.description}
          x={nodePositions[selectedHistory.index].x}
          y={nodePositions[selectedHistory.index].y}
          containerWidth={containerSize.width}
          containerHeight={historyHeight}
          nodePositions={nodePositions}
          onClose={() => setSelectedHistory(null)}
        />
      )}
      </div>
    </div>
  );
}

export default AboutUs;