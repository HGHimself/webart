import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import theme from '../../theme'

import { darkOrLight } from '../../utils/color-tools.js'

import FlexRow from '../FlexRow/index.jsx'

const defaultType = 'black'

const opacity = 55

const defaultWidth = 23
const defaultHeight = 23


export default function Switch(props) {
    const { state, type, onClick, hideLabel, ...other } = props

    const [onOff, flipOnOff] = useState(state)

    // listen for a change in our props to reflect the off/on state
    useEffect(() => {
        flipOnOff(state)
    }, [state])

    const color = theme.colors[type || defaultType]

    const opacityClause = onOff ? opacity : 'ff'
    const foreground = onOff ? color : theme.colors.white

    const background = `${color}${opacityClause}`

    const clickHandler = (e) => {
        const newState = !onOff
        onClick && onClick(e, newState)
        flipOnOff(newState)
    }

    const flag = onOff ? <>ON&nbsp;</> : 'OFF'

    return (
        <FlexRow align="center">
            <div
                onClick={clickHandler}
                {...other}
            ></div>
            {!hideLabel && (
                <span onClick={clickHandler}>
                    {flag}
                </span>
            )}
        </FlexRow>
    )
}
