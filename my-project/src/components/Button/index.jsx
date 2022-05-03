import { h } from 'preact'
import theme from '../../theme'

import { darkOrLight } from '../../utils/color-tools.js'

export default function Button(props) {
    const { type, ...other } = props

    const color = theme.colors[type]

    return (
        <button {...other}>
            {props.children}
        </button>
    )
}
