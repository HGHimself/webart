import React, { useEffect, useRef, useState } from 'react'
const axios = require('axios')

import music from '../vectors/music.js'
import { objectMap } from '../utils/data-tools.js'
import theme from '../theme'

import Swatch from '../components/Swatch.jsx'
import FlexRow from '../components/FlexRow.jsx'
import Button from '../components/Button.jsx'
import Switch from '../components/Switch.jsx'
import Link from '../components/Link.jsx'
import NumberInput from '../components/NumberInput.jsx'
import Animator from '../components/Animator.jsx'

import entry from '../build/entry.js'

const url = '/Lofi2v1.m4a'
var dataArray

var context = new (window.AudioContext || window.webkitAudioContext)()
var analyser = context.createAnalyser()
analyser.fftSize = 128 * 2 * 2

var source

let vis = null
const setVis = (v) => {
    vis = v
}

const frameRate = 10

function Music(props) {
    const [song, setSongState] = useState(null)
    const [running, setRunningState] = useState(false)

    const runningRef = useRef()
    runningRef.current = running

    // load the song and set up the web api stuff
    useEffect(() => {
        window
            .fetch(url)
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
            .then((audioBuffer) => {
                source = context.createBufferSource()
                source.connect(analyser)
                source.buffer = audioBuffer
                source.connect(context.destination)
                // source.start()

                var bufferLength = analyser.frequencyBinCount
                dataArray = new Uint8Array(bufferLength)
                vis.setData(dataArray)
                console.log('ready', dataArray)
                // setSongState(audioBuffer)
            })
    }, [])

    const intervalHandler = () => {
        if (runningRef.current) {
            analyser.getByteTimeDomainData(dataArray)
            vis.setData(dataArray)
        }
    }

    const options = {
        data: !dataArray ? [] : dataArray,
        height: 600,
        width: 1300,
    }

    const toggleRunning = () => {
        // need to negate the boolean because it hasnt been flipped yet
        console.log({ running })
        running ? source.stop() : source.start()
        setRunningState(!running)
    }

    return (
        <>
            <a href="/webart">back</a>
            <h1>MUSIC</h1>
            <Switch type={'danger'} state={running} onClick={toggleRunning} />
            <Animator
                drawer={music}
                setVis={setVis}
                options={options}
                intervalCallback={intervalHandler}
                time={frameRate}
            />
        </>
    )
}

entry(<Music />)
