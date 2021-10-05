import React, { useEffect, useRef } from "react"
import ParentSize from "@visx/responsive/lib/components/ParentSize";

export default function Animator( props ) {
  const { drawer, options, setVis, intervalCallback, time, ...other } = props

  const refElement = useRef(null)

  const initVis = () => { setVis(new drawer(refElement.current, options)) }

  useEffect(initVis, [])
  useEffect(() => {
    if ( !intervalCallback )  { return }

    const interval = setInterval(intervalCallback, time)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={refElement} {...other} />
  )
}
