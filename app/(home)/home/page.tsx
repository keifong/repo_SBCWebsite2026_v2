import { supabase, getImageUrl } from "@/lib/supabase"
export const revalidate = 3600;
import Link from "next/link";

// import "./style_home.css";
import styles from "./home.module.css";

// import Footer from "@/components/footer";
// import NavbarWhite from "@/components/navbarWhite";
import HomeButton from "@/components/homeButton/homeButton";
import Button from "@/components/button/button";
import HomeImg from "@/public/yay.jpg"
import LeadershipBtn from "@/public/home/sermonBtn.png"
import FellowshipsBtn from "@/public/home/fellowshipsBtn.png"
import ChoirBtn from "@/public/home/sermonBtn.png"
import EventsBtn from "@/public/home/aboutUsBtn.png"
import AUBtn from "@/public/home/aboutUsBtn.png"
import PrayerImg from "@/public/prayer.jpg"
import LiftConstructionImg from "@/public/sbc_liftConstruc.jpg"

import brickWall from "@/public/brickWall.png";
// import bl1 from "../../public/home/brickLines1.png";
import bl1 from "@/public/home/brickLines1.png";
import bl2 from "@/public/home/brickLines2.png";
import bl3 from "@/public/home/brickLines3.png";
import brickLines from "@/public/brickOutlines.png";
import Image from "next/image";

async function Home() {

    const { data } = await supabase.from("home").select("*"); // use the same table/query as /api/home
    const homeImages = data ?? [];

    const liftConstruction = homeImages.find((i) => i.imageName === "liftConstruction")?.image;
    const prayer = homeImages.find((i) => i.imageName === "prayer")?.image;


    return (
        <>
            <div className={styles.div_wrapper_home}>
                {/* Background image */}
                <div className={styles.img_bg}>
                    {/* {yay && ( */}
                        <Image
                            // src={yay}
                            src={HomeImg}
                            alt="Singapore Baptist Church"
                            width={1920}
                            height={1080}
                            sizes="100vw"
                            priority
                        />
                    {/* )} */}
                </div>

                <div className="div_column">
                    <div className={styles.div_home_2nd}>

                        <div className={styles.div_title}>

                            <Image
                                src={brickWall}
                                className={styles.home_bw1}
                                alt=""
                                width={300}
                                height={200}    
                            />

                            <h3 className={styles.h3_welcome}>
                                WELCOME TO
                            </h3>

                            <h1>
                                SINGAPORE
                                <br />
                                BAPTIST CHURCH
                            </h1>

                            <h3 className={styles.h3_cn}>
                                新加坡浸信教会
                            </h3>

                            <Image
                                src={brickWall}
                                className={styles.home_bw2}
                                alt=""
                                width={300}
                                height={200}
                            />

                        </div>

                        {/* Home buttons */}
                        <div className={`div_row ${styles.div_btns_home}`}>

                            <Link
                                href="/leadership"
                                className="link_btn"
                            >
                                <HomeButton
                                    image={LeadershipBtn}
                                    title="Pastoral Leadership"
                                    subText="Learn More"
                                />
                            </Link>

                            <Link
                                href="/fellowshipsAdult"
                                className="link_btn"
                            >
                                <HomeButton
                                    image={FellowshipsBtn}
                                    title="Fellowships"
                                    subText="Learn More"
                                />
                            </Link>

                                <HomeButton
                                    image={ChoirBtn}
                                    title="Choir"
                                    subText="Learn More"
                                />

                            <Link
                                href="/events"
                                className="link_btn"
                            >
                                <HomeButton
                                        image={EventsBtn}
                                        title="Events"
                                        subText="Learn More"
                                    />
                            </Link>

                            <Link
                                href="/aboutUs"
                                className="link_btn"
                            >
                                <HomeButton
                                    image={AUBtn}
                                    title="About Us"
                                    subText="Learn More"
                                />

                            </Link>

                        </div>

                    </div>

                    <div className="greenSeperator" />

                    {/* Service Timing */}
                    <div className={`div_row ${styles.div_mission}`}>
                        <Image
                            src={bl1}
                            className={styles.home_bl1_1}
                            alt=""
                            width={300}
                            height={200}
                        />

                        <Image
                            src={bl2}
                            className={styles.home_bl2}
                            alt=""
                            width={300}
                            height={200}
                        />

                        <Image
                            src={bl3}
                            className={styles.home_bl3}
                            alt=""
                            width={300}
                            height={200}
                        />

                        <div className={styles.div_serviceTiming}>
                            <h1>Join Us in Worship</h1>
                            <h3>Every Sunday</h3>
                            <h3>10.30am - 12pm</h3>
                            <p>Fellowship with us afterwards through Lunch</p>
                            <p className={styles.freep_freel}>Free Parking, Free Lunch</p>
                        </div>
                        
                            <Image
                                src={PrayerImg}
                                className={styles.img_missionImg}
                                alt="Prayer at Singapore Baptist Church"
                                width={1920}
                                height={1080}
                                sizes="100vw"
                            />
                    </div>

                    {/* Contact Us */}
                    <div className={`div_row ${styles.div_mission}`}>
                        <Image
                            src={LiftConstructionImg}
                            className={styles.img_missionImg}
                            alt="Singapore Baptist Church"
                            width={1920}
                            height={1080}
                            sizes="100vw"
                        />

                        <div className={styles.div_cuText}>

                            <Image
                                src={brickLines}
                                className={styles.cuText_bl}
                                alt=""
                                width={300}
                                height={200}
                            />

                            <h2>Contact Us</h2>
                            <h4>1 Cambridge Rd, Singapore 219677</h4>

                            <p>
                                Office Hours:
                                <br />
                                Monday to Fridays: 9.00am - 5.30pm
                                <br />
                                Saturdays: 9.00am to 1.00pm
                            </p>

                            <div className={`div_row ${styles.div_tel}`}>
                                <div className="div_column">
                                    <p className={styles.tel}>Tel: 62993845</p>
                                    <p className={styles.tel}>Fax: 62938946</p>
                                </div>

                                <Link
                                    href="/contactUs"
                                    className="link_btn"
                                >
                                    <Button title="CONTACT US" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </>
    );
}

export default Home;