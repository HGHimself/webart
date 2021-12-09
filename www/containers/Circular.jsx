import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import circular from "../vectors/circular.js"
import theme from "../theme"
import { gcd } from "../utils/maths-tools.js"
import { copyToClipboard } from "../utils/frontend-tools.js"

import Animator from "../components/Animator.jsx"
import Button from "../components/Button.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Switch from "../components/Switch.jsx"

import entry from "../build/entry.js"

let vis = null;
const setVis = (v) => { vis = v }

/*
origin + (amplitude * f(time * (frequency * (2 * 3.14))))
(600/2) + (300 * sin(t * (283/53) * 2pi)))
(600/2) + (300 * cos(t * (274/53) * 2pi)))

(600/2) + (300 * sin(t * (1/1) * 2pi)))
*/

const target = (v) => ({target: {value: v}})

function Circular( props )  {

  const time = 10
  const step = 5
  const limit = 1000
  const defaultColor = 'transparent'
  const sliderMin = 0
  const sliderMax = 1974

  const [color, setColorState] = useState(defaultColor)
  const [spectrum, setSpectrumState] = useState(props.s || 1)
  const [multiplierX, setMultiplierXState] = useState(props.x || 1)
  const [multiplierY, setMultiplierYState] = useState(props.y || 1)
  const [period, setPeriodState] = useState(props.p || 1)
  const [count, setCount] = useState(props.c || 1000)

  const [running, setRunningState] = useState(false)
  const [offset, setOffsetState] = useState(0)

  const options = {
    count,
    height: 600,
    width: 1300,
    offset,
    amplitude: 300,
    frequency: 1 / period,
    multiplierY,
    multiplierX,
    spectrum,
  }

  // ref to stick into the timer
  const runningRef = useRef()
  runningRef.current = running
  const toggleRunning = () => setRunningState(!running)

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

  const startOrStopButton = running
    ? <Button type='danger' onClick={toggleRunning}>STOP</Button>
    : <Button type='success' onClick={toggleRunning}>START</Button>

  const setMultiplierYHandler = ({target}) => {
    const r = Math.abs(target.value)
    setMultiplierYState(r)
    vis.setMultiplierY(r)
  }

  const setMultiplierXHandler = ({target}) => {
    const r = Math.abs(target.value)
    setMultiplierXState(r)
    vis.setMultiplierX(r)
  }

  const randomizeHandler = ({target}) => {
    const y = Math.round(Math.random() * limit)
    setMultiplierYState(y)
    vis.setMultiplierY(y)

    const x = Math.round(Math.random() * limit)
    setMultiplierXState(x)
    vis.setMultiplierX(x)
  }

  const setColorHandler = (type) => (_e, newState) => {
    const newColor = newState ? theme.colors[type] : defaultColor
    vis.setColor(newColor)
    setColorState(newColor)
  }

  const setPeriodHandler = ({target}) => {
    const r = Math.abs(target.value)
    setPeriodState(r)
    vis.setFrequency(1 / r)
  }

  const setCountHandler = ({target}) => {
    const c = Math.abs(target.value)
    setCount(c)
    vis.setCount(c)
  }

  const setMultiplierHandler = ({target}) => {
    const multiplierInput = +target.value
    vis.setOffset(multiplierInput)
    setOffsetState(multiplierInput)
  }

  const setSpectrumHandler = ({target}) => {
    const spectrumInput = +target.value
    vis.setSpectrum(spectrumInput)
    setSpectrumState(spectrumInput)
  }

  const greatestCommonDivisor = gcd(multiplierY, multiplierX)
  const ratioX = multiplierX / greatestCommonDivisor
  const ratioY = multiplierY / greatestCommonDivisor

  return (
    <>
      <h2>Radial Cartesian</h2>
      <p>Draw Squiggles with polar coordinates and simple harmonic motion. Experiment with the values and see what happens.</p>
      {startOrStopButton}
      <Button type='info' onClick={randomizeHandler}>RANDOMIZE</Button>
      <FlexRow wrap="wrap" flex="space-between" width="50%">
        <FlexRow align="center">
          <label htmlFor="multiplierX">X:</label>
          <input
            id="multiplierX"
            type="number"
            value={multiplierX}
            onChange={setMultiplierXHandler}  />
        </FlexRow>
        <FlexRow align="center">
          <label htmlFor="multiplierY">Y:</label>
          <input
            id="multiplierY"
            type="number"
            value={multiplierY}
            onChange={setMultiplierYHandler}  />
        </FlexRow>
        <FlexRow align="center">
          <label htmlFor="period">period:</label>
          <input
            id="period"
            type="number"
            value={period}
            onChange={setPeriodHandler}  />
        </FlexRow>
        <FlexRow align="center">
          <label htmlFor="count">count:</label>
          <input
            id="count"
            type="number"
            value={count}
            onChange={setCountHandler}  />
        </FlexRow>
        <FlexRow align="center">
          <label htmlFor="spectrum">spectrum:</label>
          <input
            id="spectrum"
            type="number"
            value={spectrum}
            onChange={setSpectrumHandler}  />
        </FlexRow>
      </FlexRow>
      <FlexRow wrap="wrap" flex="space-beetween" align="center" width="70%">
        <label htmlFor="multiplierInput">Offset: </label>
        <input
          id="multiplierInput"
          type="range"
          min={sliderMin}
          max={sliderMax}
          value={offset}
          onChange={setMultiplierHandler} />
      </FlexRow>
      <div>
        <h6>Ratio: {offset}</h6>
      </div>
      <Animator
        drawer={circular}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={intervalHandler}
        />
    </>
  )
}

entry(<Circular />)
