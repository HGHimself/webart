import { select } from "d3-selection";
import { line } from "d3-shape";

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
    this.calculateProps();

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, height) {
    const { svg, props } = this;

    if (width < 600) {
      props.amplitudeMultiplier = 0.7;
    } else {
      props.height = height;
      props.amplitudeMultiplier = 1;
    }

    props.width = height;
    props.height = height;
    svg.attr("width", props.width).attr("height", props.height);

    this.update();
  }

  setOptions(props) {
    this.props = props;
    this.calculateProps();
    this.update();
  }

  getDrawer(batch) {
    const {
      xAmplitude,
      yAmplitude,
      offset,
      period,
      xMultiplier,
      yMultiplier,
      amplitudeMultiplier,
    } = this.props;

    const arc = Array.from({ length: 1 + 1 }, (_, i) => [
      simpleHarmonicMotionSin(
        0,
        xAmplitude * amplitudeMultiplier,
        xMultiplier * period,
        i + batch - offset
      ),
      simpleHarmonicMotionCos(
        0,
        yAmplitude * amplitudeMultiplier,
        yMultiplier * period,
        i + batch - offset
      ),
    ]);

    return line()(arc);
  }

  getColor(d) {
    const {
      props: { color, count },
    } = this;

    return !color
      ? "currentColor"
      : getSpectrumPosition(color + d / (count * 0.4));
  }

  calculateProps() {
    const {
      props: { count, frequency },
    } = this;
    this.props.period = frequency ? 1 / frequency : frequency;
    this.props.data = Array.from({ length: count }, (_, i) => i);
  }

  update() {
    const {
      svg,
      props: { width, height, thickness, data },
    } = this;

    const centerX = width / 2;
    const centerY = height / 2;

    this.svg
      .selectAll("path")
      .data(data)
      .join(
        (enter) => enter.append("path").attr("fill", "none"),
        (update) =>
          update
            .attr("stroke-width", thickness)
            .attr("d", (d) => this.getDrawer(d))
            .attr("stroke", (d) => this.getColor(d))
            .attr("transform", `translate(${centerX},${centerY})`)
      );
    !this.props.hideProps &&
      svg
        .selectAll("text.details")
        .data(
          Object.keys(this.props)
            .filter((key) => key != "data")
            .map((key) => `${key}: ${this.props[key]}`)
        )
        .join(
          (enter) =>
            enter
              .append("text")
              .attr("class", "details")
              .attr("fill", "currentColor"),
          (update) =>
            update
              .attr("x", 0)
              .attr("y", (_, i) => (width > 400 ? 10 : 6) * (i + 1))
              .attr("font-size", width > 400 ? 12 : 8)
              // .attr("text-anchor", "end")
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
