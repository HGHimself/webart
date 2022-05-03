// containers/vector.jsx
import { h } from 'preact'
import { useState } from 'preact/hooks'
import vector from '../../vectors/vector.js'
import style from './style.css'

import Animator from '../../components/Animator'
import Button from '../../components/Button'
import FlexRow from '../../components/FlexRow'
import Title from '../../components/Title'
import NumberInput from '../../components/NumberInput'


let vis = null
const setVector = (v) => {
    vis = v
}

export default function Vector(props) {
    const time = 1000
    const limit = 1000
    const height = 500
    const width = 500 / 2

    const [spectrum, setSpectrumState] = useState(props.s || 0)
    const [multiplierX, setMultiplierXState] = useState(props.x || 5)
    const [multiplierY, setMultiplierYState] = useState(props.y || 16)
    const [period, setPeriodState] = useState(props.p || 20)
    const [count, setCount] = useState(props.c || 6)

    const options = {
        numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17],
        count,
        height,
        width,
        amplitudeX: 1 * width,
        amplitudeY: 1 * height,
        omega: 2 * Math.PI * (1 / period),
        offset: 40,
        spectrum,
        multiplierX,
        multiplierY,
    }

    const intervalHandler = () => {
        if (!runningRef.current) return
        randomizeHandler()
    }

    const setMultiplierYHandler = (value) => {
        const r = Math.abs(value)
        setMultiplierYState(r)
        vis.setMultiplierY(r)
    }

    const setMultiplierXHandler = (value) => {
        const r = Math.abs(value)
        setMultiplierXState(r)
        vis.setMultiplierX(r)
    }

    const randomizeHandler = (value) => {
        const y = Math.round(Math.random() * limit)
        setMultiplierYState(y)
        vis.setMultiplierY(y)

        const x = Math.round(Math.random() * limit)
        setMultiplierXState(x)
        vis.setMultiplierX(x)

        const spectrum = Math.round(Math.random() * limit)
        vis.setSpectrum(spectrum)
        setSpectrumState(spectrum)

        const period = Math.round(Math.random() * limit)
        setPeriodState(period)
        vis.setFrequency(2 * Math.PI * (1 / period))
    }

    const setPeriodHandler = (value) => {
        const r = Math.abs(value)
        setPeriodState(r)
        vis.setFrequency(2 * Math.PI * (1 / r))
    }

    const setCountHandler = (value) => {
        const c = Math.abs(value)
        setCount(c)
        vis.setCount(c)
    }

    const setSpectrumHandler = (value) => {
        const spectrumInput = +value
        vis.setSpectrum(spectrumInput)
        setSpectrumState(spectrumInput)
    }

    return (
        <div className={style.page}>
            <div className="content">
                <FlexRow flex="space-around">
                    <div className="control-box">
                        <FlexRow direction="column" flex="space-between">
                            <FlexRow direction="column" align="center">
                                <div>-XFREQUENCY-</div>
                                <NumberInput
                                    value={multiplierX}
                                    onChange={setMultiplierXHandler}
                                />
                            </FlexRow>
                            <FlexRow direction="column" align="center">
                                <div>-YFREQUENCY-</div>
                                <NumberInput
                                    value={multiplierY}
                                    onChange={setMultiplierYHandler}
                                />
                            </FlexRow>
                            <FlexRow direction="column" align="center">
                                <div>-PERIOD-</div>
                                <NumberInput
                                    value={period}
                                    onChange={setPeriodHandler}
                                />
                            </FlexRow>
                            <FlexRow direction="column" align="center">
                                <div>-COUNT-</div>
                                <NumberInput
                                    value={count}
                                    onChange={setCountHandler}
                                />
                            </FlexRow>
                            <FlexRow direction="column" align="center">
                                <div>-SPECTRUM-</div>
                                <NumberInput
                                    value={spectrum}
                                    onChange={setSpectrumHandler}
                                />
                            </FlexRow>
                            <FlexRow direction="column" align="center">
                              <Button type="info" onClick={randomizeHandler}>RANDOM</Button>
                            </FlexRow>
                        </FlexRow>
                    </div>
                    <Animator
                        drawer={vector}
                        setVis={setVector}
                        options={options}
                        time={time}
                        intervalCallback={intervalHandler}
                    />
                </FlexRow>
            </div>
            <Title
                title="BARCELONA DOORS"
                description="Procedurally generated art nouveau doors like you would find in Barcelona."
            />
            <a href="/webart">[back]</a>
        </div>
    )
}
