import * as d3 from "d3"

import theme from "../theme"
import { fourier, squareWaveSequenceSin, squareWaveSequenceCos } from "../utils/maths-tools.js"
// import { getSpectrumPosition, getRgbSpectrumArray } from '../utils/color-tools.js'

const getRgbSpectrumArray = (i) => {
  const amplitude = 127
  const offset = 128
  const odds = [ 1, 3, 5, 7, 9 ]

  const limiter = (x) => (amplitude * x) + 128

  const r = limiter(fourier(2, Math.PI / 11, i/100, odds, squareWaveSequenceCos))
  const g = limiter(fourier(2, Math.PI / 8, i/100, odds, squareWaveSequenceSin))
  const b = limiter(fourier(2, Math.PI / 9, i/100, odds, squareWaveSequenceCos))

  // const r = limiter(Math.tan(2*Math.PI*i))
  // const g = limiter(fourier(2, Math.PI / 2, i/100, odds, squareWaveSequenceCos))
  // const b = limiter(fourier(2, Math.PI / 3, i/100, odds, squareWaveSequenceSin))

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

  resize(width, height) {
    const { svg, props } = this

    svg.attr('width', width)
      .attr('height', height)

    props.width = width
    props.height = height
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

    const values = Array.from({ length: 300 }, (_, i) => [i + value])

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
    const { svg, props: { width, height } } = this

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
