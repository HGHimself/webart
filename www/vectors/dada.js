import * as d3 from 'd3'

import theme from '../theme'
import {
    simpleHarmonicMotionCos,
    simpleHarmonicMotionSin,
} from '../utils/maths-tools.js'
import { getSpectrumPosition } from '../utils/color-tools.js'

class Dada {
    constructor(containerEl, props) {
        this.containerEl = containerEl
        this.props = props
        this.props.counter = 0
        const { width, height, data } = props

        this.svg = d3
            .select(containerEl)
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        this.svg
            .selectAll('text')
            .data(data.split(' '))
            .enter()
            .append('text')
            .text((d) => d)

        this.update()
    }

    setData(data) {
        console.log(data)
        this.props.data = data
        this.update()
    }

    resize(width, height) {
        const { svg, props } = this

        svg.attr('width', width).attr('height', height)

        props.width = width
        props.height = height

        this.update()
    }

    update() {
        const {
            svg,
            props: { width, height, data },
        } = this

        const originX = width / 2
        const originY = 0
        const amplitude = width * 0.35
        const frequency = 0.04

        svg.selectAll('text')
            .data(data.split(' '))
            .join(
                (enter) => enter,
                (update) =>
                    update
                        .text((d) => d)
                        .attr('x', (d, i) =>
                            simpleHarmonicMotionSin(
                                originX,
                                amplitude,
                                frequency,
                                i
                            )
                        )
                        .attr('y', (d, i) =>
                            simpleHarmonicMotionCos(
                                originX,
                                amplitude,
                                frequency,
                                i
                            )
                        )
            )
    }
}

export default Dada
