import * as d3 from "d3"
import * as d3Voronoi from "d3-voronoi"

import theme from "../theme"
import { simpleHarmonicMotionCos, simpleHarmonicMotionSin } from "../utils/maths-tools.js"
import { arrayTake } from "../utils/data-tools.js"

class Buildings {

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

  getArc(mult) {
    const { count, amplitude, frequency, multiplierX, multiplierY, diagonalRate } = this.props
    const origin = 0;
    return Array.from({ length: count }, (_, i) => [
      i * multiplierX, // x
      (mult * multiplierY) + ((i * diagonalRate) + simpleHarmonicMotionCos(origin, amplitude, frequency, i)) // y
    ])
  }

  getDrawerLine(mult) {
    const arc = this.getArc(mult)
    return d3.line()(arc)
  }

  getDrawerArea(mult) {
    const arc = this.getArc(mult)
    return d3.area()(arc)
  }

  getColor(i) {
    return this.props.colors[i]
  }

  update() {
    const { svg, props: { data, width, height, colors } } = this
    //
    // svg.selectAll('path.lines')
    //   .data(data)
    //   .join(
    //     enter => enter
    //       .append("path")
    //       .attr("d", d => this.getDrawerLine(d))
    //       .attr("fill", "none")
    //       .attr("stroke", theme.colors.black)
    //       .attr("stroke-width", "1"),
    //   )
    // svg.selectAll('path.areas')
    //   .data(data.reverse())
    //   .join(
    //     enter => enter
    //       .append("path")
    //       .attr("d", d => this.getDrawerArea(d))
    //       .attr("stroke", (d, i) => this.getColor(data.length - i - 1))
    //       .attr("fill", (d, i) => this.getColor(data.length - i - 1))
    //   )

    const c10 = d3.schemePaired;

    const vertices = [...this.getArc(0), ...this.getArc(1),  ...this.getArc(2), ]

    const voronoi = d3Voronoi.voronoi().extent([[0, 0], [width, height]]);

    // const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

    const path = svg.append("g").selectAll("path");

    path.data( voronoi.polygons(vertices)  ).enter().append("path")
        .attr("stroke","white")
        .attr("fill", function(d,i) {
          const c = arrayTake(colors, i)
          console.log({c, i});
          return c
        } )
      .attr("d", polygon);

    function polygon(d) {

      return d ? "M" + d.join("L") + "Z" : '';
    }

    svg.selectAll("circle").data(vertices).enter().append("circle").attr("r", 1)
       .attr("cx", function(d) { return d[0]; } )
       .attr("cy", function(d) { return d[1]; } );
  }
}

export default Buildings
