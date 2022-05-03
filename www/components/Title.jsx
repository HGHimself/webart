import React from 'react'
import { css } from '@emotion/css'
import theme from '../theme'

import FlexRow from './FlexRow.jsx'

const descriptionStyle = css``

export default function Title(props) {
    const { title, description } = props

    return (
        <div className="header">
            <h3>{title}</h3>
            <p className={descriptionStyle}>{description}</p>
        </div>
    )
}
