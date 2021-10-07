import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import circular from "../charts/circular.js"
import theme from "../theme"
import { gcd } from "../utils/maths-tools.js"

import Animator from "./Animator.jsx"
import Button from "./Button.jsx"
import FlexRow from "./FlexRow.jsx"

let vis
const setVis = (v) => { vis = v }

export default function Circular( props )  {

  const count = 1000
  const height = 700
  const width = 1300
  const amplitude = 300
  const period = 350

  const time = 10
  const step = 1

  const [offset, setOffsetState] = useState(0)
  const [multiplierX, setMultiplierXState] = useState(1)
  const [multiplierY, setMultiplierYState] = useState(1)
  const [running, setRunningState] = useState(false)

  const options = {
    count,
    height,
    width,
    offset,
    amplitude,
    multiplierY,
    multiplierX
  }

  // ref to stick into the timer
  const runningRef = useRef()
  runningRef.current = running
  const toggleRunning = () => setRunningState(!running)

  const setOffsetVis = (v) => {
    vis.setOffset(v)
    vis.update()
  }

  const bumpOffset = (offset) => {
    const off = offset + step
    setOffsetVis(off)
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
    setRunningState(true)

    const y = Math.round(Math.random() * 1000)
    setMultiplierYState(y)
    vis.setMultiplierY(y)

    const x = Math.round(Math.random() * 1000)
    setMultiplierXState(x)
    vis.setMultiplierX(x)
  }

  const greatestCommonDivisor = gcd(multiplierY, multiplierX)
  const ratioX = multiplierX / greatestCommonDivisor
  const ratioY = multiplierY / greatestCommonDivisor

  return (
    <>
      {startOrStopButton}
      <Button type='info' onClick={randomizeHandler}>RANDOMIZE</Button>
      <br />
      <br />
      <input
        type="number"
        value={multiplierY}
        onChange={setMultiplierYHandler}  />
      <input
        type="number"
        value={multiplierX}
        onChange={setMultiplierXHandler}  />
      <div>
        <h6>Ratio: {ratioX}:{ratioY}</h6>
      </div>
      <Animator
        drawer={circular}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={intervalHandler} />
    </>
  )
}
