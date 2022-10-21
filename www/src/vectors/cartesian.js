import { select } from "d3-selection";
import { line, curveBasis } from "d3-shape";

import {
  simpleHarmonicMotionCos,
  simpleHarmonicMotionSin,
} from "../utils/maths-tools.js";
import { getSpectrumPosition } from "../utils/color-tools.js";

class Cartesian {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;

    this.props.originalHeight = height;
    this.props.amplitudeMultiplier = 1;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, _height) {
    const { svg, props } = this;

    if (width < 600) {
      props.width = Math.floor(width * 0.6);
      props.height = Math.floor(width * 0.6);
      props.amplitudeMultiplier = 0.4;
    } else {
      props.width = width;
      props.height = this.props.originalHeight;
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
      props: { count, width, height, strokeWidth },
    } = this;

    const data = Array.from({ length: count }, (_, i) => i);

    const centerX = width / 2;
    const centerY = height / 2;

    this.svg
      .selectAll("path")
      .data(data)
      .join(
        (enter) => enter.append("path").attr("fill", "none"),
        (update) =>
          update
            .attr("stroke-width", strokeWidth)
            .attr("d", (d) => this.getDrawer(d))
            .attr("stroke", (d) => this.getColor(d))
            .attr("transform", `translate(${centerX},${centerY})`)
      );
    !this.props.hideProps &&
      svg
        .selectAll("text.details")
        .data(
          Object.keys(this.props).map((key) => `${key}: ${this.props[key]}`)
        )
        .join(
          (enter) => enter.append("text").attr("class", "details"),
          (update) =>
            update
              .attr("x", width - 8)
              .attr("y", (_, i) => (width > 400 ? 10 : 6) * (i + 1))
              .attr("font-size", width > 400 ? 12 : 8)
              .attr("text-anchor", "end")
              .text((d) => d),
          (exit) => exit
        );
  }

  getSvg() {
    const { svg } = this;
    return svg;
  }
}

export default Cartesian;
