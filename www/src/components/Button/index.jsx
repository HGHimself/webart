import { h } from 'preact'
import './style.css'

export default function Button(props) {
    const { type, ...other } = props

    return (
        <button className='button' {...other}>
            {props.children}
        </button>
    )
}
