import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import shm from "../charts/shm.js"
import theme from "../theme"
import { gcd } from "../utils/maths-tools.js"

import Animator from "./Animator.jsx"
import Button from "./Button.jsx"

let vis
const setVis = (v) => { vis = v }

export default function SimpleHarmonicMotion( props )  {

  const count = 47
  const height = 700
  const width = 1300
  const amplitude = 300
  const frequency = 42
  const limit = 1000

  const time = 40
  const step = 1

  const [offset, setOffsetState] = useState(0)
  const [multiplierX, setMultiplierXState] = useState(props.x || 1)
  const [multiplierY, setMultiplierYState] = useState(props.y || 1)
  const [running, setRunningState] = useState(false)

  const runningRef = useRef()
  runningRef.current = running
  const toggleRunning = () => setRunningState(!running)

  const options = {
    count,
    height,
    width,
    frequency,
    offset,
    amplitude,
    multiplierX,
    multiplierY
  }

  const bumpOffset = (offset) => {
    const off = (offset + step) % 1000
    vis.setOffset(off)
    vis.update()
    return off
  }

  const setMultiplierYHandler = ({target}) => {
    const r = Math.abs(target.value)
    //window.location.search = `x=${multiplierX}&y=${r}`
    setMultiplierYState(r)
    vis.setMultiplierY(r)
    setOffsetState(bumpOffset)
  }

  const setMultiplierXHandler = ({target}) => {
    const r = Math.abs(target.value)
    //window.location.search = `x=${r}&y=${multiplierY}`
    setMultiplierXState(r)
    vis.setMultiplierX(r)
    setOffsetState(bumpOffset)
  }

  const randomizeHandler = ({target}) => {
    const y = Math.round(Math.random() * limit)
    setMultiplierYState(y)
    vis.setMultiplierY(y)

    const x = Math.round(Math.random() * limit)
    setMultiplierXState(x)
    vis.setMultiplierX(x)

    setOffsetState(bumpOffset)
    //window.location.search = `x=${x}&y=${y}`
  }

  const intervalHandler = () => {
    if ( !runningRef.current ) return
    setOffsetState(bumpOffset)
  }

  const startOrStopButton = running
    ? <Button type='danger' onClick={toggleRunning}>STOP</Button>
    : <Button type='success' onClick={toggleRunning}>START</Button>

  const greatestCommonDivisor = gcd(multiplierY, multiplierX)
  const ratioX = multiplierX / greatestCommonDivisor
  const ratioY = multiplierY / greatestCommonDivisor

  return (
    <>
      {startOrStopButton}
      <Button type='info' onClick={randomizeHandler}>RANDOMIZE</Button>
      <input
        type="number"
        value={multiplierY}
        onChange={setMultiplierYHandler}  />
      <input
        type="number"
        value={multiplierX}
        onChange={setMultiplierXHandler}  />
      <div>
        <h6>Ratio: {ratioX}:{ratioY} - {offset}</h6>
      </div>
      <Animator
        drawer={shm}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={intervalHandler}
        />
    </>
  )
}
