import React, { useState } from "react"
import { css } from "@emotion/css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Aesthetic from "./containers/Aesthetic.jsx"
import Spiral from "./containers/Spiral.jsx"
import Fourier from "./containers/Fourier.jsx"
import ColorPlot from "./containers/ColorPlot.jsx"
import ColorStudy from "./containers/ColorStudy.jsx"
import Circular from "./containers/Circular.jsx"
import Blog from "./containers/Blog.jsx"

import FlexRow from "./components/FlexRow.jsx"
import Button from "./components/Button.jsx"
import VerticalList from "./components/VerticalList.jsx"

import theme from "./theme"



export default function App( props ) {


  const backendUrl = process.env.NODE_ENV === "development"
    ? "http://localhost:3030"
    : "http://www.hgking.net"

  const navs = [
    'Blog',
    'Aesthetic',
    'Spiral',
    'Fourier',
    'ColorPlot',
    'ColorStudy',
    'Circular',
  ]

  const main = css`
    color: ${theme.colors.black};
    margin-left: 48px;
    margin-right: 48px;
  `

  const verticalList = navs.map((nav, i) => <Link key={i} to={`/${nav}`}>{nav}</Link>)

  return (
    <div id="main" className={main}>
      <h6>Hello, World!</h6>
      <p>Digital Arts by HG King - {process.env.NODE_ENV}</p>
      {/*<FlexRow flex='flex-start'>{navs.map(makeNav)}</FlexRow>*/}
      <Router>
        <VerticalList elements={verticalList} />
        <Switch>
          <Route path="/Aesthetic">
            <Aesthetic />
          </Route>
          <Route path="/Spiral">
          <Spiral />
            </Route>
          <Route path="/Fourier">
            <Fourier />
          </Route>
          <Route path="/ColorPlot">
            <ColorPlot />
          </Route>
          <Route path="/ColorStudy">
            <ColorStudy />
          </Route>
          <Route path="/Circular">
            <Circular />
          </Route>
          <Route path="/Blog">
            <Blog backendUrl={backendUrl} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
