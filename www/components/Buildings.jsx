import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import wiggler from "../charts/wiggler.js"
import theme from "../theme"

import Animator from "./Animator.jsx"

let vis
const setVis = (v) => { vis = v }

export default function Buildings( props )  {
  const [offset, setOffsetState] = useState(0)
  const [running, setRunningState] = useState(true)

  const count = 40
  const height = 1600
  const width = 1300
  const amplitude = 500
  const frequency =  0.01

  const multiplierX = 13
  const multiplierY = 300
  const diagonalRate = 4

  const time = 30
  const step = 1

  const colors = [
    "#ffffff",
    "#c2331d",
  ]

  const data = [1, 4, 7]

  const options = {
    count,
    height,
    width,
    amplitude,
    frequency,
    colors,
    data,
    multiplierX,
    multiplierY,
    diagonalRate,
    offset
  }

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

  return (
    <Animator
      drawer={wiggler}
      setVis={setVis}
      options={options}
      time={time}
      intervalCallback={intervalHandler} />
  )
}
