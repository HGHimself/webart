// containers/vector.jsx
import React, { useState, useRef } from "react"
import escher from "../vectors/escher.js"

import Animator from "../components/Animator.jsx"
import Title from "../components/Title.jsx"

import entry from "../build/entry.js"

let vis = null
const setVector = (v) => { vis = v }

function Escher( props )  {

  const options = {
    height: 600,
    width: 1500,
    count: 5
  }

  return (
    <>
      <a href="/webart">back</a>
      <Title
        title="ESCHER"
        description=""
        />
      <Animator
        drawer={escher}
        setVis={setVector}
        options={options} />
    </>
  )
}

entry(<Escher />)
