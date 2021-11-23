import * as d3 from "d3"

import theme from "../theme"
import { drawArc } from "../utils/svg-tools.js"
import { degreesToRadians, polarToCartesian } from "../utils/maths-tools.js"

class Spiralizer {

  constructor(containerEl, props, handleOutsideChanges) {
    this.containerEl = containerEl
    this.handleOutsideChanges = handleOutsideChanges
    this.props = props
    const { width, height, count } = props

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
    this.setMultiplier(props.multiplier)
  }

  update() {
    const { svg, props: { height, width } } = this

    const arc = this.calculateArc()

    svg.selectAll('path')
      .data([0])
      .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", "transparent")
        .attr("stroke", theme.colors.black)
        .attr("stroke-width", "1")
  }

  calculateArc() {
    const { count, multiplier, width, height } = this.props
    const originX = width / 2
    const originY = height / 2

    const arc = Array.from({ length: count }, (_, i) => [
      5 * i, // radius,
      ((multiplier / 10) * (Math.PI / 2) * i), // angle (in radians)
    ]).map((coord) => polarToCartesian(coord[0], coord[1]))
    .map((coord) => [originX + coord[0], originY + coord[1]])

    return d3.line()(arc)
  }

  setMultiplier(multiplier) {
    this.props.multiplier = multiplier

    const arc = this.calculateArc()

    this.svg.selectAll('path')
      .attr("d", arc)
  }

  setColor(color) {
    this.svg.selectAll('path')
      .attr("fill", color)
  }
}

export default Spiralizer
