import { select } from 'd3-selection'
import { line } from 'd3-shape'

import theme from '../theme'
import {
    simpleHarmonicMotionCos,
    simpleHarmonicMotionSin,
    fourier,
    squareWaveSequenceSin,
    squareWaveSequenceCos,
    random,
} from '../utils/maths-tools.js'
import { getSpectrumPosition } from '../utils/color-tools.js'

class SpectralCircle {
    constructor(containerEl, props) {
        this.containerEl = containerEl
        this.props = props
        const { width, height, count } = props

        const data = Array.from({ length: count }, () => [1, random(0, 0)])
        props.data = data

        // give us a canvas to draw on
        this.svg = select(containerEl)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
        // bring in circles
        this.svg
            .selectAll('ellipse')
            .data(data)
            .enter()
            .append('ellipse')
            .attr('fill', 'none')
            .attr('stroke-width', '1')
        // draw with the cirlces
        this.update()
    }

    resize(width, height) {
        // const { svg, props } = this
        //
        // props.width = width
        // props.height = width * 0.4 > 300 ? 600 : 300
        //
        // svg.attr('width', props.width)
        //   .attr('height', props.height)
        //
        // this.update()
    }

    setData(data) {
        const { svg, props } = this
        this.props.data = data

        svg.selectAll('ellipse')
            .data(data)
            .join((enter) =>
                enter
                    .append('ellipse')
                    .attr('fill', 'none')
                    .attr('stroke', theme.colors.black)
                    .attr('stroke-width', '0.5')
            )
        this.update()
    }

    update() {
        const {
            svg,
            props: {
                width,
                height,
                data,
                amplitude,
                offset,
                frequency,
                multiplierX,
                multiplierY,
                omega,
                numbers,
            },
        } = this

        const circleSizePercentage = 0.25

        const xCount = 10
        const yCount = 10

        const boxWidth = Math.floor(width / (xCount + 1))
        const boxHeight = Math.floor(height / (yCount + 1))

        const radiusX = boxWidth * circleSizePercentage
        const radiusY = boxHeight * circleSizePercentage
        console.log({
            boxWidth,
            boxHeight,
            radiusX,
            radiusY,
        })

        const squarewaveTransformX = (time) =>
            fourier(radiusX, omega, time, numbers, squareWaveSequenceSin)

        const xOrigin = (i) => boxWidth * (i % xCount) + radiusX
        const x = (d, i) =>
            d[0] == 0
                ? xOrigin(i) +
                  Math.floor(
                      squarewaveTransformX(multiplierX * (d[1] + offset))
                  )
                : xOrigin(i)

        const squarewaveTransformY = (time) =>
            fourier(radiusY, omega, time, numbers, squareWaveSequenceSin)

        const yOrigin = (i) => boxHeight * Math.ceil((1 + i) / xCount)
        const y = (d, i) =>
            d[0] == 1
                ? yOrigin(i) +
                  Math.floor(
                      squarewaveTransformY(multiplierY * (d[1] + offset))
                  )
                : yOrigin(i)

        const ry = (d) =>
            d[0] == 0
                ? radiusY
                : //? (Math.floor(squarewaveTransformY(multiplierY * (d[1] + offset))))
                  //: Math.floor(squarewaveTransformX(multiplierX * (d[1] + offset)))
                  radiusY

        const rx = (d) =>
            d[0] == 1
                ? 1.9 *
                  radiusX *
                  (Math.floor(squarewaveTransformX(2 * (offset + d[1]))) /
                      radiusX)
                : radiusX

        // const y = (d,i) => d[0] == 1
        //   ? simpleHarmonicMotionSin(boxHeight * (Math.ceil((1+i) / xCount)), amplitude, multiplierX * frequency, d[1] + offset)
        //   : boxHeight * (Math.ceil((1+i) / xCount))

        // const x = (d,i) => d[0] == 2
        //   ? simpleHarmonicMotionCos(boxWidth * (i % xCount) + radiusX, amplitude, multiplierY * frequency, d[1] + offset)
        //   : boxWidth * (i % xCount) + radiusX

        svg.selectAll('ellipse')
            .attr('cy', y)
            .attr('cx', x)
            .attr('ry', ry)
            .attr('rx', rx)
            .attr('fill', (d, i) =>
                0
                    ? 'red'
                    : getSpectrumPosition(
                          ((i % xCount) + Math.ceil(i / xCount)) * 0.19
                      )
            )
    }

    setOffset(offset) {
        this.props.offset = offset
        this.update()
    }

    getSvg() {
        const { svg } = this
        return svg
    }
}

export default SpectralCircle
