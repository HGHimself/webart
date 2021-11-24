import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import circular from "../charts/circular.js"
import theme from "../theme"
import { gcd } from "../utils/maths-tools.js"
import { copyToClipboard } from "../utils/frontend-tools.js"

import Animator from "./Animator.jsx"
import Button from "./Button.jsx"
import FlexRow from "./FlexRow.jsx"
import Switch from "./Switch.jsx"

let vis = null;
const setVis = (v) => { vis = v }

export default function Circular( props )  {

  const time = 10
  const step = 5
  const limit = 1000
  const defaultColor = 'transparent'
  const sliderMin = 0
  const sliderMax = 1974

  const [color, setColorState] = useState(props.color || defaultColor)
  const [multiplierX, setMultiplierXState] = useState(props.x || 1)
  const [multiplierY, setMultiplierYState] = useState(props.y || 1)
  const [period, setPeriodState] = useState(props.p || 1)
  const [count, setCount] = useState(props.count || 200)

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
  }

  // ref to stick into the timer
  const runningRef = useRef()
  runningRef.current = running
  const toggleRunning = () => setRunningState(!running)

  const bumpOffset = (offset) => {
    const off = (offset + step) % sliderMax
    // const off = (offset + step)
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
    //window.location.search = `x=${multiplierX}&y=${r}`
    setMultiplierYState(r)
    vis.setMultiplierY(r)
  }

  const setMultiplierXHandler = ({target}) => {
    const r = Math.abs(target.value)
    //window.location.search = `x=${r}&y=${multiplierY}`
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

  const shareHandler = () => {
    copyToClipboard(`http://${window.location.host}/Circular?x=${multiplierX}&y=${multiplierY}&p=${period}`)
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

  const makeSwitch = (type, i) => <Switch
    type={type}
    key={i}
    state={theme.colors[type] === color}
    onClick={setColorHandler(type)} />

  const types = Object.keys(theme.colors)
    .filter(type => type !== defaultColor)

  const greatestCommonDivisor = gcd(multiplierY, multiplierX)
  const ratioX = multiplierX / greatestCommonDivisor
  const ratioY = multiplierY / greatestCommonDivisor

  return (
    <>
      {startOrStopButton}
      <Button type='info' onClick={randomizeHandler}>RANDOMIZE</Button>
      <Button type='warning' onClick={shareHandler}>COPY LINK</Button>
      <FlexRow wrap="wrap">
        {types.map(makeSwitch)}
      </FlexRow>
      <FlexRow wrap="wrap" flex="space-between" width="30%">
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
        <h6>Ratio: {ratioX}:{ratioY} - {offset}</h6>
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
