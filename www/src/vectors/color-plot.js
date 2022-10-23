import { select } from "d3-selection";

import {
  simpleHarmonicMotionCos,
  simpleHarmonicMotionSin,
} from "../utils/maths-tools.js";
import { getSpectrumPosition } from "../utils/color-tools.js";

class colorPlot {
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

  resize(width, _height) {
    const { svg, props } = this;

    if (width < 600) {
      props.width = Math.floor(width * 0.6);
      props.height = Math.floor(width * 0.6);
      props.amplitudeMultiplier = 0.4;
    } else {
      props.width = 500;
      props.height = this.props.originalHeight;
      props.amplitudeMultiplier = 1;
    }

    svg.attr("width", props.width).attr("height", props.height);

    this.update();
  }

  getCircleDrawerX() {
    const { xMultiplier, xAmplitude, period, offset, amplitudeMultiplier } =
      this.props;
    return (d, i) =>
      simpleHarmonicMotionCos(
        0,
        xAmplitude * amplitudeMultiplier,
        xMultiplier * period * Math.PI,
        i - offset / 10
      );
  }

  getCircleDrawerY() {
    const { yMultiplier, yAmplitude, period, offset, amplitudeMultiplier } =
      this.props;
    return (d, i) =>
      simpleHarmonicMotionSin(
        0,
        yAmplitude * amplitudeMultiplier,
        yMultiplier * period * Math.PI,
        i - offset / 10
      );
  }

  getRadius() {
    const { rMultiplier, rAmplitude, rOffset } = this.props;
    return (_, i) =>
      simpleHarmonicMotionSin(rOffset, rAmplitude, rMultiplier * Math.PI, i);
  }

  getColor() {
    const { colorMultiplier, colorOffset } = this.props;

    return !colorMultiplier
      ? "black"
      : (_, i) => getSpectrumPosition(colorOffset + i * colorMultiplier);
  }

  setOptions(props) {
    this.props = props;
    this.calculateProps();
    this.update();
  }

  calculateProps() {
    const {
      props: { count, frequency },
    } = this;
    this.props.period = frequency ? 1 / frequency : frequency;
    this.props.data = Array.from({ length: count }, (_, i) => [i]);
  }

  update() {
    const {
      svg,
      props: { height, width, thickness, data },
    } = this;

    const xCenter = width / 2;
    const yCenter = height / 2;

    svg
      .selectAll("circle")
      .data(data)
      .join(
        (enter) => enter.append("circle").attr("fill", "none"),
        (update) =>
          update
            .attr("cy", this.getCircleDrawerY())
            .attr("cx", this.getCircleDrawerX())
            .attr("r", this.getRadius())
            .attr("stroke", this.getColor())
            .attr("stroke-width", thickness)
            .attr("transform", `translate(${xCenter},${yCenter})`)
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
              .attr("x", width - 8)
              .attr("y", (_, i) => (width > 400 ? 10 : 6) * (i + 1))
              .attr("font-size", width > 400 ? 12 : 8)
              .attr("text-anchor", "end")
              .text((d) => d),
          (exit) => exit
        );
  }
}

export default colorPlot;
