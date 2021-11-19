import React from "react"

import FlexRow from "./FlexRow.jsx"

export default function VerticalList( props ) {
  const { elements } = props

  return (
    <FlexRow wrap="wrap">
      {elements.map((e, i) => (
        <span key={i}>
          {e}
          {i == elements.length - 1 ? '' : <>&nbsp;|&nbsp;</>}
        </span>
      ))}
    </FlexRow>
  )
}
