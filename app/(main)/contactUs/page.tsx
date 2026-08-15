"use client";

import styles from "./contactUs.module.css";

import Button from "@/components/button";
import Image from "next/image";
import brickWall from "@/public/brickWall.png";
import { useEffect, useState } from "react";

// ---------------------------------------------
// Types
// ---------------------------------------------

interface ContactPerson {
    title: string;
    name?: string;
    phoneNum?: string;
    officeHrs?: string;
    images: string[];
}

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

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

    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error"
    >("idle");

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

    const ferryDetails = cuData.find(
        (person) => person.title === "FerryDetails"
    );

    // ---------------------------------------------
    // Form handlers
    // ---------------------------------------------

    const handleFormChange =
        (field: keyof ContactFormData) =>
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement
            >
        ) => {
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

                <Image
                    src={brickWall}
                    alt=""
                />
            </div>

            {/* ---------------------------------------------
                Staff contact cards
            --------------------------------------------- */}

            {cuData.length > 1 && (
                <div
                    className={`div_row ${styles.div_personsWrapper}`}
                >
                    {cuData.slice(0, 2).map((person, index) => (
                        <div
                            key={index}
                            className={`div_column ${styles.div_box}`}
                        >
                            <h3 className={styles.h3_title}>
                                {person?.title}
                            </h3>

                            <div
                                className={`div_row ${styles.div_cont}`}
                            >
                                {person?.images?.[0] && (
                                    <Image
                                        className={styles.personImg}
                                        src={person.images[0]}
                                        alt={
                                            person?.name ??
                                            person?.title ??
                                            "Contact photo"
                                        }
                                        width={200}
                                        height={200}
                                    />
                                )}

                                <div
                                    className={`div_column ${styles.div_deet}`}
                                >
                                    <h2>{person?.name}</h2>

                                    <p>
                                        {person?.phoneNum}
                                    </p>

                                    <div
                                        className={`div_row ${styles.div_officeHrs}`}
                                    >
                                        <h3>
                                            Office Hours:
                                        </h3>

                                        <p>
                                            {person?.officeHrs}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div id="greenSeperator" />

            {/* ---------------------------------------------
                Form + Map
            --------------------------------------------- */}

            <div className="div_row">

                <div
                    className={`div_column ${styles.div_form}`}
                >
                    {/* Contact form section */}

                    <div
                        className={`div_column ${styles.div_form_title}`}
                    >
                        <h2 className={styles.h2_reach}>
                            Reach out to us
                        </h2>

                        <p className={styles.p_getBack}>
                            We will get back to you as soon as possible
                        </p>
                    </div>

                    <div
                        className={`div_column ${styles.div_secondaryWrap}`}
                    >
                        <form
                            className={styles.form_contactUs}
                            onSubmit={handleSubmit}
                        >
                            <div
                                className={`div_row ${styles.div_fnamefemail}`}
                            >
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

                            <Button
                                title={
                                    submitting
                                        ? "SENDING..."
                                        : "SEND"
                                }
                            />

                            {submitStatus === "success" && (
                                <p className="form_status form_status_success">
                                    Message sent! We'll get back to you soon.
                                </p>
                            )}

                            {submitStatus === "error" && (
                                <p className="form_status form_status_error">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </form>

                        <Image
                            src={brickWall}
                            className={styles.bw}
                            alt=""
                        />
                    </div>
                </div>

                {/* Map + directions */}

                <div
                    className={`div_column ${styles.maps}`}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.770210408459!2d103.84396887548526!3d1.313330398674216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c23eeb7f3f%3A0xcd2eed47b58f9d5d!2sSingapore%20Baptist%20Church!5e0!3m2!1sen!2ssg!4v1774265692009!5m2!1sen!2ssg"
                        className={styles.iframe_map}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    <div
                        className={`div_row ${styles.directionDeets}`}
                    >
                        <div className="div_column div_mrtBus">
                            <h3>Nearest MRT</h3>
                            <p>NS20 Novena</p>
                            <p>NE7/DT12 Little India</p>
                            <p>NE8 Farrer Park</p>
                        </div>

                        <div className="div_column div_mrtBus">
                            <h3>Nearest Bus</h3>
                            <p>56, 57, 166, 851</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------------------------------------
                Sunday Service Ferry
            --------------------------------------------- */}

            <div
                className={`div_column ${styles.div_directions}`}
            >
                {cuData.length > 1 && (
                    <div
                        className={`div_column ${styles.div_sundayFerry}`}
                    >
                        <div
                            className={`div_row ${styles.ferryTitle}`}
                        >
                            <h2>Sunday Service Ferry</h2>

                            <Button title="SEEK HELP" />
                        </div>

                        <div
                            className={`div_row ${styles.div_drivers}`}
                        >
                            {cuData.slice(2, 5).map(
                                (person, index) => (
                                    <div
                                        key={index}
                                        className={`div_column ${styles.div_ferryDriver}`}
                                    >
                                        <h3>
                                            {person.name}
                                        </h3>

                                        <p>
                                            {person.phoneNum}
                                        </p>

                                        {person.images?.[0] && (
                                            <Image
                                                className={styles.img_sunFerry}
                                                src={person.images[0]}
                                                alt={
                                                    person.name ??
                                                    "Driver photo"
                                                }
                                                width={150}
                                                height={150}
                                            />
                                        )}
                                    </div>
                                )
                            )}
                        </div>

                        <h3 className={styles.pickupDeet}>
                            Pick up details
                        </h3>

                        <p className={styles.ferryDeclaration}>
                            Most of the time, we know who we are picking up.
                            The person will call as well to notify. These are
                            the current pick up locations that we go to. If
                            you have any persons of need that requires this
                            ferry pickup service near our church, please give
                            us a call so we can accomodate
                        </p>

                        {ferryDetails && (
                            <div
                                className={`${styles.div_ferryRow} ${styles.ferryMapInfo}`}
                            >

                                {/* Pek Kio Market */}

                                <div
                                    className={`div_column ${styles.div_ferryPickup}`}
                                >
                                    <h4 className={styles.locTitle}>
                                        Pek Kio Market
                                    </h4>

                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1915408547378!2d103.84901596957802!3d1.3158635999169814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c369a0f687%3A0x5bc4e8430a592629!2s42%20Cambridge%20Rd%2C%20Singapore%20210042!5e0!3m2!1sen!2ssg!4v1775733461009!5m2!1sen!2ssg"
                                        className={styles.iframe_ferryPickup}
                                        allowFullScreen={true}
                                        loading="lazy"
                                    />

                                    <div className="div_row locDeets">
                                        {ferryDetails.images?.[2] && (
                                            <Image
                                                className={styles.img_pickupLocations}
                                                src={
                                                    ferryDetails.images[2]
                                                }
                                                alt="Pek Kio Market pickup point"
                                                width={200}
                                                height={150}
                                            />
                                        )}

                                        <p className={styles.p_locDeets}>
                                            Pick up location is right in front
                                            of Pek Kio Market, beside Blk 42
                                            Cambridge Road, there are seats
                                            in the shade right before where
                                            the church van will turn in.
                                        </p>
                                    </div>
                                </div>

                                {/* Blk 40 Cambridge Rd */}

                                <div
                                    className={`div_column ${styles.div_ferryPickup}`}
                                >
                                    <h4 className={styles.locTitle}>
                                        Blk 40 Cambridge Rd
                                    </h4>

                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.383081709676!2d103.84836955641062!3d1.315863599666535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c319853287%3A0x3be2efa1823e5d47!2s40%20Cambridge%20Rd%2C%20Block%2040%2C%20Singapore%20210040!5e0!3m2!1sen!2ssg!4v1775757972171!5m2!1sen!2ssg"
                                        className={styles.iframe_ferryPickup}
                                        allowFullScreen={true}
                                        loading="lazy"
                                    />

                                    <div className="div_row locDeets">
                                        {ferryDetails.images?.[0] && (
                                            <Image
                                                className={styles.img_pickupLocations}
                                                src={
                                                    ferryDetails.images[0]
                                                }
                                                alt="Blk 40 Cambridge Rd pickup point"
                                                width={200}
                                                height={150}
                                            />
                                        )}

                                        <p className={styles.p_locDeets}>
                                            Pick up location is right at the
                                            entrance of the turn-in to
                                            residential HDB blocks alongside
                                            Cambridge Road, next to Block 40,
                                            in front of the multi-story carpark
                                            37A.
                                        </p>
                                    </div>
                                </div>

                                {/* Farrer Park Exit C */}

                                <div
                                    className={`div_column ${styles.div_ferryPickup}`}
                                >
                                    <h4 className={styles.locTitle}>
                                        Farrer Park Exit C
                                    </h4>

                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1915408547378!2d103.84901596957802!3d1.3158635999169814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c369a0f687%3A0x5bc4e8430a592629!2s42%20Cambridge%20Rd%2C%20Singapore%20210042!5e0!3m2!1sen!2ssg!4v1775733461009!5m2!1sen!2ssg"
                                        className={styles.iframe_ferryPickup}
                                        allowFullScreen={true}
                                        loading="lazy"
                                    />

                                    <div className="div_row locDeets">
                                        {ferryDetails.images?.[1] && (
                                            <Image
                                                className={styles.img_pickupLocations}
                                                src={
                                                    ferryDetails.images[1]
                                                }
                                                alt="Farrer Park Exit C pickup point"
                                                width={200}
                                                height={150}
                                            />
                                        )}

                                        <p className={styles.p_locDeets}>
                                            Pick up location is at Farrer Park
                                            Exit C's pick up point, to the
                                            right of Exit C. Can be seen once
                                            you step out of Exit C. There are
                                            seats at the pick up point.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactUs;