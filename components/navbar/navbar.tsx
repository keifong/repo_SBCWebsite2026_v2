"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";

function Navbar() {
  const [navOpacity, setNavOpacity] = useState(0);
  const [showFellowship, setShowFellowship] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; 

      // Navbar opacity
      const opacity = Math.min((scrollY / 100) * 0.5, 0.3);
      setNavOpacity(opacity);

      // Always show navbar at the top
      if (scrollY <= 50) {
        setNavVisible(true);
      }
      // Scrolling up
      else if (scrollY < lastScrollY.current) {
        setNavVisible(true);
      }
      // Scrolling down
      else if (scrollY > lastScrollY.current) {
        setNavVisible(false);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.navbar} ${
        navVisible
          ? styles.navbar_visible
          : styles.navbar_hidden
      }`}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${navOpacity})`,
      }}
    >
      <Link href="/home">
        <Image
          src="/churchLogo/sbc_logoBlack.png"
          alt="Singapore Baptist Church"
          width={200}
          height={60}
        />
      </Link>

      <nav
        style={{ display: "flex", gap: "1rem" }}
        className={styles.navbarNav}
      >
        <h4
          onMouseEnter={() => setShowFellowship(true)}
          onMouseLeave={() => setShowFellowship(false)}
        >
          Fellowships

          {showFellowship && (
            <div
              className={styles.div_fellowshipDropdown}
              onMouseEnter={() => setShowFellowship(true)}
              onMouseLeave={() => setShowFellowship(false)}
            >
              <Link
                href="/fellowshipsAdult"
                className={styles.link_btn}
              >
                Adult
              </Link>

              <Link
                href="/fellowshipsYA"
                className={styles.link_btn}
              >
                Young Adult
              </Link>

              <Link
                href="/fellowshipsYouth"
                className={styles.link_btn}
              >
                Youth
              </Link>

              <Link
                href="/fellowshipsKidz"
                className={styles.link_btn}
              >
                Kidz
              </Link>
            </div>
          )}
        </h4>

        <Link href="/events" className={styles.link_btn}>
          Events
        </Link>

        <Link href="/aboutUs" className={styles.link_btn}>
          About Us
        </Link>

        <Link href="/contactUs" className={styles.link_btn}>
          Contact Us
        </Link>

        <Link href="/leadership" className={styles.link_btn}>
          Leadership
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;