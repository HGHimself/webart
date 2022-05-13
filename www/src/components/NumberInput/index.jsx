import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import style from './style.css'

import theme from '../../theme'

import FlexRow from '../FlexRow/index.jsx'

const height = 16
const width = 32

const upArrowPoints = `${width / 2},1 1,${height} ${width - 1},${height}`
const downArrowPoints = `1,0 ${width - 1},0 ${width / 2},${height - 1}`

export default function NumberInput(props) {
    const { onChange, value, label, ...other } = props

    const [v, setValueState] = useState(value)

    useEffect(() => {
        setValueState(value)
    }, [value])

    const handleInput = (e) => {
        setValueState(e.target.value)
        onChange(e.target.value)
    }

    const handleIncrease = () => {
        setValueState(v + 1)
        onChange(v + 1)
    }

    const handleDecrease = () => {
        setValueState(v - 1)
        onChange(v - 1)
    }

    return (
        <FlexRow align="center">
            <label htmlFor={label}>{label}</label>
            <FlexRow direction="column" align="center">
                <svg
                    class="arrow"
                    height={height}
                    width={width}
                    onClick={handleIncrease}
                >
                    <polygon
                        points={upArrowPoints}
                        class={style.arrow}
                        style={{ strokeWidth: 1, }}
                    />
                </svg>
                <input
                    id={label}
                    type="number"
                    value={v}
                    onChange={handleInput}
                />
                <svg
                    class="arrow"
                    height={height}
                    width={width}
                    onClick={handleDecrease}
                >
                    <polygon
                        points={downArrowPoints}
                        class={style.arrow}
                        style={{ strokeWidth: 1, }}
                    />
                </svg>
            </FlexRow>
        </FlexRow>
    )
}
