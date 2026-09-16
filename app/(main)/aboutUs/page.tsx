"use client";

import styles from "./page.module.css";
import Button from "@/components/button/button";
import HistoryCard from "@/components/aboutUs/historyCard";

const tempHistoryData = [
  {
    title: "Singapore Baptist Church Established",
    date: "June 1937",
    images: [
      "/events/gifting.png",
      "/events/happy.png",
      "/events/jaydon.png"
    ],
    description:
      "Singapore Baptist Church was established with..."
  },
  {
    title: "New Church Building",
    date: "Dec 1965",
    images: [
      "/events/gifting.png",
      "/events/robes.jpg"
    ],
    description:
      "The church moved into a new building..."
  }
]

function AboutUs() {
    return (
        <div className={`div_wrapper ${styles.containerAU}`}>
            <div className={`div_column ${styles.headerTxtAU}`}>
              <h1>About us</h1>
              <p>short subtitle about our church</p>
              <div className={`div_row ${styles.searchAU}`}>
                <input placeholder="Type in keywords eg: Retreat, 2004"/>
                <Button title="Search"/>
              </div>
            </div>
            <div className={`div_column ${styles.historyCardsAU}`}>
              {/* insert in historyCard(s) */}
              {/* write logic of appearance based on chronological order (top down, left right) */}
              {tempHistoryData.map((histCard, index)=> (
                <HistoryCard 
                  images={histCard.images}
                  date={histCard.date}
                  title={histCard.title}
                  description={histCard.description}
                />
              ))}
            </div>


        </div>
    );
}

export default AboutUs;