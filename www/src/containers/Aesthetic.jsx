import React from 'react'

import Swatch from '../components/Swatch/index.jsx'
import FlexRow from '../components/FlexRow/index.jsx'
import Button from '../components/Button/index.jsx'
import Switch from '../components/Switch/index.jsx'
import Link from '../components/Link/index.jsx'
import NumberInput from '../components/NumberInput/index.jsx'
import Title from '../components/Title/index.jsx'

import { objectMap } from '../utils/data-tools.js'
import theme from '../theme'

export default function Aesthetic(props) {
    const makeSwatch = (name, color, i) => (
        <div key={i}>
            <Swatch color={color} name={name} />
        </div>
    )
    const makeButton = (type, i) => (
        <div key={i}>
            <Button type={type}>{type}</Button>
        </div>
    )
    const makeSwitch = (type, i) => (
        <div key={i}>
            <Switch type={type} key={i} />
        </div>
    )
    const makeNumberInputs = (number, i) => (
        <div key={i}>
            <NumberInput label="numero" value={number} onChange={() => {}} />
        </div>
    )

    const types = Object.keys(theme.colors)
    const numbers = [1, 7, 2, 9]

    return (
        <>
            <a href="/webart">back</a>
            <Title
                title="AESTHETIC"
                description="A study of the design motifs used across the site."
            />
            <h4>colors</h4>
            <FlexRow wrap="wrap">{objectMap(theme.shades, makeSwatch)}</FlexRow>
            <br />
            <h4>buttons</h4>
            <FlexRow wrap="wrap">{types.map(makeButton)}</FlexRow>
            <br />
            <h4>switches</h4>
            <FlexRow wrap="wrap" width="50%" flex="space-between">
                {types.map(makeSwitch)}
            </FlexRow>
            <br />
            <h4>inputs</h4>
            <FlexRow wrap="wrap" width="40%" flex="space-between">
                {numbers.map(makeNumberInputs)}
            </FlexRow>
            <br />
            <h4>codeblock</h4>
            <pre>
                <code>{`
// a quine for your consideration...
input = "console.log('input = ' + String.fromCharCode(34) + input + String.fromCharCode(34) + ';' + String.fromCharCode(10) + input);";
console.log('input = ' + String.fromCharCode(34) + input + String.fromCharCode(34) + ';' + String.fromCharCode(10) + input);
        `}</code>
            </pre>
            <br />
            <h4>typography</h4>
            <p>
                Paragraph text displayed in{' '}
                <Link href="https://en.wikipedia.org/wiki/Helvetica">
                    Helvetica
                </Link>{' '}
                font face.
            </p>
            <p>
                {[...Array(256 - 32).keys()].map((c, i) => (
                    <span key={i}>
                        {String.fromCharCode(c + 32)}
                        {i == 0 || i % 32 ? '' : <br />}
                    </span>
                ))}
            </p>
            <br />
            <h6>
                Headers displayed in{' '}
                <Link href="https://en.wikipedia.org/wiki/Futura_(typeface)">
                    Futura
                </Link>{' '}
                font face.
            </h6>
            <h6>
                {[...Array(256 - 32).keys()].map((c, i) => (
                    <span key={i}>
                        {String.fromCharCode(c + 32)}
                        {i == 0 || i % 32 ? '' : <br />}
                    </span>
                ))}
            </h6>
            <h1>Super Big Title - h1</h1>
            <h2>Big Title - h2</h2>
            <h3>Section - h3</h3>
            <h4>Subsection - h4</h4>
            <h5>Sendoff: Au Revoir! - h5</h5>
            <h6>Byline - h6</h6>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Aliquam consectetur molestie nulla sit amet cursus. Aenean
                accumsan vulputate nulla in euismod. Fusce non justo nec ligula
                venenatis blandit. Aenean eget euismod quam. Curabitur urna sem,
                varius vel consequat at, interdum a neque. In vitae est quam.
                Curabitur interdum congue imperdiet. Curabitur faucibus commodo
                ante sed mollis. Quisque vitae enim ut turpis placerat
                facilisis. In diam est, placerat vel hendrerit sed, sollicitudin
                eu tortor. Praesent vel velit justo. Vivamus consequat dolor
                vitae porttitor molestie. Maecenas a libero fringilla, porta
                metus sit amet, posuere nunc.
            </p>
        </>
    )
}
