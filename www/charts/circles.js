import * as d3 from "d3"

import theme from "../theme"
import { getSpectrumPosition } from '../utils/color-tools.js'

class Circles {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    this.props.counter = 0
    const { width, height, } = props

    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
  }

  getCircleDrawerX() {
    return (d) => d[0]
  }

  getCircleDrawerY() {
    return (d) => d[1]
  }

  getRadius() {
    const { timer } = this.props

    return (d) => (timer - d[2]) * 10
  }

  getColor() {
    return d => getSpectrumPosition(d[2])
  }

  setTimer(timer, newData) {
    const { svg } = this
    this.props.timer = timer
    this.props.data = newData

    const circles = svg.selectAll('circle')
      .data(newData)

    circles.exit().remove()
    circles.enter()
      .append("circle")
      .attr("cy", this.getCircleDrawerY())
      .attr("cx", this.getCircleDrawerX())
      .attr("r", this.getRadius())
      .attr("fill", 'none')
      .attr("stroke", this.getColor())
      .attr("stroke-width", "1")
    circles.transition()
      .duration(0)
      .attr("cy", this.getCircleDrawerY())
      .attr("cx", this.getCircleDrawerX())
      .attr("r", this.getRadius())

  }
}

export default Circles
