import * as d3 from "d3"

import theme from "../theme"
// import { getSpectrumPosition, getRgbSpectrumArray } from '../utils/color-tools.js'

const getRgbSpectrumArray = (i) => {
  const r = Math.round(127 * Math.sin((i + (2 * Math.PI)))) + 128
  const g = Math.round(127 * Math.sin((i + (47 * Math.PI)))) + 128
  const b = Math.round(127 * Math.tan(i + (Math.PI))) + 128

  return [r, g, b]
}

const getSpectrumPosition = (i) => {
  const [r, g, b] = getRgbSpectrumArray(i)
  return `rgb(${r}, ${g}, ${b})`
}

class colorPlot {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height, } = props

    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    this.setValue(10)
  }

  getCircleDrawerX() {
    const { xAxisValue } = this.props
    return (d) => -getRgbSpectrumArray(d)[xAxisValue]
  }

  getCircleDrawerY() {
    const { yAxisValue } = this.props
    return (d) => 0.5 * getRgbSpectrumArray(d)[yAxisValue]
  }

  getRadius() {
    const { radiusValue } = this.props
    return (d) => 0.3 * getRgbSpectrumArray(d)[radiusValue]
  }

  getColor() {
    return d => getSpectrumPosition(d)
  }

  setValue(value) {
    const { svg, props: { height, width } } = this

    const values = Array.from({ length: 80 }, (_, i) => [i + value])

    const circles = svg.selectAll('circle')
      .data(values)

    circles.exit().remove()
    circles.enter()
      .append("circle")
      .attr("cy", this.getCircleDrawerY())
      .attr("cx", this.getCircleDrawerX())
      .attr("r", this.getRadius())
      .attr("fill", 'none')
      .attr("stroke", this.getColor())
      .attr("stroke-width", "1")
      .attr("transform", `translate(${width/2},${height/2})`)
    circles.transition()
      .duration(0)
      .attr("cy", this.getCircleDrawerY())
      .attr("cx", this.getCircleDrawerX())
      .attr("r", this.getRadius())
      .attr("stoke", this.getColor())
      .attr("transform", `translate(${width/2},${height/2})`)
  }

  setValues({xAxisValue, yAxisValue, radiusValue})  {
    const { svg } = this

    this.props.xAxisValue = xAxisValue
    this.props.yAxisValue = yAxisValue
    this.props.radiusValue = radiusValue

    svg.selectAll('circle').transition()
      .duration(0)
      .attr("cy", this.getCircleDrawerY())
      .attr("cx", this.getCircleDrawerX())
      .attr("r", this.getRadius())
      .attr("stoke", this.getColor())
      .attr("transform", `translate(${width/2},${height/2})`)
  }
}

export default colorPlot
