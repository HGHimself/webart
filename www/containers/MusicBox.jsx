import React, {useEffect, useState} from "react"
const axios = require('axios')

import music from "../vectors/music.js"
import { objectMap } from "../utils/data-tools.js"
import theme from "../theme"

import Swatch from "../components/Swatch.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"
import Switch from "../components/Switch.jsx"
import Link from "../components/Link.jsx"
import NumberInput from "../components/NumberInput.jsx"
import Animator from "../components/Animator.jsx"


import entry from "../build/entry.js"

const url = "/neo-soul.m4a"
var dataArray

var context = new (window.AudioContext || window.webkitAudioContext)()
var analyser = context.createAnalyser()
analyser.fftSize = 128*2*2

let vis = null;
const setVis = (v) => { vis = v }

function Music( props )  {

  const [song, setSongState] = useState(null)

  useEffect(() => {
    window.fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        setSongState(audioBuffer)
      })
  }, [])

  const options = {
    data: !dataArray ? [] : dataArray,
    height: 600,
    width: 1300,
  }

  const play = () => {
    console.log("playing")
    const source = context.createBufferSource()
    source.connect(analyser)
    source.buffer = song
    source.connect(context.destination)
    source.start()

    var bufferLength = analyser.frequencyBinCount
    dataArray = new Uint8Array(bufferLength)
    console.log(bufferLength);
    window.setInterval(() => {
      analyser.getByteTimeDomainData(dataArray)
      vis.setData(dataArray)
    }, 10)
  }

  return (
    <>
      <h1 className="thick">MUSIC</h1>
      <Button onClick={play} type="danger">PLAY</Button>
      <Animator
        drawer={music}
        setVis={setVis}
        options={options}
        />
    </>
  )
}

entry(<Music />)
