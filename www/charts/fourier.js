import * as d3 from "d3"

import theme from "../theme"
import { drawArc } from "../utils/svg-tools.js"
import { degreesToRadians, polarToCartesian, fourier, squareWaveCos, squareWaveSin, squareWaveSequenceSin, squareWaveSequenceCos, distance } from "../utils/maths-tools.js"

class Fourier {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height, period, amplitude } = props

    this.props.numbers = Array.from({ length: this.props.length }, (_, i) => i+1)

    this.props.evens = this.props.numbers.map(x => x * 2)
    this.props.odds = this.props.evens.map(x => x - 1)

    this.props.originX = width / 2
    this.props.originY = height / 2

    this.props.originXCircles = this.props.originX - 400
    this.props.originYCircles = this.props.originY

    this.props.originXLine = 600
    this.props.originYLine = this.props.originY

    const frequency = 1 / period
    this.props.omega = 2 * Math.PI * frequency

    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    this.update()
  }

  getSquarewave() {
    const { count, amplitude, omega, offset, odds, originYLine, originXLine } = this.props

    const squarewaveTransform = (t) => fourier(amplitude, omega, t, odds, squareWaveSequenceSin)

    const arc = Array.from({ length: count }, (_, i) => [
      originXLine + i,
      originYLine + squarewaveTransform(i + offset)
    ])

    return d3.line()(arc)
  }

  getSquarewaveDrawer(count) {
    const { amplitude, omega, offset, odds, originXCircles, originYCircles, originYLine, originXLine } = this.props

    const squarewaveTransformSin = (t, alpha) => fourier(amplitude, omega, t, odds, (omega, time, arr) => {
      return squareWaveSequenceSin(omega, time, arr.slice(0, alpha))
    })
    const squarewaveTransformCos = (t, alpha) => fourier(amplitude, omega, t, odds, (omega, time, arr) => {
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
    const { amplitude, omega, offset, odds, originYCircles } = this.props

    const squarewaveTransformSin = (t, alpha) => fourier(amplitude, omega, t, odds, (omega, time, arr) => {
      return squareWaveSequenceSin(omega, time, arr.slice(0, alpha))
    })

    return (d, i) => originYCircles + (squarewaveTransformSin(offset, i))
  }

  getCircleDrawerX() {
    const { amplitude, omega, offset, odds, originXCircles } = this.props

    const squarewaveTransformCos = (t, alpha) => fourier(amplitude, omega, t, odds, (omega, time, arr) => {
      return squareWaveSequenceCos(omega, time, arr.slice(0, alpha))
    })

    return (d, i) => originXCircles + (squarewaveTransformCos(offset, i))
  }

  update() {
    const { svg, props: { height, width, amplitude, omega, offset, odds, numbers, originX, originY } } = this

    const squarewave = this.getSquarewave()
    const getSquarewaveDrawer = this.getSquarewaveDrawer(this.props.length)

    const getRadius = (d) => amplitude * squareWaveCos(1, 0, d)

    svg.selectAll('circle')
      .data(odds)
      .enter()
        .append("circle")
        .attr("cy", this.getCircleDrawerY())
        .attr("cx", this.getCircleDrawerX())
        .attr("r", getRadius)
        .attr("fill", 'none')
        .attr("stroke", theme.colors.black)
        .attr("stroke-width", "0.5")
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
    const { svg, props: { height, width, amplitude, omega, odds, length } } = this
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
