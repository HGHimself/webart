import React from "react"
import { css } from "@emotion/css"
import entry from "../build/entry.js"

function Home(props) {
  return (
    <>
      <p>This site serves as a central location to house the web based projects
        and other resources of mine. Hopefully others may find them interesting or useful.</p>
    </>
  )
}

entry(<Home />)
