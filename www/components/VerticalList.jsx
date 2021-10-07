import React from "react"

export default function VerticalList( props ) {
  const { elements } = props

  return (
    <p>
      {elements.map((e, i) => (
        <span key={i}>
          {e}
          {i == elements.length - 1 ? '' : <>&nbsp;|&nbsp;</>}
        </span>
      ))}
    </p>
  )
}
