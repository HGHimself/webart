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
    const { xMultiplier, xAmplitude, frequency, offset, amplitudeMultiplier } =
      this.props;
    return (d, i) =>
      simpleHarmonicMotionCos(
        0,
        xAmplitude * amplitudeMultiplier,
        xMultiplier * (1 / frequency) * Math.PI,
        i - offset / 10
      );
  }

  getCircleDrawerY() {
    const { yMultiplier, yAmplitude, frequency, offset, amplitudeMultiplier } =
      this.props;
    return (d, i) =>
      simpleHarmonicMotionSin(
        0,
        yAmplitude * amplitudeMultiplier,
        yMultiplier * (1 / frequency) * Math.PI,
        i - offset / 10
      );
  }

  getRadius() {
    const { rMultiplier, rAmplitude, rOrigin } = this.props;
    return (_, i) =>
      simpleHarmonicMotionSin(rOrigin, rAmplitude, rMultiplier * Math.PI, i);
  }

  getColor() {
    const { colorMultiplier, colorOffset } = this.props;

    return !colorMultiplier
      ? "black"
      : (_, i) => getSpectrumPosition(colorOffset + i * colorMultiplier);
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
}

export default colorPlot;
