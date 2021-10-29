import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import buildings from "../charts/building.js"
import theme from "../theme"

import Animator from "./Animator.jsx"

let vis
const setVis = (v) => { vis = v }

export default function Buildings( props )  {

  const count = 150
  const height = 1600
  const width = 1300
  const amplitude = 50
  const frequency = 0.03

  const multiplierX = 13
  const multiplierY = 300
  const diagonalRate = 4

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
    diagonalRate
  }

  return (
    <Animator
      drawer={buildings}
      setVis={setVis}
      options={options} />
  )
}
