// save in vectors/vector.js
import * as d3 from "d3"
import { degreesToRadians, polarToCartesian, fourier, squareWaveCos, squareWaveSin, squareWaveSequenceSin, squareWaveSequenceCos, distance } from "../utils/maths-tools.js"
import theme from "../theme"
import { getSpectrumPosition } from "../utils/color-tools.js"

class Vector {
  constructor(containerEl, props) {
    this.containerEl = containerEl
    this.props = props
    const { width, height, count, background } = props

    const data = Array.from({ length: count }, (_, i) => i)

    const svgLeft = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append("g")
        .attr("filter", "url(#tint)")
    const svgRight = d3.select(containerEl)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', 'scale(-1,1)')
      .append("g")
        .attr("filter", "url(#tint)")


    this.svgs = [
      svgLeft,
      svgRight
    ]

    const pad = 6
    const box = [
      [pad,0],[width-0,pad],[width-pad,height-0],[0,height-pad],[pad,0],
      [0,pad],[width-pad,0],[width-0,height-pad],[pad,height-0],[0,pad]
    ]

    this.svgs.forEach(svg => {
      svg.append("g")
        .attr("class", "mesh")
        .attr("filter", "url(#pencil)")
        .append('path')
        .attr("d", d3.line().curve(d3['curveMonotoneX'])(box))
        .attr("stroke-width", "4")
        .attr("fill", "none")
        .attr("stroke", theme.colors.black)
      // svg.selectAll('ellipse')
      //   .data([0])
      //   .enter()
      //     .append("ellipse")
      //     .attr("rx", 100)
      //     .attr("ry", 200)
      //     .attr("cx", width / 2)
      //     .attr("cy", height / 2)
      //     .attr("fill", "#8b9b8a")
          // .attr("stroke-width", "3")
      svg.append("g")
        .attr("class", "mesh")
        .attr("filter", "url(#pencil)")
        .selectAll('path.door') // you can draw other paths if you use classes
        .data(data)
        .enter()
          .append("path")
            .attr("class", "door") // classes help you be specific and add more drawings
            .attr("fill", "none")
            .attr("stroke-width", "4")
            .attr("filter", "url(#splotch)")
    })

    this.update()
  }

  resize(width, height) {
    // console.log(width, height);
    // const { svgs, props } = this
    //
    // if (width < 440) {
    //   svgs.forEach(svg => {
    //     svg.attr('width', width / 2)
    //   })
    //
    //   props.width = width / 2
    //   props.amplitude = width / 2
    // } else {
    //   svgs.forEach(svg => {
    //     svg.attr('width', 220)
    //   })
    //
    //   props.width = 220
    //   props.amplitude = 200
    // }
    //
    // this.update()
  }

  setOptions(options) {
    this.props = options
    this.update()
  }

  getDrawer(batch) {
    const { count, numbers, amplitude, omega, offset, multiplierX, multiplierY, width, height } = this.props

    const originX = (width/2)
    const originY = (height/2)

    const squarewaveTransformX = (time) => fourier(amplitude, omega, time, numbers, squareWaveSequenceSin)
    const squarewaveTransformY = (time) => fourier(2 * amplitude, omega, time, numbers, squareWaveSequenceSin)

    const arc = Array.from({ length: count }, (_, i) => [
      originX + squarewaveTransformX(multiplierX * ((i + batch) - offset)),
      originY + squarewaveTransformY(multiplierY * ((i + batch) + offset))
    ])

    return d3.line().curve(d3['curveBasisClosed'])(arc)
  }

  update() {
    const { svgs } = this
    const drawer = this.getDrawer()

    svgs.forEach(svg => {
      svg.selectAll('path.door')
        .attr("d", d => this.getDrawer(d))
        .attr("stroke", theme.colors.black)
        .attr("fill", d => !this.props.spectrum
          ? "none"
          : getSpectrumPosition(this.props.spectrum + (d/(this.props.count * 0.4))))
    })
  }
}

export default Vector
