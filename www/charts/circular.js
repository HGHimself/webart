import * as d3 from "d3"

import theme from "../theme"
import { drawArc } from "../utils/svg-tools.js"
import { degreesToRadians, polarToCartesian, cartesianToPolar, fourier, squareWaveCos, squareWaveSin, squareWaveSequenceSin, squareWaveSequenceCos, distance } from "../utils/maths-tools.js"

class Fourier {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height, period, amplitude } = props

    this.props.count = 43

    this.props.originX = width / 2
    this.props.originY = height / 2

    this.props.originXCircles = this.props.originX - 400
    this.props.originYCircles = this.props.originY

    this.props.originXLine = 600
    this.props.originYLine = this.props.originY

    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    this.update()
  }

  setMultiplierX(multiplierX) {
    this.props.multiplierX = multiplierX
  }

  setMultiplierY(multiplierY) {
    this.props.multiplierY = multiplierY
  }

  getDrawer() {
    const { count, amplitude, offset, multiplierX, multiplierY, originYLine, originXLine } = this.props

    const arc = Array.from({ length: count }, (_, i) => [
      originXLine + (amplitude*Math.sin(multiplierX * (i - offset))),
      originYLine + (amplitude*Math.cos(multiplierY * (i - offset)))
    ])

    return d3.line()(arc)
  }

  update() {
    const { svg } = this

    const drawer = this.getDrawer()
    svg.selectAll('path.lines')
      .data([0])
      .enter()
        .append("path")
        .attr("class", "lines")
        .attr("d", drawer)
        .attr("fill", "none")
        .attr("stroke", theme.colors.black)
        .attr("stroke-width", "1")
  }

  setOffset(offset) {
    const { svg } = this
    this.props.offset = offset

    const drawer = this.getDrawer()

    svg.selectAll('path.lines')
        .attr("d", drawer)
  }
}

export default Fourier
