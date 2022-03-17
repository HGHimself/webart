// containers/vector.jsx
import React, { useState, useEffect } from "react"
import vector from "../vectors/vector.js"
import Animator from "../components/Animator.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"

import { random } from "../utils/maths-tools.js"

import entry from "../build/entry.js"

let vis = []
const setVector = (v) => { vis.push(v) }

function Vector( props )  {
  const [ options, setOptionsState ] = useState([])

  const count = 1

  const doorColors = [
    "#963300",
    "#966F33",
    "#663300"
  ]

  const generateOptions = () => Array.from({ length: count }, (_, i) => ({
    numbers: [ 1, 3, 5, 61, 41, 61, 15, 13, 17 ],
    count: 10,
    height: 730,
    width: 520,
    amplitude: 300,
    omega: 2 * Math.PI * (1 / 177),
    offset: 40,
    spectrum: random(2, 400),
    background: doorColors[i],
    multiplierX: (i + 1) * random(2, 400),
    multiplierY: (i + 1) * random(2, 400),
  }))

  const updateOptions = () => {
    const options = generateOptions()
    setOptionsState(options)
    if ( vis.length ) {
      vis.forEach((v, i) => v.setOptions(options[i]))
    }
  }

  useEffect(updateOptions, [])

  const animatorConstructor = (options, i) => (
    <Animator
    key={i}
    drawer={vector}
    setVis={setVector}
    options={options} />
  )

  const lines = options
    .map(animatorConstructor)

  return (
    <>
      <svg>
        <defs>
          <filter id="tint">
            <feColorMatrix values="1.1 0 0 0 0  0 1.1 0 0 0  0 0 0.9 0 0  0 0 0 1 0" />
          </filter>
          <filter id="splotch">
            <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="4" />
            <feColorMatrix values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.9 1.2" result="texture" />
            <feComposite in="SourceGraphic" in2="texture" operator="in" />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
          <filter id="pencil">
            <feTurbulence baseFrequency="0.03" numOctaves="2" type="fractalNoise" />
            <feDisplacementMap scale="1" in="SourceGraphic" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>
      <a href="/webart">back</a>
      <h1>ART NOUVEAU DOORS</h1>
      <p>Procedurally generated art nouveau doors like you would find in Barcelona.</p>
      <Button onClick={updateOptions} type="warning">NEW DOORS</Button>
      <br />
      <br />
      {lines}
    </>
  )
}

entry(<Vector />)
