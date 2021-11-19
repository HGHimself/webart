import React, { useState } from "react"

import vector from "../charts/vector.js"

import Animator from "../components/Animator.jsx"
import FlexRow from "../components/FlexRow.jsx"


let vis
const setVis = (v) => { vis = v }

export default function Vector( props )  {

  const [offset, setOffsetState] = useState(0)
  const [multiplierX, setMultiplierXState] = useState(1)
  const [multiplierY, setMultiplierYState] = useState(1)

  const options = {
    count: 1000,
    height: 700,
    width: 1300,
    amplitude: 300,
    multiplierX,
    multiplierY,
    length: 5,
    offset,
  }

  const setOffsetVis = (v) => {
    vis.setOffset(v)
    vis.update()
  }

  const setMultiplierYHandler = ({target}) => {
    const r = Math.abs(target.value)
    setMultiplierYState(r)
    vis.setMultiplierY(r)
    setOffsetVis(offset + 1)
  }

  const setMultiplierXHandler = ({target}) => {
    const r = Math.abs(target.value)
    setMultiplierXState(r)
    vis.setMultiplierX(r)
    setOffsetVis(offset+ 1)
  }

  return (
    <>
      <FlexRow align="center">
        <label htmlFor="multiplierX">X:</label>
        <input
          id="multiplierX"
          type="number"
          value={multiplierX}
          onChange={setMultiplierXHandler}  />
      </FlexRow>
      <FlexRow align="center">
        <label htmlFor="multiplierY">Y:</label>
        <input
          id="multiplierY"
          type="number"
          value={multiplierY}
          onChange={setMultiplierYHandler}  />
      </FlexRow>
      <Animator
        drawer={vector}
        setVis={setVis}
        options={options} />
    </>
  )
}
