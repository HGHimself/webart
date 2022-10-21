import { select } from "d3-selection";
import { line } from "d3-shape";

import {
  simpleHarmonicMotionSin,
  simpleHarmonicMotionCos,
} from "../utils/maths-tools.js";

class HarmonicMotion {
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

  getSinwave() {
    const {
      count,
      amplitude,
      omega,
      offset,
      originYLine,
      originXLine,
      amplitudeMultiplier,
    } = this.props;

    const arc = Array.from({ length: count }, (_, i) => [
      originXLine + i,
      simpleHarmonicMotionSin(
        originYLine,
        amplitudeMultiplier * amplitude,
        omega,
        (i - offset) * -1
      ),
    ]);

    return line()(arc);
  }

  getSinwaveDrawer() {
    const {
      amplitude,
      omega,
      offset,
      originXCircles,
      originYCircles,
      originYLine,
      originXLine,
      amplitudeMultiplier,
    } = this.props;

    const arc = [[originXCircles, originYCircles]];

    arc.push([
      simpleHarmonicMotionCos(
        originXCircles,
        amplitude * amplitudeMultiplier,
        omega,
        offset
      ),
      simpleHarmonicMotionSin(
        originYCircles,
        amplitude * amplitudeMultiplier,
        omega,
        offset
      ),
    ]);

    arc.push([
      originXLine,
      simpleHarmonicMotionSin(
        originYLine,
        amplitude * amplitudeMultiplier,
        omega,
        offset
      ),
    ]);

    return line()(arc);
  }

  update() {
    const {
      svg,
      props: {
        amplitude,
        originYCircles,
        originXCircles,
        amplitudeMultiplier,
        frequency,
        height,
        width,
        strokeWidth,
      },
    } = this;

    const originY = height / 2;

    this.props.period = frequency;

    // never more than 150 :)
    this.props.count = 150 * (1 - 1 / frequency);
    this.props.omega = 2 * Math.PI * (1 / frequency);

    this.props.originXCircles = amplitudeMultiplier * amplitude;
    this.props.originYCircles = originY;

    this.props.originXLine = amplitude * amplitudeMultiplier * 2;
    this.props.originYLine = originY;

    const getRadius = () => amplitudeMultiplier * amplitude;

    svg
      .selectAll("circle")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("fill", "none")
            .attr("stroke", "currentColor"),
        (update) =>
          update
            .attr("cy", originYCircles)
            .attr("cx", originXCircles)
            .attr("r", getRadius)
            .attr("stroke-width", strokeWidth)
      );

    this.svg
      .selectAll("path.circles")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "circles")
            .attr("fill", "none")
            .attr("stroke", "currentColor"),
        (update) =>
          update
            .attr("d", this.getSinwaveDrawer())
            .attr("stroke-width", strokeWidth)
      );

    this.svg
      .selectAll("path.lines")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "lines")
            .attr("fill", "none")
            .attr("stroke", "currentColor"),
        (update) =>
          update.attr("d", this.getSinwave()).attr("stroke-width", strokeWidth)
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

  setOptions(props) {
    this.props = props;
    this.update();
  }
}

export default HarmonicMotion;
