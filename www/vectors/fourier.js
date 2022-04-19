import * as d3 from 'd3'

import theme from '../theme'
import { drawArc } from '../utils/svg-tools.js'
import {
    degreesToRadians,
    polarToCartesian,
    fourier,
    squareWaveCos,
    squareWaveSin,
    squareWaveSequenceSin,
    squareWaveSequenceCos,
    distance,
} from '../utils/maths-tools.js'

class Fourier {
    constructor(containerEl, props) {
        this.containerEl = containerEl
        this.props = props
        const { width, height, period, amplitude, numbers } = props

        this.svg = d3
            .select(containerEl)
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        this.svg
            .selectAll('circle')
            .data(numbers)
            .enter()
            .append('circle')
            .attr('fill', 'none')
            .attr('stroke', theme.colors.black)
            .attr('stroke-width', '0.5')
        this.svg
            .selectAll('path.circles')
            .data([0])
            .enter()
            .append('path')
            .attr('class', 'circles')
            .attr('fill', 'none')
            .attr('stroke', theme.colors.black)
            .attr('stroke-width', '0.5')
        this.svg
            .selectAll('path.lines')
            .data([0])
            .enter()
            .append('path')
            .attr('class', 'lines')
            .attr('fill', 'none')
            .attr('stroke', theme.colors.black)
            .attr('stroke-width', '0.5')

        this.update()
    }

    resize(width, height) {
        const { svg, props } = this

        svg.attr('width', width).attr('height', height)

        props.width = width
        props.height = height

        const originX = width / 2
        const originY = height / 2

        props.originXCircles = width / 4
        props.originYCircles = originY

        props.originXLine = width / 2
        props.originYLine = originY
    }

    getSquarewave() {
        const {
            count,
            amplitude,
            omega,
            offset,
            numbers,
            originYLine,
            originXLine,
        } = this.props

        const squarewaveTransform = (time) =>
            fourier(amplitude, omega, time, numbers, squareWaveSequenceSin)

        const arc = Array.from({ length: count }, (_, i) => [
            originXLine + i,
            originYLine + squarewaveTransform(i + offset),
        ])

        return d3.line()(arc)
    }

    getSquarewaveDrawer(count) {
        const {
            amplitude,
            omega,
            offset,
            numbers,
            originXCircles,
            originYCircles,
            originYLine,
            originXLine,
        } = this.props

        const squarewaveTransformSin = (t, alpha) =>
            fourier(amplitude, omega, t, numbers, (omega, time, arr) => {
                return squareWaveSequenceSin(omega, time, arr.slice(0, alpha))
            })
        const squarewaveTransformCos = (t, alpha) =>
            fourier(amplitude, omega, t, numbers, (omega, time, arr) => {
                return squareWaveSequenceCos(omega, time, arr.slice(0, alpha))
            })

        const arc = Array.from({ length: count + 1 }, (_, i) => [
            originXCircles + squarewaveTransformCos(offset, i),
            originYCircles + squarewaveTransformSin(offset, i),
        ])

        arc.push([
            originXLine,
            originYLine + squarewaveTransformSin(offset, count),
        ])

        return d3.line()(arc)
    }

    getCircleDrawerY() {
        const { amplitude, omega, offset, numbers, originYCircles } = this.props

        const squarewaveTransformSin = (t, alpha) =>
            fourier(amplitude, omega, t, numbers, (omega, time, arr) => {
                return squareWaveSequenceSin(omega, time, arr.slice(0, alpha))
            })

        return (d, i) => originYCircles + squarewaveTransformSin(offset, i)
    }

    getCircleDrawerX() {
        const { amplitude, omega, offset, numbers, originXCircles } = this.props

        const squarewaveTransformCos = (t, alpha) =>
            fourier(amplitude, omega, t, numbers, (omega, time, arr) => {
                return squareWaveSequenceCos(omega, time, arr.slice(0, alpha))
            })

        return (d, i) => originXCircles + squarewaveTransformCos(offset, i)
    }

    update() {
        const {
            svg,
            props: { height, width, amplitude, omega, offset, numbers },
        } = this

        const squarewave = this.getSquarewave()
        const getSquarewaveDrawer = this.getSquarewaveDrawer(numbers.length)
        const getCirclesX = this.getCircleDrawerX()
        const getCirclesY = this.getCircleDrawerY()
        const getRadius = (d) => amplitude * squareWaveCos(1, 0, d)

        svg.selectAll('circle')
            .data(numbers)
            .join(
                (enter) => enter,
                (update) =>
                    update
                        .attr('cy', getCirclesY)
                        .attr('cx', getCirclesX)
                        .attr('r', getRadius)
            )
        svg.selectAll('path.circles').attr('d', getSquarewaveDrawer)
        svg.selectAll('path.lines').attr('d', squarewave)
    }

    setOffset(offset) {
        this.props.offset = offset
        this.update()
    }
}

export default Fourier
