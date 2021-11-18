import * as d3 from "d3"

import theme from "../theme"
import { drawArc } from "../utils/svg-tools.js"
import { degreesToRadians, polarToCartesian, fourier, squareWaveCos, squareWaveSin, squareWaveSequenceSin, squareWaveSequenceCos, distance } from "../utils/maths-tools.js"

class Fourier {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height, frequency, amplitude } = props

    this.props.length = 7

    this.props.numbers = Array.from({ length: this.props.length }, (_, i) => i+1)

    this.props.evens = this.props.numbers.map(x => x)
    this.props.odds = this.props.evens.map(x => x)

    this.props.omega = 2 * Math.PI * frequency

    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    this.update()
  }

  getSquarewave() {
    const { count, amplitude, omega, offset, odds, width, height } = this.props

    const originX = width / 2
    const originY = height / 2

    const squarewaveTransform = (t) => fourier(amplitude, omega, t, odds, squareWaveSequenceSin)
    const squarewaveTransformSin = (t, alpha) => fourier(amplitude, omega, t, odds, (omega, time, arr) => {
      return squareWaveSequenceSin(omega, time, arr.slice(0, alpha))
    })
    const squarewaveTransformCos = (t, alpha) => fourier(amplitude, omega, t, odds, (omega, time, arr) => {
      return squareWaveSequenceCos(omega, time, arr.slice(0, alpha))
    })

    const arc = Array.from({ length: count }, (_, i) => [
        //(squarewaveTransformSin(i + offset, 3)),
        i,
        (squarewaveTransformSin(i - offset, 5))
      ])
      // .map((coords) => polarToCartesian(coords[0], coords[1]))
      .map((coords) => [originX + coords[0], originY + coords[1]])

    return d3.line()(arc)
  }

  update() {
    const { svg, props: { height, width, amplitude, omega, offset, odds, numbers } } = this

    const squarewave = this.getSquarewave()

    svg.selectAll('path')
      .data([0])
      .enter()
        .append("path")
        .attr("d", squarewave)
        .attr("fill", "none")
        .attr("stroke", theme.colors.black)
        .attr("stroke-width", "1")
  }

  setOffset(offset) {
    const { svg, props: { height, width, amplitude, omega, odds, length } } = this

    this.props.offset = offset

    const squarewave = this.getSquarewave()

    svg.selectAll('path')
        .attr("d", squarewave)
  }

  resize(width, height) {

  }
}

export default Fourier
