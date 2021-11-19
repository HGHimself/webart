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

    this.update()
  }

  resize(width, height) {
    const { svg, props } = this

    svg.attr('width', width)
      .attr('height', height)

    props.width = width
    props.height = height
    props.amplitude = width * 0.4 > 300 ? 300 : width * 0.4

    this.setOffset(this.props.offset)
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
    const { svg } = this
    this.props.offset = offset

    const drawer = this.getDrawer()

    svg.selectAll('path.lines')
        .attr("d", drawer)
  }

  setMultiplierX(multiplierX) {
    this.props.multiplierX = multiplierX
  }

  setMultiplierY(multiplierY) {
    this.props.multiplierY = multiplierY
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
        .attr("stroke", "#000000")
        .attr("stroke-width", "0.5")
  }
}

export default Vector
