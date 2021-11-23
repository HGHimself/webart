import * as d3 from "d3"

import theme from "../theme"
import { simpleHarmonicMotionCos, simpleHarmonicMotionSin } from "../utils/maths-tools.js"

class Circular {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height } = props
    // give us a canvas to draw on
    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    // bring in a line
    this.svg.selectAll('path.lines')
      .data([0])
      .enter()
        .append("path")
        .attr("class", "lines")
        .attr("fill", "none")
        .attr("stroke", theme.colors.black)
        .attr("stroke-width", "1")
    // draw with the line
    this.update()
  }

  resize(width, height) {
    const { svg, props } = this

    svg.attr('width', width)
      .attr('height', height)

    props.width = width
    props.height = height
    props.amplitude = width * 0.4 > 300 ? 300 : width * 0.4

    this.update()
  }

  setMultiplierX(multiplierX) {
    this.props.multiplierX = multiplierX
    this.update()
  }

  setMultiplierY(multiplierY) {
    this.props.multiplierY = multiplierY
    this.update()
  }

  setCount(count) {
    this.props.count = count
    this.update()
  }

  setOffset(offset) {
    this.props.offset = offset
    this.update()
  }

  setFrequency(frequency) {
    this.props.frequency = frequency
    this.update()
  }

  setColor(color) {
    const { svg } = this

    svg.selectAll('path.lines')
      .attr("fill", color)
  }

  getDrawer() {
    const { mode, count, amplitude, offset, frequency, multiplierX, multiplierY, width, height } = this.props

    const originX = (width/2)
    const originY = (height/2)

    const arc = Array.from({ length: count }, (_, i) => [
      simpleHarmonicMotionSin(originX, amplitude, multiplierX * frequency, i - offset),
      simpleHarmonicMotionCos(originY, amplitude, multiplierY * frequency, i - offset)
    ])

    return d3.line()(arc)
  }

  update() {
    const { svg } = this

    const drawer = this.getDrawer()
    svg.selectAll('path.lines')
        .attr("d", drawer)
  }
}

export default Circular
