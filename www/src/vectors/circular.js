import { select } from "d3-selection";
import { line } from "d3-shape";

import theme from "../theme";
import {
  simpleHarmonicMotionCos,
  simpleHarmonicMotionSin,
} from "../utils/maths-tools.js";
import { getSpectrumPosition } from "../utils/color-tools.js";

class Circular {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height, count } = props;
    this.props.amplitudeMultiplier = 1;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, height) {
    const { svg, props } = this;

    if (width < 670) {
      props.width = width * 0.6;
      props.height = width * 0.6;
      props.amplitudeMultiplier = 0.4;
    } else {
      props.width = 500;
      props.height = 500;
      props.amplitudeMultiplier = 1;
    }

    svg.attr("width", props.width).attr("height", props.height);

    this.update();
  }

  setOptions(props) {
    this.props = props;
    this.update();
  }

  getDrawer(batch) {
    const {
      amplitudeX,
      amplitudeY,
      offset,
      frequency,
      multiplierX,
      multiplierY,
      width,
      height,
      amplitudeMultiplier,
    } = this.props;

    const arc = Array.from({ length: 1 + 1 }, (_, i) => [
      simpleHarmonicMotionSin(
        0,
        amplitudeX * amplitudeMultiplier,
        multiplierX * (1 / frequency),
        i + batch - offset
      ),
      simpleHarmonicMotionCos(
        0,
        amplitudeY * amplitudeMultiplier,
        multiplierY * (1 / frequency),
        i + batch - offset
      ),
    ]);

    return line()(arc);
  }

  getColor(d) {
    const {
      props: { spectrum, count },
    } = this;

    return !spectrum
      ? "black"
      : getSpectrumPosition(spectrum + d / (count * 0.4));
  }

  update() {
    const {
      svg,
      props: { count, width, height },
    } = this;

    const data = Array.from({ length: count }, (_, i) => i);
    const lines = this.svg.selectAll("path").data(data);

    lines.exit().remove();
    lines
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke-width", "1")
      .attr("d", (d) => this.getDrawer(d))
      .attr("stroke", (d) => this.getColor(d))
      .attr("transform", `translate(${width / 2},${height / 2})`);
    lines
      .attr("d", (d) => this.getDrawer(d))
      .attr("stroke", (d) => this.getColor(d))
      .attr("transform", `translate(${width / 2},${height / 2})`);
  }

  getSvg() {
    const { svg } = this;
    return svg;
  }
}

export default Circular;
