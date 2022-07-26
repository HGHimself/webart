import { select } from "d3-selection";
import { line } from "d3-shape";
import {
  simpleHarmonicMotionCos,
  simpleHarmonicMotionSin,
} from "../utils/maths-tools.js";

import {
  fourier,
  squareWaveSequenceSin,
  squareWaveSequenceCos,
} from "../utils/maths-tools.js";
import { getSpectrumPosition } from "../utils/color-tools.js";

// const getRgbSpectrumArray = (i) => {
//   const amplitude = 127;
//   const offset = 128;
//   const odds = [2, 4, 6, 8, 10];

//   const limiter = (x) => amplitude * x + 128;

//   const r = limiter(Math.tan(2*Math.PI*i))
//   const g = limiter(fourier(2, Math.PI / 2, i/100, odds, squareWaveSequenceCos))
//   const b = limiter(fourier(2, Math.PI / 3, i/100, odds, squareWaveSequenceSin))

//   return [r, g, b];
// };

// const getSpectrumPosition = (i) => {
//   const [r, g, b] = getRgbSpectrumArray(i);
//   return `rgb(${r}, ${g}, ${b})`;
// };

class colorPlot {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, height) {
    // const { svg, props } = this;
    // svg.attr("width", width).attr("height", height);
    // props.width = width;
    // props.height = height;
  }

  // rgb(96, 251, 160)

  getCircleDrawerX() {
    const { xMultiplier, xAmplitude, frequency } = this.props;
    return (d) =>
      simpleHarmonicMotionCos(
        0,
        xAmplitude,
        xMultiplier * (1 / frequency) * Math.PI,
        d
      );
  }

  getCircleDrawerY() {
    const { yMultiplier, yAmplitude, frequency } = this.props;
    return (d) =>
      simpleHarmonicMotionSin(
        0,
        yAmplitude,
        yMultiplier * (1 / frequency) * Math.PI,
        d
      );
  }

  getRadius() {
    const { rMultiplier, rAmplitude, rOrigin } = this.props;
    return (d) =>
      simpleHarmonicMotionSin(rOrigin, rAmplitude, rMultiplier * Math.PI, d);
  }

  getColor() {
    const { colorMultiplier, colorOffset } = this.props;
    return (d) => getSpectrumPosition(colorOffset + d * colorMultiplier);
  }

  setOptions(props) {
    this.props = props;
    this.update();
  }

  update() {
    const {
      svg,
      props: { height, width, count },
    } = this;

    const values = Array.from({ length: count }, (_, i) => [i]);

    const circles = svg.selectAll("circle").data(values);

    circles.exit().remove();
    circles
      .enter()
      .append("circle")
      .attr("cy", this.getCircleDrawerY())
      .attr("cx", this.getCircleDrawerX())
      .attr("r", this.getRadius())
      .attr("fill", "none")
      .attr("stroke", this.getColor())
      .attr("stroke-width", "1")
      .attr("transform", `translate(${width / 2},${height / 2})`);
    circles
      .attr("cy", this.getCircleDrawerY())
      .attr("cx", this.getCircleDrawerX())
      .attr("r", this.getRadius())
      .attr("stroke", this.getColor())
      .attr("transform", `translate(${width / 2},${height / 2})`);
  }
}

export default colorPlot;
