import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import fourier from "../charts/fourier.js"
import theme from "../theme"

import Animator from "./Animator.jsx"

let vis
const setVis = (v) => { vis = v }

export default function Fourier( props )  {

  const count = 1000
  const height = 700
  const width = 1300
  const amplitude = 300
  const period = 350

  const time = 10
  const step = 0.5

  const length = 100

  const options = {
    count,
    height,
    width,
    period,
    offset,
    amplitude,
    length
  }

  const [offset, setOffsetState] = useState(0)

  const setOffsetVis = (v) => {
    vis.setOffset(v)
    vis.update()
  }

  const bumpOffset = (offset) => {
    const off = offset + step
    setOffsetVis(off)
    return off
  }

  const intervalHandler = () => { setOffsetState(bumpOffset) }

  return (
    <Animator
      drawer={fourier}
      setVis={setVis}
      options={options}
      time={time}
      intervalCallback={intervalHandler} />
  )
}
