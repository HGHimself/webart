import React from "react"

import Swatch from "../components/Swatch.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"
import Switch from "../components/Switch.jsx"

import { objectMap } from "../utils/data-tools.js"
import theme from "../theme"

export default function Aesthetic( props )  {

  const makeSwatch = (name, color) => <Swatch color={color} name={name} />
  const makeButton = (type, i) => (<div key={i} ><Button type={type} /></div>)
  const makeSwitch = (type, i) => <Switch type={type} key={i} />

  const types = Object.keys(theme.colors)

  return (
    <div id="content">
      <h2>Aesthetic</h2>
      <FlexRow>
        {objectMap(colors, makeSwatch)}
      </FlexRow>
      <FlexRow>{types.map(makeButton)}</FlexRow>
      <FlexRow>{types.map(makeSwitch)}</FlexRow>
    </div>
  )
}
