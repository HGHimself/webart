// containers/vector.jsx
import React, { useState, useRef } from "react"
import vector from "../vectors/vector.js"

import Animator from "../components/Animator.jsx"
import Button from "../components/Button.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Switch from "../components/Switch.jsx"
import Title from "../components/Title.jsx"
import NumberInput from "../components/NumberInput.jsx"

import { random } from "../utils/maths-tools.js"

import entry from "../build/entry.js"

let vis = null
const setVector = (v) => { vis = v }

function Vector( props )  {

  const time = 100
  const step = 5
  const limit = 1000
  const defaultColor = 'transparent'
  const sliderMin = 0
  const sliderMax = 1974

  const [color, setColorState] = useState(defaultColor)
  const [spectrum, setSpectrumState] = useState(props.s || 0)
  const [multiplierX, setMultiplierXState] = useState(props.x || 1)
  const [multiplierY, setMultiplierYState] = useState(props.y || 1)
  const [period, setPeriodState] = useState(props.p || 20)
  const [count, setCount] = useState(props.c || 1000)

  const [running, setRunningState] = useState(false)
  const [offset, setOffsetState] = useState(0)

  const options = {
    numbers: [ 1, 13, 5, 60, 40, 40, 5, 13, 17 ],
    count: 6,
    height: 730,
    width: 420,
    amplitude: 380,
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
    const off = (offset + step)
    vis.setOffset(off)
    return off
  }

  const intervalHandler = () => {
    if ( !runningRef.current ) return
    setOffsetState(bumpOffset)
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
      <h1>ART NOUVEAU DOORS</h1>
      <p>Procedurally generated art nouveau doors like you would find in Barcelona.</p>
      <FlexRow align="center">
      {
        // <label>Animate:</label>
        // <Switch type={'warning'} state={running} onClick={toggleRunning} />
        }
        <Button type='info' onClick={randomizeHandler}>RANDOMIZE</Button>
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
        intervalCallback={intervalHandler} />
      <svg>
        <defs>
          <filter id="tint">
            <feColorMatrix values="1.1 0 0 0 0  0 1.1 0 0 0  0 0 0.9 0 0  0 0 0 1 0" />
          </filter>
          <filter id="splotch">
            <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="4" />
            <feColorMatrix values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.9 1.2" result="texture" />
            <feComposite in="SourceGraphic" in2="texture" operator="in" />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
          <filter id="pencil">
            <feTurbulence baseFrequency="0.03" numOctaves="2" type="fractalNoise" />
            <feDisplacementMap scale="1" in="SourceGraphic" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>
    </>
  )
}

entry(<Vector />)
