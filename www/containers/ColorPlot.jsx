import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import colorPlot from "../charts/color-plot.js"
import theme from "../theme"

import Animator from "./Animator.jsx"
import Button from "./Button.jsx"
import Switch from "./Switch.jsx"
import FlexRow from "./FlexRow.jsx"

let vis
const setVis = (v) => { vis = v }

export default function ColorPlot( props )  {

  const count = 1000
  const height = 700
  const width = 1300

  const time = 10
  const step = 10

  const [value, setValueState] = useState(0)

  const [xAxisValue, setXAxisValueState] = useState(0)
  const [yAxisValue, setYAxisValueState] = useState(0)
  const [radiusValue, setRadiusValueState] = useState(0)
  const [running, setRunningState] = useState(false)

  const options = {
    count,
    height,
    width,
    xAxisValue,
    yAxisValue,
    radiusValue
  }

  // ref to stick into the timer
  const runningRef = useRef()
  runningRef.current = running
  const toggleRunning = () => setRunningState(!running)

  const axis = [
    {
      title: 'X axis',
      state: xAxisValue,
      setState: setXAxisValueState,
    },
    {
      title: 'Y axis',
      state: yAxisValue,
      setState: setYAxisValueState,
    },
    {
      title: 'Radius',
      state: radiusValue,
      setState: setRadiusValueState,
    }
  ]

  const makeSwitchHanlder = ({title, state, setState}, i) => {

    const switchHandler = (count) => (_, onOrOff) => {
      const newValue = onOrOff? count : 0
      setState(newValue)
      vis.setValues({xAxisValue, yAxisValue, radiusValue})
    }

    const makeSwitch = (i) => <Switch key={i} onClick={switchHandler(i)} state={state == i} />

    return (
      <div key={i}>
        <h6>{title}: {state}</h6>
        {[0,1,2].map(makeSwitch)}
      </div>
    )
  }

  const bumpValue = (v) => {
    const newValue = v + step
    vis.setValue(newValue)
    return newValue
  }

  const setValueHandler = ({target}) => {
    const v = +target.value
    bumpValue(v)
    setValueState(v)
  }

  const intervalHandler = () => {
    // if timer is not running, don't increase
    if ( !runningRef.current ) return
    setValueState(bumpValue)
  }

  const startOrStopButton = running
    ? <Button type='danger' onClick={toggleRunning}>STOP</Button>
    : <Button type='success' onClick={toggleRunning}>START</Button>

  return (
    <>
      <FlexRow wrap="wrap">
        <FlexRow>
          {axis.map(makeSwitchHanlder)}
        </FlexRow>
        <FlexRow direction="column" >
          {startOrStopButton}
          <input
            style={{width: '200px'}}
            type="range"
            min="0"
            max="10000000"
            value={value}
            onChange={setValueHandler} />
        </FlexRow>
      </FlexRow>
      <Animator
        drawer={colorPlot}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={intervalHandler} />
    </>
  )
}
