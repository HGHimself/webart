import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import theme from '../../theme'

import { darkOrLight } from '../../utils/color-tools.js'

export default function Swatch(props) {
    const { color, name } = props

    const height = props.height ? props.height : 100

    return (
        <div>
            <p>{color}</p>
            <h5>{name.toLocaleLowerCase()}</h5>
        </div>
    )
}
