import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import spiralizer from "../charts/spiralizer.js"

import Animator from "../components/Animator.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"
import Switch from "../components/Switch.jsx"
import theme from "../theme"

let vis = null;
const setVis = (v) => { vis = v }

export default function Spiralizer( props )  {

  const time = 30
  const step = 0.1
  const sliderMin = 0
  const sliderMax = 10000

  const defaultColor = 'transparent'

  const [color, setColorState] = useState(defaultColor)
  const [multiplier, setMultiplierState] = useState(30)
  const [running, setRunningState] = useState(false)

  const options = {
    count: 50,
    height: 700,
    width: 1400,
    multiplier
  }

  // given a new multiplier, update value within vis object and update drawing
  const setMultiplierInVis = (nextMultiplier) => {
    vis.setMultiplier(nextMultiplier)
    vis.update()
  }

  // slider handler, updates the multiplier value here and in vis
  const setMultiplierHandler = ({target}) => {
    const multiplierInput = +target.value
    setMultiplierInVis(multiplierInput)
    setMultiplierState(multiplierInput)
  }

  // ref to stick into the timer
  const runningRef = useRef()
  runningRef.current = running
  const toggleRunning = () => setRunningState(!running)

  const intervalHandler = () => {
    setMultiplierState((currentMultiplier) => {
      // if timer is not running, don't increase
      if ( !runningRef.current ) return currentMultiplier

      const nextMultiplier = currentMultiplier + step
      setMultiplierInVis(nextMultiplier)
      return nextMultiplier
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
      <FlexRow wrap="wrap" flex="space-between" width="50%">
        {startOrStopButton}
        <FlexRow wrap="wrap" flex="space-beetween" align="center" width="70%">
          <label htmlFor="multiplierInput">Multiplier: </label>
          <input
            id="multiplierInput"
            type="range"
            min={sliderMin}
            max={sliderMax}
            value={multiplier}
            onChange={setMultiplierHandler} />
          <p>{multiplier}</p>
        </FlexRow>
      </FlexRow>
      <FlexRow>
        {types.map(makeSwitch)}
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
