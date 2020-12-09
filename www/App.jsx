import React, { useState } from "react"
import { css } from "@emotion/css"

import Aesthetic from "./containers/Aesthetic.jsx"
import Spiral from "./containers/Spiral.jsx"
import Fourier from "./containers/Fourier.jsx"

import FlexRow from "./components/FlexRow.jsx"
import Button from "./components/Button.jsx"

import theme from "./theme"

export default function App( props ) {

  const navs = [
    'Aesthetic',
    'Spiral',
    'Fourier'
  ]

  const [selected, setSelected] = useState(navs[2])

  const main = css`
    color: ${theme.colors.black};
    margin-left: 48px;
    margin-right: 48px;
  `

  const selectHeader = (header) => (e) => setSelected(header)
  const selectedPredicate = (header) => header === selected ? 'black' : 'white'
  const makeNav = (header, i) => (
    <div key={i}>
      <Button
        type={selectedPredicate(header)}
        onClick={selectHeader(header)}>
        {header}
      </Button>
    </div>
  )

  return (
    <div id="main" className={main}>
      <h6>Hello, World!</h6>
      <FlexRow flex='flex-start'>{navs.map(makeNav)}</FlexRow>
      {
        selected === 'Aesthetic' ?
          <Aesthetic />
        : selected === 'Spiral' ?
          <Spiral />
        : selected === 'Fourier' ?
          <Fourier />
        : <h1>None</h1>
      }
    </div>
  )
}
