"use client"
import './style_contactUs.css'
import '../../app/globals.css'

import Footer from '../../components/footer'
import Button from '../../components/button'
import Image from 'next/image'
import brickWall from '../../public/brickWall.png'
// import brickOutlines from '../../public/brickOutlines.png'
import { useEffect, useState } from 'react'

// ---------------------------------------------
// Types
// ---------------------------------------------
// Shape of a single record coming back from /api/contactUs.
// This covers staff contacts, ferry drivers, and the special
// "FerryDetails" record (pickup point images) all in one shape,
// since they currently all live in the same Supabase table/response.
interface ContactPerson {
    title: string;
    name?: string;
    phoneNum?: string;
    officeHrs?: string;
    images: string[];
}

// Shape of the form fields for the "Reach out to us" section
interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

function ContactUs() {
    // cuData now properly typed instead of any[] -- gives autocomplete
    // and catches typos like person.titel at compile time
    const [cuData, setCuData] = useState<ContactPerson[]>([])

    // Start as true: we ARE loading on mount, since the fetch hasn't
    // resolved yet. Starting this false caused a flash of empty
    // content (no staff cards / no ferry section) before data arrived.
    const [loading, setLoading] = useState(true)

    // ---------------------------------------------
    // Form state
    // ---------------------------------------------
    // Controlled inputs: every field's value lives in this object and
    // is updated via handleFormChange. This lets us read all the values
    // on submit and reset the form after a successful send.
    const [form, setForm] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [submitting, setSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    // ---------------------------------------------
    // Fetch contact/ferry data from our own API route
    // ---------------------------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/contactus')
                if (!response.ok) throw new Error('Failed to fetch contact data')
                const data = await response.json()
                setCuData(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // ---------------------------------------------
    // Derived data
    // ---------------------------------------------
    // NOTE: cuData.slice(0, 2) for staff and slice(2, 5) for drivers
    // assumes the API always returns rows in a fixed order. This is
    // fragile -- if a row is added/removed or the Supabase query has no
    // explicit ORDER BY, these slices can silently point at the wrong
    // records. Worth revisiting later by having /api/contactUs return
    // { staff: [...], drivers: [...], ferryDetails: {...} } instead of
    // one flat array. Left as-is for now since that's a bigger API change.
    const ferryDetails = cuData.find(person => person.title === "FerryDetails")

    // ---------------------------------------------
    // Form handlers
    // ---------------------------------------------
    const handleFormChange = (field: keyof ContactFormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm(prev => ({ ...prev, [field]: e.target.value }))
        }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault() // stop native form submission (page reload)
        setSubmitting(true)
        setSubmitStatus('idle')

        try {
            const res = await fetch('/api/contactus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            if (!res.ok) throw new Error('Failed to send message')

            setSubmitStatus('success')
            // reset fields after a successful send
            setForm({ name: '', email: '', phone: '', message: '' })
        } catch (err) {
            console.error(err)
            setSubmitStatus('error')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="loading_screen">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <div className='div_column' id='cu_wrap'>

            {/* ---------------------------------------------
                Hero / verse section
            --------------------------------------------- */}
            <div id='div_seekFind'>
                <h1>Seek</h1>
                <h3>and you will find</h3>
                <p>Matthew 7.7</p>
                <Image src={brickWall} alt="" />
                {/* <img src={brickOutlines} id='bo'></img> */}
            </div>

            {/* ---------------------------------------------
                Staff contact cards (first 2 records)
            --------------------------------------------- */}
            {cuData.length > 1 && (
                <div className='div_row' id='div_personsWrapper'>
                    {cuData.slice(0, 2).map((person, index) => (
                        <div key={index} className='div_column div_box'>
                            <h3 id='h3_title'>{person?.title}</h3>

                            <div className='div_row' id='div_cont'>
                                {person?.images?.[0] && (
                                    <Image
                                        id='personImg'
                                        src={person.images[0]}
                                        alt={person?.name ?? person?.title ?? 'Contact photo'}
                                        width={200}
                                        height={200}
                                    />
                                )}

                                <div className='div_column div_deet'>
                                    <h2>{person?.name}</h2>
                                    <p>{person?.phoneNum}</p>

                                    <div className='div_row' id='div_officeHrs'>
                                        <h3>Office Hours:</h3>
                                        <p>{person?.officeHrs}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div id='greenSeperator'></div>

            <div className='div_row'>
                <div className='div_column' id='div_form'>

                    {/* ---------------------------------------------
                        Contact form section
                    --------------------------------------------- */}
                    <div className='div_column' id='div_form_title'>
                        <h2 id='h2_reach'>Reach out to us</h2>
                        <p id='p_getBack'>We will get back to you as soon as possible</p>
                    </div>
                    <div className='div_column' id='div_secondaryWrap'>
                        <form id='form_contactUs' onSubmit={handleSubmit}>
                            <div className='div_row' id='div_fnamefemail'>
                                <input
                                    className='form_input'
                                    type='text'
                                    placeholder='Name'
                                    required
                                    value={form.name}
                                    onChange={handleFormChange('name')}
                                />
                                <input
                                    className='form_input'
                                    type='email'
                                    placeholder='Email'
                                    required
                                    value={form.email}
                                    onChange={handleFormChange('email')}
                                />
                            </div>
                            <input
                                className='form_input'
                                type='tel'
                                placeholder='Contact Number'
                                value={form.phone}
                                onChange={handleFormChange('phone')}
                            />
                            <textarea
                                className='form_input'
                                id='form_message'
                                placeholder='Message'
                                required
                                value={form.message}
                                onChange={handleFormChange('message')}
                            ></textarea>

                            {/* Button component presumably renders <button type="submit">
                                If it doesn't set type="submit" internally, add that prop
                                or this button won't trigger handleSubmit */}
                            <Button title={submitting ? 'SENDING...' : 'SEND'} />

                            {submitStatus === 'success' && (
                                <p className='form_status form_status_success'>
                                    Message sent! We'll get back to you soon.
                                </p>
                            )}
                            {submitStatus === 'error' && (
                                <p className='form_status form_status_error'>
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </form>
                        <Image src={brickWall} id='bw' alt="" />
                    </div>
                </div>

                {/* ---------------------------------------------
                    Map + directions
                --------------------------------------------- */}
                <div className='div_column' id='maps'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.770210408459!2d103.84396887548526!3d1.313330398674216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c23eeb7f3f%3A0xcd2eed47b58f9d5d!2sSingapore%20Baptist%20Church!5e0!3m2!1sen!2ssg!4v1774265692009!5m2!1sen!2ssg"
                        id='iframe_map'
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <div className='div_row' id='directionDeets'>
                        <div className='div_column div_mrtBus'>
                            <h3>Nearest MRT</h3>
                            <p>NS20 Novena</p>
                            <p>NE7/DT12 Little India</p>
                            <p>NE8 Farrer Park</p>
                        </div>
                        <div className='div_column div_mrtBus'>
                            <h3>Nearest Bus</h3>
                            <p>56, 57, 166, 851</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------------------------------------
                Sunday Service Ferry section
                Gated on ferryDetails existing (not just cuData.length),
                since that's the specific record every part of this
                block actually depends on. Prevents a crash if the
                "FerryDetails" record is missing/mistyped in Supabase.
            --------------------------------------------- */}
            <div className='div_column' id='div_directions'>
                {cuData.length > 1 && (
                    <div className='div_column' id='div_sundayFerry'>
                        <div className='div_row' id='ferryTitle'>
                            <h2>Sunday Service Ferry</h2>
                            <Button title='SEEK HELP' />
                        </div>

                        <div className='div_row' id='div_drivers'>
                            {cuData.slice(2, 5).map((person, index) => (
                                <div key={index} className='div_column' id='div_ferryDriver'>
                                    <h3>{person.name}</h3>
                                    <p>{person.phoneNum}</p>
                                    {person.images?.[0] && (
                                        <Image
                                            id='img_sunFerry'
                                            src={person.images[0]}
                                            alt={person.name ?? 'Driver photo'}
                                            width={150}
                                            height={150}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <h3 id='pickupDeet'>Pick up details</h3>
                        <p id='ferryDeclaration'>
                            Most of the time, we know who we are picking up. The person will call
                            as well to notify. These are the current pick up locations that we go
                            to. If you have any persons of need that requires this ferry pickup
                            service near our church, please give us a call so we can accomodate
                        </p>

                        {ferryDetails && (
                            <div className='div_ferryRow' id='ferryMapInfo'>
                                <div className='div_column div_ferryPickup'>
                                    {/* pek kio market pickup point, next to Blk 42 Cambridge Rd */}
                                    <h4 className='locTitle'>Pek Kio Market</h4>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1915408547378!2d103.84901596957802!3d1.3158635999169814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c369a0f687%3A0x5bc4e8430a592629!2s42%20Cambridge%20Rd%2C%20Singapore%20210042!5e0!3m2!1sen!2ssg!4v1775733461009!5m2!1sen!2ssg"
                                        className='iframe_ferryPickup'
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                    <div className='div_row locDeets'>
                                        {ferryDetails.images?.[2] && (
                                            <Image
                                                src={ferryDetails.images[2]}
                                                id='img_pickupLocations'
                                                alt="Pek Kio Market pickup point"
                                                width={200}
                                                height={150}
                                            />
                                        )}
                                        <p className='p_locDeets'>
                                            Pick up location is right in front of Pek Kio Market,
                                            beside Blk 42 Cambridge Road, there are seats in the
                                            shade right before where the church van will turn in.
                                        </p>
                                    </div>
                                </div>

                                <div className='div_column div_ferryPickup'>
                                    {/* Blk 40 Cambridge Rd */}
                                    <h4 className='locTitle'>Blk 40 Cambridge Rd</h4>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.383081709676!2d103.84836955641062!3d1.315863599666535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c319853287%3A0x3be2efa1823e5d47!2s40%20Cambridge%20Rd%2C%20Block%2040%2C%20Singapore%20210040!5e0!3m2!1sen!2ssg!4v1775757972171!5m2!1sen!2ssg"
                                        className='iframe_ferryPickup'
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                    <div className='div_row locDeets'>
                                        {ferryDetails.images?.[0] && (
                                            <Image
                                                src={ferryDetails.images[0]}
                                                id='img_pickupLocations'
                                                alt="Blk 40 Cambridge Rd pickup point"
                                                width={200}
                                                height={150}
                                            />
                                        )}
                                        <p className='p_locDeets'>
                                            Pick up location is right at the entrance of the
                                            turn-in to residential HDB blocks alongside Cambridge
                                            Road, next to Block 40, in front of the multi-story
                                            carpark 37A.
                                        </p>
                                    </div>
                                </div>

                                <div className='div_column div_ferryPickup'>
                                    {/* farrer park exit C */}
                                    <h4 className='locTitle'>Farrer Park Exit C</h4>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.1915408547378!2d103.84901596957802!3d1.3158635999169814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19c369a0f687%3A0x5bc4e8430a592629!2s42%20Cambridge%20Rd%2C%20Singapore%20210042!5e0!3m2!1sen!2ssg!4v1775733461009!5m2!1sen!2ssg"
                                        className='iframe_ferryPickup'
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                    <div className='div_row locDeets'>
                                        {ferryDetails.images?.[1] && (
                                            <Image
                                                src={ferryDetails.images[1]}
                                                id='img_pickupLocations'
                                                alt="Farrer Park Exit C pickup point"
                                                width={200}
                                                height={150}
                                            />
                                        )}
                                        <p className='p_locDeets'>
                                            Pick up location is at Farrer park exit C's pick up
                                            point, to the right of exit C. Can be seen once you
                                            step out of exit C. There are seats at the pick up
                                            point.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default ContactUs