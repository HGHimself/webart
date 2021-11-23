import React from "react"

import Swatch from "../components/Swatch.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"
import Switch from "../components/Switch.jsx"

import { objectMap } from "../utils/data-tools.js"
import theme from "../theme"

export default function Aesthetic( props )  {

  const makeSwatch = (name, color, i) => <div key={i}><Swatch color={color} name={name} /></div>
  const makeButton = (type, i) => (<div key={i}><Button type={type}>{type}</Button></div>)
  const makeSwitch = (type, i) => <div key={i}><Switch type={type} key={i} /></div>

  const types = Object.keys(theme.colors)

  return (
    <div>
    <h2>Aesthetic</h2>
      <h6>Badmon Design System</h6>
      <h5>colors</h5>
      <FlexRow wrap="wrap">
        {objectMap(theme.shades, makeSwatch)}
      </FlexRow>
      <h5>buttons</h5>
      <FlexRow wrap="wrap">{types.map(makeButton)}</FlexRow>
      <h5>switches</h5>
      <FlexRow wrap="wrap">{types.map(makeSwitch)}</FlexRow>
      <h5>codeblock</h5>
      <pre>
        <code>{`
// a quine for your consideration...
input = "console.log('input = ' + String.fromCharCode(34) + input + String.fromCharCode(34) + ';' + String.fromCharCode(10) + input);";
console.log('input = ' + String.fromCharCode(34) + input + String.fromCharCode(34) + ';' + String.fromCharCode(10) + input);
        `}</code>
      </pre>
      <h5>typography</h5>
      <a href="https://indestructibletype.com/Jost" rel="noopener noreferrer" target="_blank">Jost Font↗</a>
      <p>{
        [...Array(256 - 32).keys()].map((c, i) => <span key={i}>
            {String.fromCharCode(c + 32)}
            {i % 32 ? '' : <br />}
        </span>)
      }</p>
      <h1>Super Big Title - h1</h1>
      <h2>Big Title - h2</h2>
      <h3>Section - h3</h3>
      <h4>Subsection - h4</h4>
      <h5>Sendoff: Au Revoir! - h5</h5>
      <h6>Byline - h6</h6>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Aliquam consectetur molestie nulla sit amet cursus. Aenean accumsan vulputate nulla in euismod. Fusce non justo nec ligula venenatis blandit. Aenean eget euismod quam. Curabitur urna sem, varius vel consequat at, interdum a neque. In vitae est quam. Curabitur interdum congue imperdiet. Curabitur faucibus commodo ante sed mollis. Quisque vitae enim ut turpis placerat facilisis. In diam est, placerat vel hendrerit sed, sollicitudin eu tortor. Praesent vel velit justo. Vivamus consequat dolor vitae porttitor molestie. Maecenas a libero fringilla, porta metus sit amet, posuere nunc.</p>
    </div>
  )
}
