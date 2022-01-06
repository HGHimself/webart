import * as d3 from "d3"

import theme from "../theme"
import { simpleHarmonicMotionCos, simpleHarmonicMotionSin } from "../utils/maths-tools.js"
import { getSpectrumPosition } from "../utils/color-tools.js"

class Music {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height, data } = props

    // give us a canvas to draw on
    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    // bring in circles
    this.svg.selectAll('circle')
      .data(data)
      .enter()
        .append("circle")
        .attr("fill", "none")
        .attr("stroke-width", "1")
    // draw with the cirlces
    this.update()
  }

  resize(width, height) {
    const { svg, props } = this

    props.width = width
    props.height = width * 0.4 > 300 ? 600 : 300
    props.amplitude = width * 0.4 > 300 ? 300 : width * 0.4

    svg.attr('width', props.width)
      .attr('height', props.height)

    this.update()
  }

  setData(data) {
    const { svg, props } = this
    this.props.data = data

    svg.selectAll('circle')
      .data(data)
      .join(
        enter => enter
          .append("circle")
          .attr("fill", 'none')
          .attr("stroke", theme.colors.black)
          .attr("stroke-width", "0.5"),
      )
    this.update()
  }

  update() {
    const { svg, props: { width, data } } = this
    console.log((data.length / width));
    svg.selectAll('circle')
      .attr("cy", d =>  1.3 * d)
      .attr("cx", (d, i) => (width / (2 * data.length)) + (i / data.length) * width)
      .attr("r", width / (2 * data.length))
      .attr("fill", (d, i) => getSpectrumPosition(i * 0.09))
  }

  getSvg() {
    const { svg } = this
    return svg
  }
}

export default Music
