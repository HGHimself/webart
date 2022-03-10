// save in vectors/vector.js
import * as d3 from "d3"
import { degreesToRadians, polarToCartesian, fourier, squareWaveCos, squareWaveSin, squareWaveSequenceSin, squareWaveSequenceCos, distance } from "../utils/maths-tools.js"

class Vector {
  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height } = props

    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    this.svg.selectAll('path.lines') // you can draw other paths if you use classes
      .data([0])
      .enter()
        .append("path")
        .attr("class", "lines") // classes help you be specific and add more drawings
        .attr("fill", "white")
        .attr("stroke", "#000000")
        .attr("stroke-width", "1")

    this.update()
  }

  resize(width, height) {
    // const { svg, props } = this
    //
    // svg.attr('width', width)
    //   .attr('height', height)
    //
    // props.width = width
    // props.height = height
  }

  getDrawer() {
    const { count, numbers, amplitude, omega, offset, multiplierX, multiplierY, width, height } = this.props

    const originX = (width/2)
    const originY = (height/2)

    const squarewaveTransform = (time) => fourier(amplitude, omega, time, numbers, squareWaveSequenceSin)

    const arc = Array.from({ length: count }, (_, i) => [
      originX + squarewaveTransform(multiplierX * (i - offset)),
      originY + squarewaveTransform(multiplierY * (i + offset))
    ])

    return d3.line().curve(d3['curveBasisClosed'])(arc)
  }

  update() {
    const { svg } = this
    const drawer = this.getDrawer()
    this.svg.selectAll('path.lines').attr("d", drawer)
  }
}

export default Vector
