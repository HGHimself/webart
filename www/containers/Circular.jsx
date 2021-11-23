import React from "react"
import {
  useLocation
} from "react-router-dom"

import Circular from "../components/Circular.jsx"

export default function CircularContainer(props) {
  const query = new URLSearchParams(useLocation().search)

  return (
    <>
      <h2>Radial Cartesian</h2>
      <p>Draw Squiggles with polar coordinates and simple harmonic motion. Experiment with the values and see what happens.</p>
      <Circular x={query.get("x")} y={query.get("y")} p={query.get("p")} {...props} />
    </>
  )
}
