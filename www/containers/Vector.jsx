// containers/vector.jsx
import React from "react"
import vector from "../vectors/vector.js"
import Animator from "../components/Animator.jsx"
import FlexRow from "../components/FlexRow.jsx"

import entry from "../build/entry.js"

let vis
const setVector = (v) => { vis = v }

function Vector( props )  {
  const count = 56

  const lines = Array.from({ length: count }, (_, i) => ({
    numbers: [ 7, 10, 10],
    count: 10,
    height: 200,
    width: 200,
    amplitude: 600,
    omega: 2 * Math.PI * (1 / 80),
    offset: 40,
    // play around with these numbers
    multiplierX: (i + 1) * 7,
    multiplierY: (i + 1) * 22,
  })).map(options => <Animator
    drawer={vector}
    setVis={setVector}
    options={options} />)

  return (
    <FlexRow wrap="wrap">
    {lines}
    </FlexRow>
  )
}

entry(<Vector />)
