import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import fourier from "../charts/fourier.js"
import theme from "../theme"

import Animator from "./Animator.jsx"

let vis
const setVis = (v) => { vis = v }

export default function Fourier( props )  {

  const time = 10
  const step = 0.5
  const length = 5

  // const numbers = Array.from({ length: length }, (_, i) => i+1)
  //   .map(x => (x * 2) - 1)

  const numbers = [ 1, 3, 1, 7, 9, 11, 13, 15, 17, 19, 21]

  const [offset, setOffsetState] = useState(0)

  const options = {
    count: 1000,
    height: 700,
    width: 1300,
    period: 350,
    offset,
    amplitude: 300,
    numbers,
    length
  }

  const setOffsetVis = (v) => {
    vis.setOffset(v)
    vis.update()
  }

  const intervalHandler = () => {
    setOffsetState((currentOffset) => {
      const newOffset = currentOffset + step
      setOffsetVis(newOffset)
      return newOffset
    })
  }

  return (
    <Animator
      drawer={fourier}
      setVis={setVis}
      options={options}
      time={time}
      intervalCallback={intervalHandler} />
  )
}
