import React, { useEffect, useRef } from "react"

export default function Drawer( props ) {
  const { drawer, options } = props

  const refElement = useRef(null)

  function initVis() {
    vis = new drawer(refElement.current, options)
  }

  useEffect(initVis, [])

  return (
    <>
      <div className='react-world'>
        <div ref={refElement}/>
      </div>
    </>
  )
}
