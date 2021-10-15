import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import spiralizer from "../charts/spiralizer.js"

import Animator from "../components/Animator.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"
import Switch from "../components/Switch.jsx"
import theme from "../theme"

let vis;
const setVis = (v) => { vis = v }

export default function Spiralizer( props )  {

  const count = 50
  const height = 700
  const width = 1400

  const time = 30
  const step = 0.1

  const defaultColor = 'transparent'

  const [color, setColorState] = useState(defaultColor)
  const [multiplier, setMultiplierState] = useState(30)
  const [running, setRunningState] = useState(false)

  const options = {
    count,
    height,
    width,
    multiplier
  }

  // ref to stick into the timer
  const runningRef = useRef()
  runningRef.current = running
  const toggleRunning = () => setRunningState(!running)


  // given a new multiplier, update value within vis object and update drawing
  const setMultiplierInVis = (v) => {
    vis.setMultiplier(v)
    vis.update()
  }

  // slider handler, updates the multiplier value here and in vis
  const setMultiplierHandler = ({target}) => {
    setMultiplierInVis(target.value)
    setMultiplierState(+target.value)
  }

  const intervalHandler = () => {
    setMultiplierState((multiplier) => {
      // if timer is not running, don't increase
      if ( !runningRef.current ) return multiplier

      const mul = multiplier + step
      setMultiplierInVis(mul)
      return mul
    })
  }

  const startOrStopButton = running
    ? <Button type='danger' onClick={toggleRunning}>STOP</Button>
    : <Button type='success' onClick={toggleRunning}>START</Button>

  const setColorHandler = (type) => (_e, newState) => {
    const newColor = newState ? theme.colors[type] : defaultColor
    vis.setColor(newColor)
    vis.update()
    setColorState(newColor)
  }

  const makeSwitch = (type, i) => <Switch
    type={type}
    key={i}
    state={theme.colors[type] === color}
    onClick={setColorHandler(type)} />

  const types = Object.keys(theme.colors)
    .filter(type => type !== defaultColor)

  return (
    <>
      {startOrStopButton}
      <FlexRow>
        {types.map(makeSwitch)}
      </FlexRow>
      <FlexRow>
        <input
          type="range"
          min="0"
          max="1000000"
          value={multiplier}
          onChange={setMultiplierHandler} />
        <p>{multiplier}</p>
      </FlexRow>
      <Animator
        drawer={spiralizer}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={intervalHandler} />
    </>
  );
}
