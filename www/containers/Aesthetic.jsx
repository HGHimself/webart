import React from "react"

import Swatch from "../components/Swatch.jsx"
import FlexRow from "../components/FlexRow.jsx"
import Button from "../components/Button.jsx"
import Switch from "../components/Switch.jsx"
import Link from "../components/Link.jsx"
import NumberInput from "../components/NumberInput.jsx"

import { objectMap } from "../utils/data-tools.js"
import theme from "../theme"

import entry from "../build/entry.js"

function Aesthetic( props )  {

  const makeSwatch = (name, color, i) => <div key={i}><Swatch color={color} name={name} /></div>
  const makeButton = (type, i) => (<div key={i}><Button type={type}>{type}</Button></div>)
  const makeSwitch = (type, i) => <div key={i}><Switch type={type} key={i} /></div>

  const types = Object.keys(theme.colors)

  return (
    <>
      <h1 className="thick">Aesthetic</h1>
      <p>Inspect the design motifs of these webapps. Inspirations pulled </p>
      <h4>colors</h4>
      <FlexRow wrap="wrap">
        {objectMap(theme.shades, makeSwatch)}
      </FlexRow>
      <h4>buttons</h4>
      <FlexRow wrap="wrap">{types.map(makeButton)}</FlexRow>
      <h4>switches</h4>
      <FlexRow wrap="wrap">{types.map(makeSwitch)}</FlexRow>
      <h4>inputs</h4>
      <NumberInput
        label="label"
        value={1729}
        onChange={()=>{}} />
      <h4>codeblock</h4>
      <pre>
        <code>{`
// a quine for your consideration...
input = "console.log('input = ' + String.fromCharCode(34) + input + String.fromCharCode(34) + ';' + String.fromCharCode(10) + input);";
console.log('input = ' + String.fromCharCode(34) + input + String.fromCharCode(34) + ';' + String.fromCharCode(10) + input);
        `}</code>
      </pre>
      <h4>typography</h4>
      <p>Paragraph text displayed in <Link href="https://en.wikipedia.org/wiki/Helvetica">Helvetica</Link> font face.</p>
      <p>{
        [...Array(256 - 32).keys()].map((c, i) => <span key={i}>
            {String.fromCharCode(c + 32)}
            {i == 0 || i % 32 ? '' : <br />}
        </span>)
      }</p>
      <br />
      <h6>Headers displayed in <Link href="https://en.wikipedia.org/wiki/Futura_(typeface)">Futura</Link> font face.</h6>
      <h6>{
        [...Array(256 - 32).keys()].map((c, i) => <span key={i}>
            {String.fromCharCode(c + 32)}
            {i == 0 || i % 32 ? '' : <br />}
        </span>)
      }</h6>
      <h1 className="thick">Super Big Title - h1</h1>
      <h2>Big Title - h2</h2>
      <h3>Section - h3</h3>
      <h4>Subsection - h4</h4>
      <h5>Sendoff: Au Revoir! - h5</h5>
      <h6>Byline - h6</h6>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Aliquam consectetur molestie nulla sit amet cursus. Aenean accumsan vulputate nulla in euismod. Fusce non justo nec ligula venenatis blandit. Aenean eget euismod quam. Curabitur urna sem, varius vel consequat at, interdum a neque. In vitae est quam. Curabitur interdum congue imperdiet. Curabitur faucibus commodo ante sed mollis. Quisque vitae enim ut turpis placerat facilisis. In diam est, placerat vel hendrerit sed, sollicitudin eu tortor. Praesent vel velit justo. Vivamus consequat dolor vitae porttitor molestie. Maecenas a libero fringilla, porta metus sit amet, posuere nunc.</p>
    </>
  )
}

entry(<Aesthetic />)
