import { select } from 'd3-selection'
import { line } from 'd3-shape'

import theme from '../theme'
import {
    simpleHarmonicMotionCos,
    simpleHarmonicMotionSin,
} from '../utils/maths-tools.js'
import { getSpectrumPosition } from '../utils/color-tools.js'

class Music {
    constructor(containerEl, props) {
        this.containerEl = containerEl
        this.props = props
        const { width, height, data } = props

        // give us a canvas to draw on
        this.svg = select(containerEl)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
        // bring in circles
        this.svg
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('fill', 'none')
            .attr('stroke-width', '1')
        // draw with the cirlces
        this.update()
    }

    resize(width, height) {
        const { svg, props } = this

        props.width = width
        props.height = width * 0.4 > 300 ? 600 : 300
        props.amplitude = width * 0.4 > 300 ? 300 : width * 0.4

        svg.attr('width', props.width).attr('height', props.height)

        this.update()
    }

    setData(data) {
        const { svg, props } = this
        this.props.data = data

        svg.selectAll('circle')
            .data(data)
            .join((enter) =>
                enter
                    .append('circle')
                    .attr('fill', 'none')
                    .attr('stroke', theme.colors.black)
                    .attr('stroke-width', '0.5')
            )
        this.update()
    }

    update() {
        const {
            svg,
            props: { width, height, data },
        } = this

        const originX = width / 2
        const originY = height / 2

        svg.selectAll('circle')
            .attr('cy', (d, i) => d)
            .attr('cx', (d, i) => 4 * i)
            .attr('r', width / (2 * data.length))
            .attr('fill', (d, i) => getSpectrumPosition(i * 0.09))
    }

    getSvg() {
        const { svg } = this
        return svg
    }
}

export default Music
