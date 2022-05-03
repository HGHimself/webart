import { h } from 'preact'
import { useState } from 'preact/hooks'
import style from './style.css'

import circular from '../../vectors/circular.js'

import Animator from '../../components/Animator'
import Button from '../../components/Button'
import FlexRow from '../../components/FlexRow'
import Title from '../../components/Title'
import NumberInput from '../../components/NumberInput'

let vis = null
const setVis = (v) => {
    vis = v
}

const target = (v) => ({ target: { value: v } })

export default function Cartesian(props) {
    const time = 10
    const limit = 1000

    const [spectrum, setSpectrumState] = useState(props.s || 0)
    const [multiplierX, setMultiplierXState] = useState(props.x || 2)
    const [multiplierY, setMultiplierYState] = useState(props.y || 2)
    const [period, setPeriodState] = useState(props.p || 1)
    const [count, setCount] = useState(props.c || 1000)

    const [offset, setOffsetState] = useState(0)

    const options = {
        count,
        height: 500,
        width: 500,
        offset,
        amplitude: 240,
        frequency: 1 / period,
        multiplierY,
        multiplierX,
        spectrum,
    }

    const intervalHandler = () => {
        if (!runningRef.current) return
        setOffsetState(bumpOffset)
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
    }

    const setPeriodHandler = (value) => {
        const r = Math.abs(value)
        setPeriodState(r)
        vis.setFrequency(1 / r)
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
                        drawer={circular}
                        setVis={setVis}
                        options={options}
                        time={time}
                        intervalCallback={intervalHandler}
                    />
                </FlexRow>
            </div>
            <Title
                title="DESCARTES"
                description="Draw using ratios and simple harmonic motion. Experiment with the values!"
            />
            <a href="/webart">[back]</a>
        </div>
    )
}
