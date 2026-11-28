"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./sectionNav.module.css";

export type NavSection = { id: string; label: string };

const OFFSET = 70; // px of space left above a section after jumping (clears the fixed navbar)

function SectionNav({ sections }: { sections: NavSection[] }) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(sections[0]?.id ?? "");
    const wrapRef = useRef<HTMLDivElement>(null);

    const key = sections.map((s) => s.id).join("|"); // stable dependency, even if the array is recreated

    // highlight the section currently being read
    useEffect(() => {
        const ids = key ? key.split("|") : [];
        if (!ids.length) return;

        const update = () => {
            const line = OFFSET + 40;
            let current = ids[0];

            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= line) current = id;
            }

            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            if (atBottom) current = ids[ids.length - 1];

            setActive(current);
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [key]);

    // close on outside click or Escape
    useEffect(() => {
        if (!open) return;

        const onDown = (e: PointerEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const go = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
        setOpen(false);
    };

    if (sections.length < 2) return null;

    return (
        <div ref={wrapRef} className={`${styles.wrap} ${open ? styles.wrapOpen : ""}`}>
            <button
                type="button"
                className={styles.tab}
                aria-expanded={open}
                aria-controls="section-nav-panel"
                onClick={() => setOpen((v) => !v)}
            >
                {open ? "Close" : "Jump to"}
            </button>

            <nav id="section-nav-panel" className={styles.panel} aria-label="Page sections" aria-hidden={!open}>
                <ul className={styles.list}>
                    {sections.map((s) => (
                        <li key={s.id}>
                            <button
                                type="button"
                                className={`${styles.link} ${active === s.id ? styles.linkActive : ""}`}
                                aria-current={active === s.id ? "true" : undefined}
                                tabIndex={open ? 0 : -1}
                                onClick={() => go(s.id)}
                            >
                                {s.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default SectionNav;