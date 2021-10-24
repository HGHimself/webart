import React, { useEffect, useRef, useState } from "react"
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { css } from "@emotion/css";

export default function Animator( props ) {
  const { drawer, options, setVis, intervalCallback, time, ...other } = props
  console.log('animator');
  const animatorContainer = css`
    height: ${options.height || 1300}px;
  `
  const [vis, setVisState] = useState(null)
  const [width, setWidthState] = useState(null)

  const refElement = useRef(null)

  window.onresize = () => {
    // console.log(window.innerWidth)
    setWidthState(window.innerWidth)
  }

  const initVis = () => {
    const v = new drawer(refElement.current, options)
    setVis(v)
    setVisState(v)
  }

  useEffect(initVis, [])
  useEffect(() => {
    if ( !intervalCallback )  { return }

    const interval = setInterval(intervalCallback, time)
    return () => clearInterval(interval)
  }, [])

  options.rerender = () => {}

  return (
    <div className={animatorContainer}>
      <ParentSize>
        {(parent) => {
          vis && vis.setBounds(parent.width, parent.height)
          return <div ref={refElement} {...other} />
        }}
      </ParentSize>
    </div>
  )
}
