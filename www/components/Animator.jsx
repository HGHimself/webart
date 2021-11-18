import React, { useEffect, useRef, useState } from "react"
import { css } from "@emotion/css"

let vis = null

export default function Animator( props ) {
  const { drawer, options, setVis, intervalCallback, time, ...other } = props

  // const [vis, setVisState] = useState(null)
  const [width, setWidth] = useState(options.width || 600)
  const [height, setHeight] = useState(options.height || 600)

  const refElement = useRef(null)

  const initVis = () => {
    const v = new drawer(refElement.current, options)
    setVis(v)
    vis = v
  }

  const updateVisOnResize = () => {
    vis && vis.resize(width, height)
  }

  const handleResizeEvent = () => {
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function() {
        setWidth(window.innerWidth - 96)
        setHeight(window.innerHeight)
      }, 300)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }

  const setupTimer = () => {
    if ( !intervalCallback )  { return }

    const interval = setInterval(intervalCallback, time)
    return () => clearInterval(interval)
  }

  useEffect(initVis, [])
  useEffect(setupTimer, [])
  useEffect(handleResizeEvent, [])
  useEffect(updateVisOnResize, [ width, height ])

  return (
    <div>
      <div ref={refElement} {...other} />
    </div>
  )
}
