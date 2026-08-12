"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "./style_navbar.css";
import Image from "next/image";

function Navbar() {
  const [navOpacity, setNavOpacity] = useState(0);
  const [showFellowship, setShowFellowship] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // When scrollY is 0, opacity is 0.
      // When scrollY is 100, opacity increases.
      const opacity = Math.min((scrollY / 100) * 0.5, 0.3);

      setNavOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="divNav"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${navOpacity})`,
      }}
    >
      <Link href="/home">
        <Image
          src="/churchLogo/sbc_logoBlack.png"
          alt="Singapore Baptist Church"
          width={200}
          height={100}
        />
      </Link>

      <nav
        style={{ display: "flex", gap: "1rem" }}
        id="navbar"
      >
        <h4
          onMouseEnter={() => setShowFellowship(true)}
          onMouseLeave={() => setShowFellowship(false)}
        >
          Fellowships

          {showFellowship && (
            <div
              id="div_fellowshipDropdown"
              onMouseEnter={() => setShowFellowship(true)}
              onMouseLeave={() => setShowFellowship(false)}
            >
              <Link href="/fellowshipsAdult" className="link_btn">
                Adult
              </Link>

              <Link href="/fellowshipsYA" className="link_btn">
                Young Adult
              </Link>

              <Link href="/fellowshipsYouth" className="link_btn">
                Youth
              </Link>

              <Link href="/fellowshipsKidz" className="link_btn">
                Kidz
              </Link>
            </div>
          )}
        </h4>

        <Link href="/events" className="link_btn">
          Events
        </Link>

        <Link href="/aboutUs" className="link_btn">
          About Us
        </Link>

        <Link href="/contactUs" className="link_btn">
          Contact Us
        </Link>

        <Link href="/leadership" className="link_btn">
          Leadership
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;