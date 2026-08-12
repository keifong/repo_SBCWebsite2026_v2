// import { useState } from 'react'
import "./style_aboutUs.css"

function AboutUs() {

    return (
        <div className='div_wrapper' style={{marginTop: "3vw"}}>
            <h1>DOM manipulation portion</h1>
            <form id='form_sectionFiller'>
                <input id='in_sectionTitle' type='text' placeholder='title'/>
                <input id="in_sectionText" type='text' placeholder='text'/>
                <input id='in_imgPath' type='text' placeholder='img path'/>
                <button type='submit'>Submit</button>
            </form>
            <div id='greenSeperator'/>
        </div>
    )
}

export default AboutUs