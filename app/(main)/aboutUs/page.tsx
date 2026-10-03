"use client";

import styles from "./page.module.css";
import Button from "@/components/button/button";
import HistoryCard from "@/components/aboutUs/historyCard";
import { useRef, useEffect, useState } from "react";

// Temporary history data
const tempHistoryData = [
  {
    title: "Singapore Baptist Church Established",
    date: "June 1937",
    images: ["/events/gifting.png", "/events/happy.png", "/events/jaydon.png"],
    description: "Singapore Baptist Church was established with a small group of believers gathering together in Singapore."
  },
  {
    title: "First Church Building",
    date: "Mar 1948",
    images: ["/events/gifting.png", "/events/robes.jpg"],
    description: "The church moved into its first dedicated place of worship as the congregation continued to grow."
  },
  {
    title: "New Church Building",
    date: "Dec 1965",
    images: ["/events/gifting.png", "/events/happy.png"],
    description: "The church moved into a new building, providing more space for worship, fellowship and ministry."
  },
  {
    title: "Church Community Expanded",
    date: "Aug 1982",
    images: ["/events/jaydon.png", "/events/robes.jpg"],
    description: "The church community continued to grow, with new ministries and fellowship activities becoming part of church life."
  },
  {
    title: "New Generation of Ministry",
    date: "Jan 2004",
    images: ["/events/happy.png", "/events/gifting.png"],
    description: "The church entered a new chapter of ministry, with members continuing to serve and build the church community."
  }
];

// Starting position of the first/latest node
const START_X = 100;
const START_Y = 100;

// Distance the final node should be from the bottom/right edge
const END_OFFSET = 100;

// Rules for generating the winding journey
const MIN_DISTANCE = 100;
const MAX_DISTANCE = 300;

// Minimum distance between any two nodes
const MIN_DIST_FROM_EACH_OTHER = 200;

// Size of each node
const NODE_SIZE = 20;

function AboutUs() {

  // Sort the history from newest → oldest
  // This means the first node is the newest event
  // and the final node is the oldest event
  const sortedHistoryData = [...tempHistoryData].sort((a, b) => {
    return new Date(`${b.date} 1`).getTime() - new Date(`${a.date} 1`).getTime();
  });

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

    // Start with the first/latest node at exactly 100,100
    const positions = [
      {
        x: START_X,
        y: START_Y
      }
    ];

    // Generate every node except the first and final node
    for (let i = 1; i < sortedHistoryData.length - 1; i++) {
      const previousNode = positions[i - 1];
      let newPosition;

      // Try up to 500 random positions
      for (let attempt = 0; attempt < 500; attempt++) {
        // Pick a random direction
        const angle = Math.random() * Math.PI * 2;

        // Pick a random distance between 100px and 200px
        const distance =
          MIN_DISTANCE +
          Math.random() * (MAX_DISTANCE - MIN_DISTANCE);

        const x = previousNode.x + Math.cos(angle) * distance;
        const y = previousNode.y + Math.sin(angle) * distance;

        // Only check the horizontal boundary here.
        // We do NOT check the bottom because the container
        // height has not been calculated yet.
        const insideContainer =
          x >= START_X &&
          x <= containerSize.width - NODE_SIZE / 2 &&
          y >= START_Y;

        if (!insideContainer) continue;

        // Make sure this node is at least 150px away
        // from every node already generated
        const farEnoughFromExistingNodes = positions
        .slice(0, -1)
        .every(node => {
          const dx = x - node.x;
          const dy = y - node.y;
          const distanceFromNode = Math.sqrt(dx * dx + dy * dy);

          return distanceFromNode > MIN_DIST_FROM_EACH_OTHER;
        });

        if (!farEnoughFromExistingNodes) continue;

        // Valid position found
        newPosition = {
          x,
          y
        };

        break;
      }

      // Stop if a valid position could not be found
      if (!newPosition) {
        console.log("Could not find valid position for node", i);
        return;
      }

      positions.push(newPosition);
    }

    // Find the lowest point reached by the generated nodes
    const lowestNodeY = Math.max(
      ...positions.map(position => position.y)
    );

    // ---------------------------------------------------------
    // Generate the final/oldest node
    // ---------------------------------------------------------

    // Start the final node 150px below the lowest node
    let finalY = lowestNodeY + MIN_DIST_FROM_EACH_OTHER;

    // Final node is always 100px from the right side
    const finalX = containerSize.width - END_OFFSET;

    // Make sure the final node is far enough from every node
    for (let attempt = 0; attempt < 500; attempt++) {
      const farEnoughFromExistingNodes = positions.every(node => {
        const dx = finalX - node.x;
        const dy = finalY - node.y;
        const distanceFromNode = Math.sqrt(dx * dx + dy * dy);

        return distanceFromNode > MIN_DIST_FROM_EACH_OTHER;
      });

      if (farEnoughFromExistingNodes) break;

      // Move the final node further down if necessary
      finalY += 20;
    }

    // Add the final/oldest node
    positions.push({
      x: finalX,
      y: finalY
    });

    // ---------------------------------------------------------
    // Calculate the actual container height
    // ---------------------------------------------------------

    // Give the final node exactly 100px of space below it
    const newHeight = finalY + END_OFFSET;

    setNodePositions(positions);
    setHistoryHeight(newHeight);
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
            RENDER NODES
            --------------------------------------------------
            Only render them once every history item
            has successfully received a position.
        -------------------------------------------------- */}

        {nodePositions.length === sortedHistoryData.length &&
          sortedHistoryData.map((history, index) => (

            <div
              key={index}
              className={styles.historyNode}
              style={{
                left: `${nodePositions[index].x}px`,
                top: `${nodePositions[index].y}px`
              }}

              // Clicking a node opens its HistoryCard
              onClick={() =>
                setSelectedHistory({
                  history,
                  index
                })
              }
            />

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

            // Position of the clicked node
            x={nodePositions[selectedHistory.index].x}
            y={nodePositions[selectedHistory.index].y}

            // Size of the history container
            containerWidth={containerSize.width}
            containerHeight={historyHeight}

            // Close the card
            onClose={() => setSelectedHistory(null)}
          />

        )}

      </div>

    </div>
  );
}

export default AboutUs;