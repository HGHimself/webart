import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import spiralizer from "../charts/spiralizer.js"
import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"
import Switch from "../components/Switch.jsx"
import theme from "../theme"

let vis

export default function Spiralizer( props )  {

  const count = 50
  const height = 700
  const width = 1400

  const time = 10
  const step = 1

  const defaultColor = 'white'

  const refElement = useRef(null)

  const [color, setColor] = useState(defaultColor)
  const [multiplier, setMultiplier] = useState(30)
  const [running, setRunning] = useState(true)

  const runningRef = useRef()
  runningRef.current = running

  const setMultiplierVis = (v) => {
    vis.setMultiplier(v)
    vis.update()
  }

  const bumpMultiplier = (multiplier) => {
    if ( !runningRef.current ) return multiplier

    const mul = multiplier + step
    setMultiplierVis(mul)
    return mul
  }

  useEffect(initVis, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setMultiplier(bumpMultiplier)
    }, time)

    return () => clearInterval(interval)
  }, [])


  const toggleRunning = () => setRunning(!running)

  const startOrStopButton = running
    ? <Button type='danger' onClick={toggleRunning}>STOP</Button>
    : <Button type='success' onClick={toggleRunning}>START</Button>

  function initVis() {
    const options = {
      count,
      height,
      width,
      multiplier
    }
    vis = new spiralizer(refElement.current, options)
  }

  const setMultiplierHandler = ({target}) => {
    setMultiplierVis(target.value)
    setMultiplier(+target.value)
  }

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
      <div className='react-world'>
        <div ref={refElement}/>
      </div>
    </>
  );
}
