import React from "react"

import Swatch from "../components/Swatch.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"
import Switch from "../components/Switch.jsx"

import { objectMap } from "../utils/data-tools.js"
import theme from "../theme"

export default function Aesthetic( props )  {

  const makeSwatch = (name, color, i) => <div key={i}><Swatch color={color} name={name} /></div>
  const makeButton = (type, i) => (<div key={i}><Button type={type}>{type}</Button></div>)
  const makeSwitch = (type, i) => <div key={i}><Switch type={type} key={i} /></div>

  const types = Object.keys(theme.colors)

  return (
    <div id="content">
      <h2>Aesthetic</h2>
      <h5>colors</h5>
      <FlexRow>
        {objectMap(theme.colors, makeSwatch)}
      </FlexRow>
      <h5>buttons</h5>
      <FlexRow>{types.map(makeButton)}</FlexRow>
      <h5>switches</h5>
      <FlexRow>{types.map(makeSwitch)}</FlexRow>
    </div>
  )
}
