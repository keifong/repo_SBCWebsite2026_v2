"use client"
import { useEffect, useState } from 'react'
import Footer from '@/components/footer'
import './style_leadership.css'
import '@/app/globals.css'

import christCenter from '@/public/leadershippg/christcenter.png'
import brickWall from '@/public/brickWall.png'
import brickOutline from '@/public/brickOutlines.png'
import NextImage from 'next/image'

function LeadershipNew() {
    // const [selected, setSelected] = useState(0)
    const [selected, setSelected] = useState<string>('')
    const [stewards, setStewards] = useState<any[]>([])

    const [loading, setLoading] = useState(true)
    const [svgLoading, setSvgLoading] = useState(true)

    // fetching data
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('/api/leadership')
            const data = await response.json()
            console.log('data:', data)
            setStewards(data)
            if (data.length > 0) {
                setSelected('Mike Yu')
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        
        }
        fetchData()
    }, [])


    useEffect(() => {
    if (stewards.length === 0) return

        const loadImages = async () => {
            const promises = stewards.map((s) => {
                return new Promise((resolve) => {
                    if (!s.iconImg) return resolve(true)

                    const img = new Image()
                    img.src = s.iconImg
                    img.onload = () => resolve(true)
                    img.onerror = () => resolve(true) // don't block on errors
                })
            })

            await Promise.all(promises)
            setSvgLoading(false)
        }

        loadImages()
    }, [stewards])

    // data structure: id, created_at, name, role, durationServed, description, images[], iconImg

    const pastoral = ['Mike Yu', 'Siow Siew Khim']
    const deacons = ['Ng Geok Kwee', 'David Ng', 'Lee Yoke Sun']
    const council1 = ['Edmund Chiong', 'Chia Khai Meng', 'Goh Ser Chon', 'Seow Swee Chong']
    const council2 = ['Adelyn Yew', 'Ronnie Ng', 'Bao Xi', 'Swee Heng', 'Liu Yang']

    // helper function for wedges
    const getWedgePoints = (index: number, total: number, innerR: number, outerR: number) => {
        const angleStart = total === 1 ? Math.PI / 4 - 0.15 : (index / total) * (Math.PI / 2)
        const angleEnd = total === 1 ? Math.PI / 4 + 0.15 : ((index + 1) / total) * (Math.PI / 2)
        const cx = 100, cy = 0
        return {
            x1: cx - Math.cos(angleStart) * outerR,
            y1: cy + Math.sin(angleStart) * outerR,
            x2: cx - Math.cos(angleEnd) * outerR,
            y2: cy + Math.sin(angleEnd) * outerR,
            x3: cx - Math.cos(angleEnd) * innerR,
            y3: cy + Math.sin(angleEnd) * innerR,
            x4: cx - Math.cos(angleStart) * innerR,
            y4: cy + Math.sin(angleStart) * innerR,
            midAngle: (angleStart + angleEnd) / 2
        }
    }

    const layers = [
        { names: pastoral, innerR: 22, outerR: 35 },
        { names: deacons, innerR: 37, outerR: 50 }, 
        { names: council1, innerR: 52, outerR: 64 }, 
        { names: council2, innerR: 65, outerR: 78 }, 
    ]

    const generateSVG = () => {
        let svgContent = ''
        let defs = ''

        layers.forEach(({ names, innerR, outerR }) => {
            names.forEach((name, index) => {
                const { x1, y1, x2, y2, x3, y3, x4, y4, midAngle } = getWedgePoints(index, names.length, innerR, outerR)
                const midR = (innerR + outerR) / 2
                const imgSize = (outerR - innerR)* 2
                const imgX = 100 - Math.cos(midAngle) * midR - imgSize / 2
                const imgY = Math.sin(midAngle) * midR - imgSize / 2
                const steward = stewards.find(s => s.name === name)
                const isSelected = selected === name
                const path = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`
                const patternId = `pattern-${name.replace(/\s/g, '')}`

                if (steward?.iconImg) {
                    defs += `
                        <pattern id="${patternId}" patternUnits="userSpaceOnUse" 
                            x="${imgX}" y="${imgY}" 
                            width="${imgSize}" height="${imgSize}">
                            <image href="${steward.iconImg}" 
                                x="0" y="0" 
                                width="${imgSize}" height="${imgSize}" 
                                preserveAspectRatio="xMidYMid slice"/>
                        </pattern>
                    `
                }

                svgContent += `
                    <g style="cursor:pointer" data-name="${name}">
                        <path d="${path}" 
                            fill="${steward?.iconImg ? `url(#${patternId})` : '#cccccc'}" 
                            stroke="white" 
                            stroke-width="0.5"
                            opacity="${isSelected ? '0.7' : '1'}"
                        />
                        ${isSelected ? `<path d="${path}" fill="#942636" stroke="white" stroke-width="0.5" opacity="0.4"/>` : ''}
                    </g>
                `
            })
        })

        return `<defs>${defs}</defs>${svgContent}`
    }
    // end of helper function for wedges
    const steward = stewards.find(s => s.name === selected)
    if (loading || svgLoading) {
        return (
            <div className="loading_screen">
                <h2>Loading...</h2>
            </div>
        )
    }
    return (
        <div className='div_wrapper'>
            <h1 id='h1_leadership'>Leadership Stewards</h1>
            <div id='div_SBCLeadership'>
            <NextImage src={christCenter} id='imgCC' alt="Christ Center" />
            {stewards.length > 0 && (
                <svg
                    id='svg_quarterCircle'
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => {
                        const target = (e.target as Element).closest('[data-name]')
                        if (target) setSelected(target.getAttribute('data-name') || '')
                    }}
                    dangerouslySetInnerHTML={{ __html: generateSVG() }}
                />
            )}
            <div className='div_column' id='stewardInfo'>
                {steward && <NextImage src={steward.iconImg.trim()} alt={steward.name} width={500} height={500} />}
            </div>
            </div>

            {/* data structure: id, created_at, name, role, durationServed, description, images[], iconImg */}
            {/* info section */}
            <div id='greenSeperator'></div>
            {/* steward info section */}
            {stewards.length > 0 && selected && (() => {
                const steward = stewards.find(s => s.name === selected)
                if (!steward) return null
                return (
                    <div id="div_stewardInfo_mn">
                        <div className='div_row'>
                            <div className='div_column' id='div_info_mn'>
                                <h2>{steward.name}</h2>
                                <h4>{steward.role}</h4>
                                <p>{steward.durationServed}</p>
                                <p>{steward.description}</p>
                            </div>
                            <div id='div_stewardCarousel'>
                                <NextImage src={steward.images?.[0]} id='img_stewInDes_mn' alt={steward.name} width={300} height={300}/>
                            </div>
                        </div>
                        <NextImage src={brickOutline} id='img_leaderBo1' alt="Leader Board" />
                    </div>
                )
            })()}
        <Footer/>
        </div>
    )
}

export default LeadershipNew