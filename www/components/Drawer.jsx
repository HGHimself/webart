import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import circles from "../charts/circles.js"
import theme from "../theme"

import Animator from "./Animator.jsx"

let vis;
const setVis = (v) => { vis = v }

export default function Drawer( props )  {
  const maxCircles = 100

  const height = 700
  const width = 1300
  const step = 1

  const [data, setData] = useState([])
  const [timer, setTimer] = useState(10)

  const options = {
    height,
    width,
    data
  }

  const mouseMoveHandler = (e) => {
    const x = e.clientX
    const y = e.clientY

    const newData = data.slice(-maxCircles)
    newData.push([x, y, timer])

    setData(newData)
  }

  const bumpTimer = (t) => {
    const newTime = t + step
    const newData = data.filter(d => (newTime - d[2]) < 100)

    vis.setTimer(newTime, newData)
    setTimer(newTime)
    return newTime
  }

  const intervalHandler = () => {
    // this is our method from the hook
    setTimer(bumpTimer)
  }

  return (
    <Animator
      drawer={circles}
      setVis={setVis}
      options={options}
      time={100}
      intervalCallback={intervalHandler}
      onMouseMove={mouseMoveHandler} />
  )
}
