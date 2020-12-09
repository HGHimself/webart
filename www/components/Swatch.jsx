import React from "react"
import { css } from "@emotion/css"
import theme from "../theme"

import { darkOrLight } from "../utils/color-tools.js"

export default function Swatch( props )  {

  const { color, name } = props

  const height = props.height ? props.height : 128

  const swatch = css`
    color: ${darkOrLight(color)};
    height: ${height}px;
    width: ${height}px;
    background-color: ${color};
    border: 1px solid ${theme.colors.black};
    padding: 24px;
  `

  return (
    <div className={swatch}>
      <p>{color}</p>
      <p>{name}</p>
    </div>
  )
}
