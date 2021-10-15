import * as d3 from "d3"

import theme from "../theme"
import { drawArc } from "../utils/svg-tools.js"
import { simpleHarmonicMotionCos, simpleHarmonicMotionSin } from "../utils/maths-tools.js"

class Shm {

  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height, amplitude } = props

    this.props.originX = (width / 2)
    this.props.originY = (height / 2)

    this.svg = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    this.update()
  }

  setMultiplierX(multiplierX) {
    this.props.multiplierX = multiplierX
  }

  setMultiplierY(multiplierY) {
    this.props.multiplierY = multiplierY
  }

  getDrawer() {
    const { count, amplitude, offset, frequency, multiplierX, multiplierY, originY, originX } = this.props

    //const xPos = (i) => originX + (i * 1)
    const xPos = (i) => simpleHarmonicMotionSin(originX, amplitude, multiplierX * frequency, i - offset)
    const yPos = (i) => simpleHarmonicMotionCos(originY, amplitude, multiplierY * frequency, i - offset)

    const arc = Array.from({ length: count }, (_, i) => [
      Math.round(xPos(i)),
      Math.round(yPos(i))
    ])

    return d3.line()(arc)
  }

  update() {
    const { svg } = this

    const drawer = this.getDrawer()
    svg.selectAll('path.lines')
      .data([0])
      .join(
        enter => enter
          .append("path")
          .attr("d", drawer)
          .attr("fill", "none")
          .attr("stroke", theme.colors.black)
          .attr("stroke-width", "1"),
        update => update
          .attr("d", drawer)
      )
  }

  setOffset(offset) {
    const { svg } = this
    this.props.offset = offset

    const drawer = this.getDrawer()

    svg.selectAll('path')
        .attr("d", drawer)
  }
}

export default Shm
