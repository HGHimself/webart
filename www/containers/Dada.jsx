import React, { useState, useEffect } from "react"
import { css } from "@emotion/css"
import * as dadaGen from "dada-poem-generator"

import dada from "../vectors/dada.js"

import Animator from "../components/Animator.jsx"
import FlexRow from '../components/FlexRow.jsx'

import entry from "../build/entry.js"

const defaultMessage = `TO MAKE A DADAIST POEM
Take a newspaper.
Take some scissors.
Choose from this paper an article of the length you want to make your poem.
Cut out the article.
Next carefully cut out each of the words that makes up this article and put them all in a bag.
Shake gently.
Next take out each cutting one after the other.
Copy conscientiously in the order in which they left the bag.
The poem will resemble you.
And there you are – an infinitely original author of charming sensibility, even though unappreciated by the vulgar herd.`

let vis = null;
const setVis = (v) => { vis = v }

function Dada(props) {
  const [input, setInput] = useState(defaultMessage)

  const options = {
    data: dadaGen.dada(input),
    height: 600,
    width: 600,
  }

  const handleInput = ({target}) => {
    setInput(target.value)
    updateDada()
  }

  const updateDada = () => {
    vis.setData(dadaGen.dada(input))
  }

  useEffect(updateDada, [])

  return (
    <>
      <h2>Dadaist Poems</h2>
      <p>Express your own irrationality! Enter words into the box on the left; see the output on the right.</p>
      <FlexRow flex="flex">
        <div className={css`width: 30%;`}>
          <textarea  onChange={handleInput} value={input} />
        </div>
        <Animator
          drawer={dada}
          setVis={setVis}
          options={options}
          />
      </FlexRow>
    </>
  )
}

entry(<Dada />)
