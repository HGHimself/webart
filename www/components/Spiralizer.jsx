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

  const defaultColor = 'white'

  const [color, setColor] = useState(defaultColor)
  const [multiplier, setMultiplier] = useState(30)
  const [running, setRunning] = useState(false)

  const options = {
    count,
    height,
    width,
    multiplier
  }

  const refElement = useRef(null)

  const runningRef = useRef()
  runningRef.current = running
  const toggleRunning = () => setRunning(!running)


  const setMultiplierVis = (v) => {
    vis.setMultiplier(v)
    vis.update()
  }

  const setMultiplierHandler = ({target}) => {
    setMultiplierVis(target.value)
    setMultiplier(+target.value)
  }

  const bumpMultiplier = (multiplier) => {
    if ( !runningRef.current ) return multiplier

    const mul = multiplier + step
    setMultiplierVis(mul)
    return mul
  }

  const intervalHandler = () => {
    setMultiplier(bumpMultiplier)
  }

  const startOrStopButton = running
    ? <Button type='danger' onClick={toggleRunning}>STOP</Button>
    : <Button type='success' onClick={toggleRunning}>START</Button>

  const setColorHandler = (type) => (_e, newState) => {
    const newColor = newState? type : defaultColor

    vis.setColor(theme.colors[newColor])
    vis.update()
    setColor(newColor)
  }

  const makeSwitch = (type, i) => <Switch
    type={type}
    key={i}
    state={type === color}
    onClick={setColorHandler(type)} />

  const types = Object.keys(theme.colors)
    .filter(type => type !== defaultColor)

  return (
    <>
      <FlexRow>
        <input
          type="range"
          min="0"
          max="1000000"
          value={multiplier}
          onChange={setMultiplierHandler} />
        <p>{multiplier}</p>
      </FlexRow>
      <FlexRow>
        {types.map(makeSwitch)}
        {startOrStopButton}
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
