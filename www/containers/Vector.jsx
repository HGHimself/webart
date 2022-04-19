// containers/vector.jsx
import React, { useState, useRef } from 'react'
import vector from '../vectors/vector.js'
import * as axios from 'axios'
import { copyToClipboard, imgFromSvg } from '../utils/frontend-tools.js'

import Animator from '../components/Animator.jsx'
import Button from '../components/Button.jsx'
import FlexRow from '../components/FlexRow.jsx'
import Switch from '../components/Switch.jsx'
import Title from '../components/Title.jsx'
import NumberInput from '../components/NumberInput.jsx'

import { random } from '../utils/maths-tools.js'

import entry from '../build/entry.js'

const s = new XMLSerializer()
const GIF = require('../utils/gif.js')
const gif = new GIF({
    workers: 7,
    quality: 1,
    background: '#fff',
})

gif.on('finished', function (blob) {
    window.open(URL.createObjectURL(blob))
})

let vis = null
const setVector = (v) => {
    vis = v
}

function Vector(props) {
    const time = 1000
    const step = 5
    const limit = 1000
    const defaultColor = 'transparent'
    const sliderMin = 0
    const sliderMax = 1974

    const [color, setColorState] = useState(defaultColor)
    const [spectrum, setSpectrumState] = useState(props.s || 1)
    const [multiplierX, setMultiplierXState] = useState(props.x || 5)
    const [multiplierY, setMultiplierYState] = useState(props.y || 16)
    const [period, setPeriodState] = useState(props.p || 20)
    const [count, setCount] = useState(props.c || 1000)

    const [running, setRunningState] = useState(false)
    const [offset, setOffsetState] = useState(0)

    const offsetRef = useRef()
    offsetRef.current = offset

    const multiplierXRef = useRef()
    multiplierXRef.current = multiplierX

    const multiplierYRef = useRef()
    multiplierYRef.current = multiplierY

    const spectrumRef = useRef()
    spectrumRef.current = spectrum

    const periodRef = useRef()
    periodRef.current = period

    const countRef = useRef()
    countRef.current = count

    const amplitude = 380
    const height = 600
    const width = 360

    const options = {
        numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17],
        count: 6,
        height,
        width,
        amplitudeX: 0.9 * width,
        amplitudeY: 0.9 * height,
        omega: 2 * Math.PI * (1 / period),
        offset: 40,
        spectrum,
        multiplierX,
        multiplierY,
    }

    // ref to stick into the timer
    const runningRef = useRef()
    runningRef.current = running
    const toggleRunning = () => setRunningState(!running)

    const bumpOffset = (offset) => {
        // here we could mod by sliderMax
        const off = offset + step
        vis.setOffset(off)
        return off
    }

    const intervalHandler = () => {
        if (!runningRef.current) return
        saveSvg()
        randomizeHandler()
    }

    const setMultiplierYHandler = (value) => {
        const r = Math.abs(value)
        setMultiplierYState(r)
        vis.setMultiplierY(r)
    }

    const setMultiplierXHandler = (value) => {
        const r = Math.abs(value)
        setMultiplierXState(r)
        vis.setMultiplierX(r)
    }

    const randomizeHandler = (value) => {
        const y = Math.round(Math.random() * limit)
        setMultiplierYState(y)
        vis.setMultiplierY(y)

        const x = Math.round(Math.random() * limit)
        setMultiplierXState(x)
        vis.setMultiplierX(x)

        const spectrum = Math.round(Math.random() * limit)
        vis.setSpectrum(spectrum)
        setSpectrumState(spectrum)

        const period = Math.round(Math.random() * limit)
        setPeriodState(period)
        vis.setFrequency(2 * Math.PI * (1 / period))
    }

    const saveSvg = () => {
        // window.hg = vis.getSvg()
        axios.post(`http://0.0.0.0:3030/svg`, {
            x: multiplierXRef.current,
            y: multiplierYRef.current,
            period: periodRef.current,
            count: countRef.current,
            spectrum: spectrumRef.current,
            svg: s.serializeToString(vis.getSvg().node()),
        })
    }

    const setPeriodHandler = (value) => {
        const r = Math.abs(value)
        setPeriodState(r)
        vis.setFrequency(2 * Math.PI * (1 / r))
    }

    const setCountHandler = (value) => {
        const c = Math.abs(value)
        setCount(c)
        vis.setCount(c)
    }

    const setMultiplierHandler = (value) => {
        const multiplierInput = +value
        vis.setOffset(multiplierInput)
        setOffsetState(multiplierInput)
    }

    const setSpectrumHandler = (value) => {
        const spectrumInput = +value
        vis.setSpectrum(spectrumInput)
        setSpectrumState(spectrumInput)
    }

    return (
        <>
            <a href="/webart">back</a>
            <Title
                title="BARCELONA DOORS"
                description="Procedurally generated art nouveau doors like you would find in Barcelona."
            />
            <FlexRow align="center">
                <label>Animate:</label>
                <Switch
                    type={'warning'}
                    state={running}
                    onClick={toggleRunning}
                />
                <Button type="info" onClick={randomizeHandler}>
                    RANDOMIZE
                </Button>
                <Button type="black" onClick={saveSvg}>
                    SAVE
                </Button>
            </FlexRow>
            <FlexRow wrap="wrap" flex="space-between" width="75%">
                <NumberInput
                    label="X"
                    value={multiplierX}
                    onChange={setMultiplierXHandler}
                />
                <NumberInput
                    label="Y"
                    value={multiplierY}
                    onChange={setMultiplierYHandler}
                />
                <NumberInput
                    label="period"
                    value={period}
                    onChange={setPeriodHandler}
                />
                <NumberInput
                    label="spectrum"
                    value={spectrum}
                    onChange={setSpectrumHandler}
                />
            </FlexRow>
            <br />
            <Animator
                drawer={vector}
                setVis={setVector}
                options={options}
                time={time}
                intervalCallback={intervalHandler}
            />
        </>
    )
}

entry(<Vector />)
