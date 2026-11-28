"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";            // NEW
import styles from "./navbar.module.css";
import Image from "next/image";

const DRAWER_W = 130;   // NEW: keep in sync with .drawer width in the CSS
const EDGE = 40;        // NEW: swipe must start this close to the left edge
const BTN = 44;   // button size in px
const PAD = 12;   // gap from the screen edge

function Navbar() {
  const [navOpacity, setNavOpacity] = useState(0);
  const [showFellowship, setShowFellowship] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  // NEW: drawer state
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState<number | null>(null); // live position while dragging
  const [fellowOpen, setFellowOpen] = useState(false);
  const pathname = usePathname();
  const openRef = useRef(false);
  const drag = useRef<{ x: number; y: number; base: number; active: boolean } | null>(null);
  const live = useRef(0);
  openRef.current = open;

  const [side, setSide] = useState<"left" | "right">("left");
  const [dragX, setDragX] = useState<number | null>(null); // button's live left position while dragging
  const sideRef = useRef<"left" | "right">("left");
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnDrag = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(null);
  sideRef.current = side;

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.min((scrollY / 100) * 0.5, 0.3);
      setNavOpacity(opacity);

      if (scrollY <= 50) setNavVisible(true);
      else if (scrollY < lastScrollY.current) setNavVisible(true);
      else if (scrollY > lastScrollY.current) setNavVisible(false);

      lastScrollY.current = scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // NEW: close the drawer when the page changes
  useEffect(() => setOpen(false), [pathname]);
  // fellowship dropdown to fold up
  useEffect(() => {
    if (!open) setFellowOpen(false);
  }, [open]);

  // NEW: lock page scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // NEW: swipe handling (mobile only)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");

    const onStart = (e: TouchEvent) => {
      if (!mq.matches) return;
      if (btnRef.current?.contains(e.target as Node)) return;   // button has its own drag
      const t = e.touches[0];
      const atEdge =
        sideRef.current === "left" ? t.clientX <= EDGE : t.clientX >= window.innerWidth - EDGE;
      if (!openRef.current && atEdge) {
        drag.current = { x: t.clientX, y: t.clientY, base: -DRAWER_W, active: false };
      } else if (openRef.current) {
        drag.current = { x: t.clientX, y: t.clientY, base: 0, active: false };
      }
    };

    const onMove = (e: TouchEvent) => {
      const d = drag.current;
      if (!d) return;
      const t = e.touches[0];
      const dir = sideRef.current === "left" ? 1 : -1;   // flips the swipe direction on the right
      const dx = (t.clientX - d.x) * dir;
      const dy = t.clientY - d.y;

      if (!d.active) {
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) { drag.current = null; return; }
        if (Math.abs(dx) > 8) d.active = true;
        else return;
      }
      live.current = Math.min(0, Math.max(-DRAWER_W, d.base + dx));
      setOffset(live.current);
    };

    const onEnd = () => {
      const d = drag.current;
      drag.current = null;
      if (!d || !d.active) { setOffset(null); return; }
      setOpen(live.current > -DRAWER_W / 2);
      setOffset(null);
    };

    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd);
    document.addEventListener("touchcancel", onEnd);
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  // remember side navbar's side
  useEffect(() => {
    try {
      const saved = localStorage.getItem("navSide");
      if (saved === "left" || saved === "right") setSide(saved);
    } catch {}
  }, []);

  const x = offset ?? (open ? 0 : -DRAWER_W);
  const progress = 1 + x / DRAWER_W; // 0 = closed, 1 = open

  const onBtnDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    btnDrag.current = {
      startX: e.clientX,
      startLeft: e.currentTarget.getBoundingClientRect().left,
      moved: false,
    };
  };

  const onBtnMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = btnDrag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < 6) return;   // small wiggles still count as a tap
    d.moved = true;
    setDragX(Math.min(window.innerWidth - BTN, Math.max(0, d.startLeft + dx)));
  };

  const onBtnUp = () => {
    const d = btnDrag.current;
    btnDrag.current = null;
    if (!d) return;
    if (!d.moved) { setOpen(true); return; }     // it was a tap
    const centre = (dragX ?? d.startLeft) + BTN / 2;
    const next = centre > window.innerWidth / 2 ? "right" : "left";
    setSide(next);
    setDragX(null);
    try { localStorage.setItem("navSide", next); } catch {}
  };

  return (
    <>
      <div
        className={`${styles.navbar} ${navVisible ? styles.navbar_visible : styles.navbar_hidden}`}
        style={{ backgroundColor: `rgba(0, 0, 0, ${navOpacity})` }}
      >
        {/* NEW: hamburger menu, only visible on mobile */}
        <button
          ref={btnRef}
          type="button"
          className={styles.menuBtn}
          aria-label="Open menu"
          aria-expanded={open}
          onPointerDown={onBtnDown}
          onPointerMove={onBtnMove}
          onPointerUp={onBtnUp}
          onPointerCancel={onBtnUp}
          onClick={(e) => { if (e.detail === 0) setOpen(true); }}  /* keyboard Enter/Space only */
          style={{
            left: dragX !== null ? dragX : side === "left" ? PAD : `calc(100% - ${PAD + BTN}px)`,
            transition: dragX !== null ? "none" : "left 0.25s ease",
          }}
        >
          <span /><span /><span />
        </button>

        <Link href="/home" className={styles.link_logo}>
          <Image
            src="/churchLogo/sbc_logoBlack.png"
            alt="Singapore Baptist Church"
            width={200}
            height={60}
            className={styles.img_logo}
            priority
          />
        </Link>

        {/* CHANGED: removed the inline style, display:flex now lives in the CSS */}
        <nav className={styles.navbarNav}>
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
                <Link href="/fellowshipsAdult" className={styles.link_btn}>Adult</Link>
                <Link href="/fellowshipsYA" className={styles.link_btn}>Young Adult</Link>
                <Link href="/fellowshipsYouth" className={styles.link_btn}>Youth</Link>
                <Link href="/fellowshipsKidz" className={styles.link_btn}>Kidz</Link>
              </div>
            )}
          </h4>

          <Link href="/events" className={styles.link_btn}>Events</Link>
          <Link href="/aboutUs" className={styles.link_btn}>About Us</Link>
          <Link href="/contactUs" className={styles.link_btn}>Contact Us</Link>
          <Link href="/leadership" className={styles.link_btn}>Leadership</Link>
        </nav>
      </div>

      {/* NEW: backdrop and drawer, outside the transformed navbar */}
      <div
        className={styles.backdrop}
        style={{
          opacity: progress,
          pointerEvents: progress > 0.01 ? "auto" : "none",
          transition: offset === null ? "opacity 0.25s ease" : "none",
        }}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`${styles.drawer} ${side === "right" ? styles.drawerRight : ""}`}
        aria-hidden={!open}
        style={{
          transform: `translateX(${side === "left" ? x : -x}px)`,
          visibility: x <= -DRAWER_W ? "hidden" : "visible",
          boxShadow:
            x <= -DRAWER_W
              ? "none"
              : side === "left"
              ? "4px 0 16px rgba(0, 0, 0, 0.25)"
              : "-4px 0 16px rgba(0, 0, 0, 0.25)",
          transition:
            offset === null
              ? "transform 0.25s ease, visibility 0.25s, box-shadow 0.25s"
              : "none",
        }}
      >
        <Link href="/home" tabIndex={open ? 0 : -1} className={styles.drawerLogo} aria-label="Home">
          <Image
            src="/churchLogo/sbc_logoBlack.png"
            alt="Singapore Baptist Church"
            width={200}
            height={60}
            className={styles.drawerLogoImg}
          />
        </Link>
        <button
          type="button"
          className={styles.drawerHeading}
          aria-expanded={fellowOpen}
          tabIndex={open ? 0 : -1}
          onClick={() => setFellowOpen((v) => !v)}
        >
          Fellowships
          <span className={`${styles.chevron} ${fellowOpen ? styles.chevronOpen : ""}`}>▾</span>
        </button>

        <div className={`${styles.subWrap} ${fellowOpen ? styles.subWrapOpen : ""}`}>
          <div className={styles.subInner}>
            <Link href="/fellowshipsAdult" tabIndex={open && fellowOpen ? 0 : -1} className={styles.sub}>Adult</Link>
            <Link href="/fellowshipsYA" tabIndex={open && fellowOpen ? 0 : -1} className={styles.sub}>Young Adult</Link>
            <Link href="/fellowshipsYouth" tabIndex={open && fellowOpen ? 0 : -1} className={styles.sub}>Youth</Link>
            <Link href="/fellowshipsKidz" tabIndex={open && fellowOpen ? 0 : -1} className={styles.sub}>Kidz</Link>
          </div>
        </div>

        <Link href="/events" tabIndex={open ? 0 : -1}>Events</Link>
        <Link href="/aboutUs" tabIndex={open ? 0 : -1}>About Us</Link>
        <Link href="/contactUs" tabIndex={open ? 0 : -1}>Contact Us</Link>
        <Link href="/leadership" tabIndex={open ? 0 : -1}>Leadership</Link>
      </aside>
    </>
  );
}

export default Navbar;