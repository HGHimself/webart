import { h } from 'preact'
import { useState } from 'preact/hooks'
import './style.css'
import entry from '../../build/entry.js'
import circular from '../../vectors/circular.js'

import Animator from '../../components/Animator/index.jsx'
import Button from '../../components/Button/index.jsx'
import FlexRow from '../../components/FlexRow/index.jsx'
import Title from '../../components/Title/index.jsx'
import NumberInput from '../../components/NumberInput/index.jsx'

let vis = null
const setVis = (v) => {
    vis = v
}

function Cartesian(props) {
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
        <div className="page">
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
                    />
                </FlexRow>
            </div>
            <Title
                title="DESCARTES"
                description="Draw using ratios and simple harmonic motion. Experiment with the values!"
            />
        </div>
    )
}

entry(<Cartesian />)
