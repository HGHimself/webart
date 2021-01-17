import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import colorPlot from "../charts/color-plot.js"
import theme from "../theme"

import Animator from "./Animator.jsx"
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

  const [value, setValue] = useState(0)

  const [xAxisValue, setXAxisValue] = useState(0)
  const [yAxisValue, setYAxisValue] = useState(0)
  const [radiusValue, setRadiusValue] = useState(0)

  const options = {
    count,
    height,
    width,
    xAxisValue,
    yAxisValue,
    radiusValue
  }

  const refElement = useRef(null)

  const axis = [
    {
      title: 'X axis',
      state: xAxisValue,
      setState: setXAxisValue,
    },
    {
      title: 'Y axis',
      state: yAxisValue,
      setState: setYAxisValue,
    },
    {
      title: 'Radius',
      state: radiusValue,
      setState: setRadiusValue,
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
        <h6>{title}</h6>
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
    setValue(v)
  }

  const intervalHandler = () => {
    setValue(bumpValue)
  }

  return (
    <>
      <FlexRow>
        {axis.map(makeSwitchHanlder)}
      </FlexRow>
      <input
        style={{width: '400px'}}
        type="range"
        min="0"
        max="10000"
        value={value}
        onChange={setValueHandler} />
      <Animator
        drawer={colorPlot}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={intervalHandler} />
    </>
  )
}
