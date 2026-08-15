"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import styles from "./page.module.css";

function AboutUs() {
    return (
        <div className={styles.page}>
            {/* <Navbar /> */}

            <main>
                <section className={styles.hero}>
                    <h1>About Us</h1>
                    <p>
                        Learn more about Singapore Baptist Church,
                        our history, beliefs, and mission.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Singapore Baptist Church</h2>

                    <p>
                        Welcome to Singapore Baptist Church.
                    </p>

                    <p>
                        We are a church seeking to know Christ, grow together
                        as His people, and share the Gospel with others.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Our Mission</h2>

                    <p>
                        To glorify God by making disciples of Jesus Christ
                        and serving our community.
                    </p>
                </section>
            </main>

        </div>
    );
}

export default AboutUs;