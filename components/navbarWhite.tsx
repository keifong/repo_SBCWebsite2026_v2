"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./style_navbar.css";

function NavbarWhite() {
    const [navOpacity, setNavOpacity] = useState(0);
    const [showFellowship, setShowFellowship] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // When scrollY is 0, opacity is 0.
            // When scrollY is 100, opacity approaches 0.3.
            const opacity = Math.min((scrollY / 100) * 0.5, 0.3);

            setNavOpacity(opacity);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            id="divNav_white"
            style={{
                backgroundColor: `rgba(0, 0, 0, ${navOpacity})`,
            }}
        >
            <Link href="/home">
                <img
                    src="/churchLogo/sbc_logoWhite.png"
                    alt="Singapore Baptist Church"
                />
            </Link>

            <nav
                style={{
                    display: "flex",
                    gap: "1rem",
                }}
                id="navbar"
            >
                <h4
                    onMouseEnter={() => setShowFellowship(true)}
                    onMouseLeave={() => setShowFellowship(false)}
                >
                    Fellowships

                    {showFellowship && (
                        <div id="div_fellowshipDropdown">
                            <Link
                                href="/fellowshipsAdult"
                                className="link_btn"
                            >
                                Adult
                            </Link>

                            <Link
                                href="/fellowshipsYA"
                                className="link_btn"
                            >
                                Young Adult
                            </Link>

                            <Link
                                href="/fellowshipsYouth"
                                className="link_btn"
                            >
                                Youth
                            </Link>

                            <Link
                                href="/fellowshipsKidz"
                                className="link_btn"
                            >
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

                {/* Temporary */}
                <Link href="/leadership" className="link_btn">
                    Leadership
                </Link>
            </nav>
        </div>
    );
}

export default NavbarWhite;