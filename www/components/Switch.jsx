import React, { useState, useEffect } from "react"
import { css } from "@emotion/css"
import theme from "../theme"

import { darkOrLight } from "../utils/color-tools.js"

import FlexRow from "./FlexRow.jsx"

const defaultType = 'black'

const opacity = 55

const defaultWidth = 23
const defaultHeight = 23

const labelStyle = css`
  width: 34px;
  cursor: pointer;
`;

export default function Switch( props )  {

  const {state, type, onClick, ...other} = props

  const [onOff, flipOnOff] = useState(state)

  // listen for a change in our props to reflect the off/on state
  useEffect(() => {
    flipOnOff(state)
  }, [state])

  const color = theme.colors[type || defaultType]

  const opacityClause = onOff? opacity : 'ff'
  const foreground = onOff? color : theme.colors.white

  const background = `${color}${opacityClause}`

  const buttonStyle = css`
    height: ${other.height || defaultHeight}px;
    width: ${other.width || defaultWidth}px;
    background-color: ${foreground};
    border-radius: 0px;
    border: 1px solid ${color};
    filter: drop-shadow(5px 5px 0px ${background});
    margin-right: 8px;
    cursor: pointer;
  `

  const clickHandler = (e) => {
    const newState = !onOff
    onClick && onClick(e, newState)
    flipOnOff(newState)
  }

  const flag = onOff? <>ON&nbsp;</> : "OFF"

  return (
    <FlexRow align="center">
      <div
        className={buttonStyle}
        onClick={clickHandler}
        {...other} >
      </div>
      <span className={labelStyle} onClick={clickHandler}>{flag}</span>
    </FlexRow>
  )
}
