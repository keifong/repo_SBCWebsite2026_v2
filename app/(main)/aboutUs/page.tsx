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
  },
  {
    title: "Growing Fellowship",
    date: "May 2010",
    images: ["/events/jaydon.png", "/events/happy.png"],
    description: "The church continued strengthening fellowship among members through worship, community activities and ministry."
  },
  {
    title: "Expansion of Church Ministries",
    date: "Sep 2012",
    images: ["/events/gifting.png", "/events/robes.jpg"],
    description: "New ministry opportunities developed as the church sought to serve different generations within the congregation."
  },
  {
    title: "Community Outreach",
    date: "Feb 2014",
    images: ["/events/happy.png", "/events/jaydon.png"],
    description: "The church increased its involvement in community outreach and activities that connected members with the wider community."
  },
  {
    title: "New Fellowship Initiatives",
    date: "Jul 2016",
    images: ["/events/robes.jpg", "/events/gifting.png"],
    description: "Additional fellowship initiatives were introduced to encourage stronger relationships and participation among church members."
  },
  {
    title: "Strengthening the Next Generation",
    date: "Nov 2018",
    images: ["/events/jaydon.png", "/events/happy.png"],
    description: "The church placed greater emphasis on encouraging younger members and developing opportunities for the next generation."
  },
  {
    title: "Adapting Through Change",
    date: "Apr 2020",
    images: ["/events/gifting.png", "/events/robes.jpg"],
    description: "The church adapted its activities and methods of gathering during a period of significant change and uncertainty."
  },
  {
    title: "Rebuilding Church Fellowship",
    date: "Oct 2021",
    images: ["/events/happy.png", "/events/jaydon.png"],
    description: "Church fellowship gradually resumed as members began gathering together again and rebuilding community life."
  },
  {
    title: "Renewed Ministry Activities",
    date: "Jun 2023",
    images: ["/events/robes.jpg", "/events/gifting.png"],
    description: "The church renewed its ministry activities and continued serving members through worship, fellowship and outreach."
  },
  {
    title: "Growing Church Community",
    date: "Mar 2025",
    images: ["/events/jaydon.png", "/events/happy.png"],
    description: "The church continued to grow as members participated in worship, fellowship and various ministries."
  },
  {
    title: "Looking Toward the Future",
    date: "Sep 2026",
    images: ["/events/gifting.png", "/events/robes.jpg", "/events/happy.png"],
    description: "Singapore Baptist Church continues looking toward the future while building upon its history, faith and community."
  }
];

// Starting position of the first/latest node
const START_X = 100;
const START_Y = 100;

// Distance the final node should be from the bottom/right edge
const END_OFFSET = 100;

// Minimum distance between any two nodes
const MIN_DIST_FROM_EACH_OTHER = 100;

// Size of each node
const NODE_SIZE = 20;

// preset moves
// const rightMoves = [
//   { x: 200, y: 200 },
//   { x: 300, y: 100 },
//   { x: 300, y: 250 }
// ];

// const leftMoves = [
//   { x: -200, y: 200 },
//   { x: -300, y: 100 },
//   { x: -300, y: 250 }
// ];

const PRESET_MOVES = [
  { x: 200, y: 120 },
  { x: 220, y: 0 },
  { x: 180, y: -120 },
  { x: 150, y: 160 },
  { x: -120, y: 160 },
  { x: -180, y: 80 },
  { x: 150, y: -100 }
];

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

    // Generate every node except the final/oldest node
    for (let i = 1; i < sortedHistoryData.length - 1; i++) {
      const previousNode = positions[i - 1];
      let newPosition;

      // Shuffle the preset movements
      const shuffledMoves = [...PRESET_MOVES].sort(
        () => Math.random() - 0.5
      );

      // Try every preset movement
      for (const move of shuffledMoves) {
        const x = previousNode.x + move.x;
        const y = previousNode.y + move.y;

        // Make sure the node stays inside the container
        const insideContainer =
          x >= START_X &&
          x <= containerSize.width - NODE_SIZE &&
          y >= START_Y;

        if (!insideContainer) continue;

        // Make sure this node is far enough from every existing node
        const farEnoughFromExistingNodes = positions.every(node => {
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

      // Stop if no valid preset position could be found
      if (!newPosition) {
        console.log("Could not find valid preset position for node", i);
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

    // Start the final node below the lowest generated node
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