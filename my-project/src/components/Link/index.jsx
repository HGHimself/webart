import { h } from 'preact'

export default function Link(props) {
    const { href, children } = props

    return (
        <a href={href} rel="noopener noreferrer" target="_blank">
            {children}↗
        </a>
    )
}
