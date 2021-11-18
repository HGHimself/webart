import * as d3 from "d3"

import theme from "../theme"
import { drawArc } from "../utils/svg-tools.js"
import { degreesToRadians, polarToCartesian, fourier, squareWaveCos, squareWaveSin, squareWaveSequenceSin, squareWaveSequenceCos, distance } from "../utils/maths-tools.js"

class Fourier {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height, period, amplitude } = props

    const frequency = 1 / period
    this.props.omega = 2 * Math.PI * frequency

    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    this.update()
  }

  resize(width, height) {
    const { svg, props } = this

    svg.attr('width', width)
      .attr('height', height)

    props.width = width
    props.height = height

    const originX = width / 2
    const originY = height / 2

    props.originXCircles = originX - 400
    props.originYCircles = originY

    props.originXLine = 600
    props.originYLine = originY
  }

  getSquarewave() {
    const { count, amplitude, omega, offset, numbers, originYLine, originXLine } = this.props

    const squarewaveTransform = (t) => fourier(amplitude, omega, t, numbers, squareWaveSequenceSin)

    const arc = Array.from({ length: count }, (_, i) => [
      originXLine + i,
      originYLine + squarewaveTransform(i + offset)
    ])

    return d3.line()(arc)
  }

  getSquarewaveDrawer(count) {
    const { amplitude, omega, offset, numbers, originXCircles, originYCircles, originYLine, originXLine } = this.props

    const squarewaveTransformSin = (t, alpha) => fourier(amplitude, omega, t, numbers, (omega, time, arr) => {
      return squareWaveSequenceSin(omega, time, arr.slice(0, alpha))
    })
    const squarewaveTransformCos = (t, alpha) => fourier(amplitude, omega, t, numbers, (omega, time, arr) => {
      return squareWaveSequenceCos(omega, time, arr.slice(0, alpha))
    })

    const arc = Array.from({ length: count + 1 }, (_, i) => [
      originXCircles + squarewaveTransformCos(offset, i),
      originYCircles + squarewaveTransformSin(offset, i)
    ])

    arc.push([
      originXLine,
      originYLine + squarewaveTransformSin(offset, count)
    ])

    return d3.line()(arc)
  }

  getCircleDrawerY() {
    const { amplitude, omega, offset, numbers, originYCircles } = this.props

    const squarewaveTransformSin = (t, alpha) => fourier(amplitude, omega, t, numbers, (omega, time, arr) => {
      return squareWaveSequenceSin(omega, time, arr.slice(0, alpha))
    })

    return (d, i) => originYCircles + (squarewaveTransformSin(offset, i))
  }

  getCircleDrawerX() {
    const { amplitude, omega, offset, numbers, originXCircles } = this.props

    const squarewaveTransformCos = (t, alpha) => fourier(amplitude, omega, t, numbers, (omega, time, arr) => {
      return squareWaveSequenceCos(omega, time, arr.slice(0, alpha))
    })

    return (d, i) => originXCircles + (squarewaveTransformCos(offset, i))
  }

  drawCircles() {
    const { svg, props: { amplitude, numbers } } = this
    // for each number, mak
    const getRadius = (d) => amplitude * squareWaveCos(1, 0, d)

    svg.selectAll('circle')
      .data(numbers)
      .enter()
        .append("circle")
        .attr("cy", this.getCircleDrawerY())
        .attr("cx", this.getCircleDrawerX())
        .attr("r", getRadius)
        .attr("fill", 'none')
        .attr("stroke", theme.colors.black)
        .attr("stroke-width", "0.5")
  }

  update() {
    const { svg, props: { height, width, amplitude, omega, offset, numbers } } = this

    const squarewave = this.getSquarewave()
    const getSquarewaveDrawer = this.getSquarewaveDrawer(this.props.length)

    this.drawCircles()

    svg.selectAll('path.circles')
      .data([0])
      .enter()
        .append("path")
        .attr("class", "circles")
        .attr("d", getSquarewaveDrawer)
        .attr("fill", 'none')
        .attr("stroke", theme.colors.black)
        .attr("stroke-width", "0.5")
    svg.selectAll('path.lines')
      .data([0])
      .enter()
        .append("path")
        .attr("class", "lines")
        .attr("d", squarewave)
        .attr("fill", "none")
        .attr("stroke", theme.colors.black)
        .attr("stroke-width", "0.5")
  }

  setOffset(offset) {
    const { svg, props: { height, width, amplitude, omega, numbers, length } } = this
    this.props.offset = offset

    const squarewave = this.getSquarewave()
    const squarewaveDrawer = this.getSquarewaveDrawer(length)

    svg.selectAll('circle')
      .attr("cy", this.getCircleDrawerY() )
      .attr("cx", this.getCircleDrawerX() )

    svg.selectAll('path.circles')
        .attr("d", squarewaveDrawer)

    svg.selectAll('path.lines')
        .attr("d", squarewave)
  }
}

export default Fourier
