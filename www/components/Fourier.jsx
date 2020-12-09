import React, { useState, useEffect, useRef } from "react"
import { css } from "@emotion/css"

import fourier from "../charts/fourier.js"
import theme from "../theme"

let vis

export default function Fourier( props )  {
  console.log("Rendering fourier");

  const count = 1000
  const height = 700
  const width = 1300
  const amplitude = 100
  const period = 900

  const time = 10
  const step = 1


  const refElement = useRef(null)

  const [offset, setOffset] = useState(0)

  const setOffsetVis = (v) => {
    vis.setOffset(v)
    vis.update()
  }

  const bumpOffset = (offset) => {
    const off = offset + step
    setOffsetVis(off)
    return off
  }

  useEffect(initVis, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(bumpOffset)
    }, time)

    return () => clearInterval(interval)
  }, [])

  function initVis() {
    const options = {
      count,
      height,
      width,
      period,
      offset,
      amplitude,
    }
    vis = new fourier(refElement.current, options)
  }

  return (
    <>
      <div className='react-world'>
        <div ref={refElement}/>
      </div>
    </>
  );
}
