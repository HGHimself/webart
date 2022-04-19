import React, { useState } from 'react'
import { css } from '@emotion/css'

import fourier from '../vectors/fourier.js'
import theme from '../theme'

import Animator from '../components/Animator.jsx'
import FlexRow from '../components/FlexRow.jsx'
import NumberInput from '../components/NumberInput.jsx'
import Title from '../components/Title.jsx'

import entry from '../build/entry.js'

let vis
const setVis = (v) => {
    vis = v
}

export default function Fourier(props) {
    const time = 10
    const step = 0.5
    const length = 5

    const [numbers, setNumbers] = useState([1, 3, 5, 7, 9, 11, 13, 15])
    const [offset, setOffsetState] = useState(0)

    const period = 350

    const options = {
        count: period,
        height: 500,
        width: 1300,
        omega: 2 * Math.PI * (1 / period),
        offset,
        amplitude: 200,
        numbers,
    }

    const setOffsetVis = (v) => {
        vis.setOffset(v)
        vis.update()
    }

    const intervalHandler = () => {
        setOffsetState((currentOffset) => {
            const newOffset = currentOffset + step
            setOffsetVis(newOffset)
            return newOffset
        })
    }

    const inputHandler = (i) => (value) => {
        const n = value < 1 ? 1 : value
        numbers[i] = n
        setNumbers(numbers)
    }

    const numberInputs = numbers.map((n, i) => (
        <div key={i}>
            <NumberInput
                label={`n_${i}`}
                value={numbers[i]}
                onChange={inputHandler(i)}
            />
        </div>
    ))

    return (
        <>
            <a href="/webart">back</a>
            <Title
                title="FOURIER"
                description="Use a series of circles to draw irregular lines!"
            />
            <FlexRow wrap="wrap" flex="space-between" width="70%">
                {numberInputs}
            </FlexRow>
            <Animator
                drawer={fourier}
                setVis={setVis}
                options={options}
                time={time}
                intervalCallback={intervalHandler}
            />
        </>
    )
}

entry(<Fourier />)
