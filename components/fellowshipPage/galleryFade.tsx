"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./galleryFade.module.css";

const FADE_MS = 1000;
const STAY_MS = 5000;

type Orientation = "landscape" | "portrait";
type Item = { src: string; o: Orientation };

// const LAYOUTS: Orientation[][] = [
//   ["landscape", "portrait", "portrait", "landscape"],
//   ["portrait", "landscape", "landscape", "portrait"],
// ];

const LAYOUTS_4: Orientation[][] = [
  ["landscape", "portrait", "portrait", "landscape"],
  ["portrait", "landscape", "landscape", "portrait"],
];

// 3 per row; each batch has 3 landscape and 3 portrait
const LAYOUTS_6: Orientation[][] = [
  ["landscape", "portrait", "landscape", "portrait", "landscape", "portrait"],
  ["portrait", "landscape", "portrait", "landscape", "portrait", "landscape"],
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// load once to read the real dimensions
function measure(src: string): Promise<Item | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () =>
      resolve({ src, o: img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait" });
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// function pickBatch(L: Item[], P: Item[]): Item[] {
//   const layout = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)];
//   const l = shuffle(L);
//   const p = shuffle(P);
//   let li = 0;
//   let pi = 0;
//   // modulo means a small pool repeats instead of breaking
//   return layout.map((o) => (o === "landscape" ? l[li++ % l.length] : p[pi++ % p.length]));
// }

function pickBatch(L: Item[], P: Item[], count: number): Item[] {
  const options = count === 6 ? LAYOUTS_6 : LAYOUTS_4;
  const layout = options[Math.floor(Math.random() * options.length)];
  const l = shuffle(L);
  const p = shuffle(P);
  let li = 0;
  let pi = 0;
  return layout.map((o) => (o === "landscape" ? l[li++ % l.length] : p[pi++ % p.length]));
}

function Tile({ item }: { item: Item }) {
  return (
    <div className={`${styles.tile} ${styles[item.o]}`}>
      <Image src={item.src} alt="" fill sizes="30vw" loading="eager" className={styles.img} />
    </div>
  );
}

export default function GalleryFade({ images }: { images: string[] }) {
  const [pools, setPools] = useState<{ L: Item[]; P: Item[] } | null>(null);
  const [batch, setBatch] = useState<Item[]>([]);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(4); 

  const key = images.join("|"); // stable dependency, even if the array is recreated

  // 1. sort images into landscape / portrait pools
  useEffect(() => {
    let cancelled = false;
    Promise.all(images.map(measure)).then((results) => {
      if (cancelled) return;
      const ok = results.filter(Boolean) as Item[];
      const L = ok.filter((i) => i.o === "landscape");
      const P = ok.filter((i) => i.o === "portrait");
      if (L.length && P.length) setPools({ L, P });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

   useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const update = () => setCount(mq.matches ? 6 : 4);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 2. run the fade cycle
  useEffect(() => {
    if (!pools) return;
    let timer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      setBatch(pickBatch(pools.L, pools.P, count));
      setVisible(true); // fade in
      timer = setTimeout(() => {
        setVisible(false); // fade out
        timer = setTimeout(cycle, FADE_MS); // swap batch once fully faded
      }, FADE_MS + STAY_MS);
    };

    cycle();
    return () => clearTimeout(timer);
  }, [pools, count]);

  if (!batch.length) return null;

  const half = batch.length / 2;

  return (
    <div className={`${styles.gallery} ${visible ? styles.show : ""}`}>
      <div className={styles.row}>
        {batch.slice(0, half).map((item, i) => <Tile key={item.src + i} item={item} />)}
      </div>
      <div className={styles.row}>
        {batch.slice(half).map((item, i) => <Tile key={item.src + i} item={item} />)}
      </div>
    </div>
  );
}