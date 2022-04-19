// save in vectors/vector.js
import * as d3 from 'd3'
import { random } from '../utils/maths-tools.js'
import theme from '../theme'

class Escher {
    constructor(containerEl, props) {
        this.containerEl = containerEl
        this.props = props
        const { width, height, count } = props

        this.svg = d3
            .select(containerEl)
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        this.svg
            .selectAll('path')
            .data(Array.from({ length: 5 }, (_, i) => i))
            .enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke-width', (d) => (d % 2 ? '20' : '2'))

        this.update()
    }

    resize(width, height) {
        // this.update()
    }

    getDrawer(batch) {
        const { count, width, height } = this.props

        const originX = batch % 2 ? 11 * batch : 11 * batch
        const originY = batch % 2 ? 11 * batch : 11 * batch

        const arc = Array.from({ length: count }, (_, i) => [
            150 * (i + ((1 + i) % 2)) + originY,
            150 * (i + (i % 2)) - originX,
        ])

        return d3.line()(arc)
    }

    update() {
        const { classes } = this

        this.svg
            .selectAll('path')
            .attr('d', (d) => this.getDrawer(d))
            .attr('stroke', (d) =>
                d % 2
                    ? d % 3
                        ? 'grey'
                        : theme.colors.white
                    : theme.colors.black
            )
    }

    getSvg() {
        const { svg } = this
        return svg
    }
}

export default Escher
