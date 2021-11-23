import * as d3 from "d3"

class Vector {
  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height } = props

    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    this.svg.selectAll('path.lines')
      .data([0])
      .enter()
        .append("path")
        .attr("class", "lines")
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-width", "0.5")

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

  getDrawer() {
    const { count, amplitude, offset, multiplierX, multiplierY, width, height } = this.props

    const originX = (width/2)
    const originY = (height/2)

    const arc = Array.from({ length: count }, (_, i) => [
      originX + (amplitude * Math.sin(multiplierX * (i - offset))),
      originY + (amplitude * Math.cos(multiplierY * (i - offset)))
    ])

    return d3.line()(arc)
  }

  setOffset(offset) {
    this.props.offset = offset
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

  update() {
    const { svg } = this
    const drawer = this.getDrawer()
    this.svg.selectAll('path.lines').attr("d", drawer)
  }
}

export default Vector
