import * as d3 from "d3"

import theme from "../theme"
import { simpleHarmonicMotionCos, simpleHarmonicMotionSin } from "../utils/maths-tools.js"

class Circular {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height } = props

    this.props.originX = width / 2
    this.props.originY = height / 2

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

  setMode(mode) {
    this.props.mode = mode
  }

  getDrawer() {
    const { mode, count, amplitude, offset, frequency, multiplierX, multiplierY, originY, originX } = this.props

    const arc = mode ? Array.from({ length: count }, (_, i) => [
      simpleHarmonicMotionSin(originX, amplitude, multiplierX * frequency, i - offset),
      simpleHarmonicMotionCos(originY, amplitude, multiplierY * frequency, i - offset)
    ])
    : Array.from({ length: count }, (_, i) => [
      originX + (amplitude*Math.sin(multiplierX * (i - offset))),
      originY + (amplitude*Math.cos(multiplierY * (i - offset)))
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

  setFrequency(frequency) {
    this.props.frequency = frequency
  }

  setColor(color) {
    const { svg } = this

    svg.selectAll('path.lines')
      .attr("fill", color)
  }
}

export default Circular
