import * as d3 from "d3"

import theme from "../theme"
import { drawArc } from "../utils/svg-tools.js"
import { degreesToRadians, polarToCartesian, fourier, squareWaveCos, squareWaveSin, squareWaveSequenceSin, squareWaveSequenceCos, distance } from "../utils/maths-tools.js"

class Fourier {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height, period, amplitude } = props

    this.props.length = 4

    this.props.numbers = Array.from({ length: this.props.length }, (_, i) => i+1)

    this.props.evens = this.props.numbers.map(x => x * 2)
    this.props.odds = this.props.evens.map(x => x - 1)

    this.props.originX = width / 2
    this.props.originY = height / 2

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
    const squarewaveTransformSin = (t, alpha) => fourier(amplitude, omega, t, odds, (omega, time, arr) => {
      return squareWaveSequenceSin(omega, time, arr.slice(0, alpha))
    })
    const squarewaveTransformCos = (t, alpha) => fourier(amplitude, omega, t, odds, (omega, time, arr) => {
      return squareWaveSequenceCos(omega, time, arr.slice(0, alpha))
    })

    const arc = Array.from({ length: count / 100 }, (_, i) => [
      (squarewaveTransformSin(i - offset)),
      (squarewaveTransformCos(i + offset))
    ])
    .map((coords) => polarToCartesian(coords[0], coords[1]))
    .map((coords) => [originXLine + coords[0], originYLine + coords[1]])

    return d3.line()(arc)
  }

  update() {
    const { svg, props: { height, width, amplitude, omega, offset, odds, numbers, originX, originY } } = this

    const squarewave = this.getSquarewave()

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
    
    svg.selectAll('path.lines')
        .attr("d", squarewave)
  }
}

export default Fourier
