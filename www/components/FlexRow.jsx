import React from "react"
import { css } from "@emotion/css"

export default function FlexRow( props )  {
  const flexRow = css`
    display: flex;
    justify-content: ${props.flex};
  `

  return (
    <div className={flexRow}>
      {props.children}
    </div>
  )
}
