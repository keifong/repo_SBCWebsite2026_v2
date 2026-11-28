"use client";

import styles from "./contactUs.module.css";
import Button from "@/components/button/button";
import FerrySection, { type ContactPerson } from "@/components/contactUs/ferrySection";
import Image from "next/image";
import brickWall from "@/public/brickWall.png";
import { useEffect, useState } from "react";
import SectionNav from "@/components/sectionNav/sectionNav";

// ---------------------------------------------
// Types
// ---------------------------------------------

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

// directions data for MRT stations and bus services
const MRT_STATIONS = [
    { codes: ["NS20"], name: "Novena" },
    { codes: ["NE7", "DT12"], name: "Little India" },
    { codes: ["NE8"], name: "Farrer Park" },
];
const BUS_SERVICES = ["56", "57", "166", "851"];
const LINE_COLORS: Record<string, string> = {
    NS: "#D42E12",
    NE: "#9900AA",
    DT: "#005EC4",
};
const lineColor = (code: string) => LINE_COLORS[code.slice(0, 2)] ?? "#942636";


function ContactUs() {
    const [cuData, setCuData] = useState<ContactPerson[]>([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    // ---------------------------------------------
    // Fetch contact/ferry data
    // ---------------------------------------------

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/contactus");

                if (!response.ok) {
                    throw new Error("Failed to fetch contact data");
                }

                const data = await response.json();
                setCuData(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ---------------------------------------------
    // Derived data
    // ---------------------------------------------

    const ferryDetails = cuData.find((person) => person.title === "FerryDetails");
    const sections = [
        ...(cuData.length > 1 ? [{ id: "team", label: "Our Team" }] : []),
        { id: "contact", label: "Contact & Location" },
        ...(cuData.length > 1 ? [{ id: "ferry", label: "Sunday Ferry" }] : []),
    ];
    // ---------------------------------------------
    // Form handlers
    // ---------------------------------------------

    const handleFormChange =
        (field: keyof ContactFormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSubmitting(true);
        setSubmitStatus("idle");

        try {
            const res = await fetch("/api/contactus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error("Failed to send message");
            }

            setSubmitStatus("success");

            setForm({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (err) {
            console.error(err);
            setSubmitStatus("error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="loading_screen">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className={`div_column ${styles.cu_wrap}`}>

            {/* ---------------------------------------------
                Hero / verse section
            --------------------------------------------- */}

            <div className={styles.div_seekFind}>
                <h1>Seek</h1>
                <h3>and you will find</h3>
                <p>Matthew 7.7</p>

                <Image src={brickWall} alt="" />
            </div>

            {/* ---------------------------------------------
                Staff contact cards
            --------------------------------------------- */}

            {cuData.length > 1 && (
                <div id="team" className={styles.div_personsWrapper}>
                    {cuData.slice(0, 2).map((person, index) => (
                        <div key={index} className={styles.div_box}>
                            <h3 className={styles.h3_title}>{person?.title}</h3>

                            <div className={styles.div_cont}>
                                {person?.images?.[0] && (
                                    <Image
                                        className={styles.personImg}
                                        src={person.images[0]}
                                        alt={person?.name ?? person?.title ?? "Contact photo"}
                                        width={200}
                                        height={200}
                                    />
                                )}

                                <div className={styles.div_deet}>
                                    <h2>{person?.name}</h2>

                                    {person?.phoneNum && (
                                        <a href={`tel:${person.phoneNum.replace(/\s/g, "")}`} className={styles.phone}>
                                            {person.phoneNum}
                                        </a>
                                    )}

                                    {person?.officeHrs && (
                                        <div className={styles.div_officeHrs}>
                                            <span className={styles.hrsLabel}>Office Hours</span>
                                            <span className={styles.hrsValue}>{person.officeHrs}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="greenSeperator" />

            {/* ---------------------------------------------
                Form + Map
            --------------------------------------------- */}

            <div id="contact" className={styles.div_formMapWrap}>
                <div className={`div_column ${styles.div_form}`}>

                    {/* Contact form section */}
                    <div className={`div_column ${styles.div_form_title}`}>
                        <h2 className={styles.h2_reach}>Reach out to us</h2>
                        <p className={styles.p_getBack}>We will get back to you as soon as possible</p>
                    </div>

                    <div className={`div_column ${styles.div_secondaryWrap}`}>
                        <form className={styles.form_contactUs} onSubmit={handleSubmit}>
                            <div className={`div_row ${styles.div_fnamefemail}`}>
                                <input
                                    className={styles.form_input}
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={form.name}
                                    onChange={handleFormChange("name")}
                                />

                                <input
                                    className={styles.form_input}
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={form.email}
                                    onChange={handleFormChange("email")}
                                />
                            </div>

                            <input
                                className={styles.form_input}
                                type="tel"
                                placeholder="Contact Number"
                                value={form.phone}
                                onChange={handleFormChange("phone")}
                            />

                            <textarea
                                className={styles.form_input}
                                placeholder="Message"
                                required
                                value={form.message}
                                onChange={handleFormChange("message")}
                            />

                            <Button title={submitting ? "SENDING..." : "SEND"} />

                            {submitStatus === "success" && (
                                <p className="form_status form_status_success">
                                    Message sent! We&apos;ll get back to you soon.
                                </p>
                            )}

                            {submitStatus === "error" && (
                                <p className="form_status form_status_error">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </form>

                        <Image src={brickWall} className={styles.bw} alt="" />
                    </div>
                </div>

                {/* Map + directions */}

                <div className={`div_column ${styles.maps}`}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.770210408459!2d103.84396887548526!3d1.313330398674216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c23eeb7f3f%3A0xcd2eed47b58f9d5d!2sSingapore%20Baptist%20Church!5e0!3m2!1sen!2ssg!4v1774265692009!5m2!1sen!2ssg"
                        className={styles.iframe_map}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    <div className={styles.directionDeets}>
                        <div className={styles.transitCard}>
                            <h3 className={styles.transitTitle}>Nearest MRT</h3>
                            <ul className={styles.transitList}>
                                {MRT_STATIONS.map((station) => (
                                    <li key={station.name} className={styles.transitItem}>
                                        <span className={styles.badges}>
                                            {station.codes.map((code) => (
                                                <span key={code} className={styles.lineBadge} style={{ backgroundColor: lineColor(code) }}>
                                                    {code}
                                                </span>
                                            ))}
                                        </span>
                                        <span>{station.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.transitCard}>
                            <h3 className={styles.transitTitle}>Nearest Bus</h3>
                            <ul className={`${styles.transitList} ${styles.busList}`}>
                                {BUS_SERVICES.map((bus) => (
                                    <li key={bus} className={styles.busBadge}>{bus}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------------------------------------
                Sunday Service Ferry
            --------------------------------------------- */}

            {cuData.length > 1 && (
                <FerrySection id="ferry" drivers={cuData.slice(2, 5)} ferryDetails={ferryDetails} />
            )}

            <SectionNav sections={sections} />
        </div>
    );
}

export default ContactUs;
