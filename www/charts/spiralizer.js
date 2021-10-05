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
      // .style('background-color', 'white')
      .attr('width', width)
      .attr('height', height)

    this.update()
  }

  getArc() {
    const { count, multiplier } = this.props

    const arc = Array.from({ length: count }, (_, i) => [
      5 * i, // radius,
      (multiplier/10) * (Math.PI / 3) * i, // angle (in radians)
    ]).map((coord) => polarToCartesian(coord[0], coord[1]))

    return d3.line()(arc)
  }

  update() {
    const { svg, props: { count, height, width, multiplier } } = this

    const arc = this.getArc()

    svg.selectAll('path')
      .data([0])
      .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", theme.colors.white)
        .attr("stroke", theme.colors.black)
        .attr("stroke-width", "1")
        .attr("transform", `translate(${width/2},${height/2})`)
  }

  setMultiplier(m) {
    const { svg, props: { count, height, width, multiplier } } = this
    this.props.multiplier = m

    const arc = this.getArc()

    svg.selectAll('path')
      .attr("d", arc)
  }

  setColor(color) {
    const { svg } = this

    svg.selectAll('path')
      .attr("fill", color)
  }
}

export default Spiralizer
