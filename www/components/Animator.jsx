import React, { useEffect, useRef } from "react"

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
    <>
      <div className='react-world'>
        <div ref={refElement} {...other} />
      </div>
    </>
  )
}
