import { select } from "d3-selection";
import { line } from "d3-shape";

import {
  fourier,
  squareWaveCos,
  squareWaveSequenceSin,
  squareWaveSequenceCos,
} from "../utils/maths-tools.js";

class Fourier {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;
    this.props.amplitudeMultiplier = 1;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, _height) {
    const { svg, props } = this;

    if (width < 670) {
      props.width = width * 0.6;
      props.height = width * 0.6;
      props.amplitudeMultiplier = 0.6;
    } else if (width >= 720) {
      props.width = 720;
      props.height = 500;
      props.amplitudeMultiplier = 1;
    } else {
      props.width = width;
      props.height = 500;
    }

    svg.attr("width", props.width).attr("height", props.height);

    this.update();
  }

  getSquarewave() {
    const {
      count,
      amplitude,
      omega,
      offset,
      numbers,
      originYLine,
      originXLine,
      amplitudeMultiplier,
    } = this.props;

    const squarewaveTransform = (time) =>
      fourier(
        amplitudeMultiplier * amplitude,
        omega,
        time,
        numbers,
        squareWaveSequenceSin
      );

    const arc = Array.from({ length: count }, (_, i) => [
      originXLine + i,
      originYLine + squarewaveTransform(-i + offset),
    ]);

    return line()(arc);
  }

  getSquarewaveDrawer(count) {
    const {
      amplitude,
      omega,
      offset,
      numbers,
      originXCircles,
      originYCircles,
      originYLine,
      originXLine,
      amplitudeMultiplier,
    } = this.props;

    const squarewaveTransformSin = (t, alpha) =>
      fourier(
        amplitudeMultiplier * amplitude,
        omega,
        t,
        numbers,
        (omega, time, arr) => {
          return squareWaveSequenceSin(omega, time, arr.slice(0, alpha));
        }
      );
    const squarewaveTransformCos = (t, alpha) =>
      fourier(
        amplitudeMultiplier * amplitude,
        omega,
        t,
        numbers,
        (omega, time, arr) => {
          return squareWaveSequenceCos(omega, time, arr.slice(0, alpha));
        }
      );

    const arc = Array.from({ length: count + 1 }, (_, i) => [
      originXCircles + squarewaveTransformCos(offset, i),
      originYCircles + squarewaveTransformSin(offset, i),
    ]);

    arc.push([
      originXLine,
      originYLine + squarewaveTransformSin(offset, count),
    ]);

    return line()(arc);
  }

  getCircleDrawerY() {
    const {
      amplitude,
      omega,
      offset,
      numbers,
      originYCircles,
      amplitudeMultiplier,
    } = this.props;

    const squarewaveTransformSin = (t, alpha) =>
      fourier(
        amplitudeMultiplier * amplitude,
        omega,
        t,
        numbers,
        (omega, time, arr) => {
          return squareWaveSequenceSin(omega, time, arr.slice(0, alpha));
        }
      );

    return (d, i) => originYCircles + squarewaveTransformSin(offset, i);
  }

  getCircleDrawerX() {
    const {
      amplitude,
      omega,
      offset,
      numbers,
      originXCircles,
      amplitudeMultiplier,
    } = this.props;

    const squarewaveTransformCos = (t, alpha) =>
      fourier(
        amplitudeMultiplier * amplitude,
        omega,
        t,
        numbers,
        (omega, time, arr) => {
          return squareWaveSequenceCos(omega, time, arr.slice(0, alpha));
        }
      );

    return (d, i) => originXCircles + squarewaveTransformCos(offset, i);
  }

  update() {
    const {
      svg,
      props: { amplitude, numbers, amplitudeMultiplier, frequency, thickness, width },
    } = this;

    const originY = this.props.height / 2;

    this.props.originXCircles =
      this.props.amplitudeMultiplier * this.props.amplitude * 0.7;
    this.props.originYCircles = originY;
    this.props.originXLine =
      this.props.amplitudeMultiplier * this.props.amplitude * 1.4;
    this.props.originYLine = originY;
    this.props.omega = 2 * Math.PI * (1 / frequency);

    const squarewave = this.getSquarewave();
    const getCirclesX = this.getCircleDrawerX();
    const getCirclesY = this.getCircleDrawerY();
    const getRadius = (d) =>
      amplitudeMultiplier * amplitude * squareWaveCos(1, 0, d);

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
            .attr("d", this.getSquarewaveDrawer(numbers.length))
            .attr("stroke-width", thickness)
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
        (update) => update.attr("d", squarewave).attr("stroke-width", thickness)
      );

    svg
      .selectAll("circle")
      .data(numbers)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("fill", "none")
            .attr("stroke", "currentColor"),
        (update) =>
          update
            .attr("cy", getCirclesY)
            .attr("cx", getCirclesX)
            .attr("r", getRadius)
            .attr("stroke-width", thickness)
      );

    !this.props.hideProps &&
      svg
        .selectAll("text.details")
        .data(
          Object.keys(this.props).map((key) => `${key}: ${this.props[key]}`)
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

  setOptions(props) {
    this.props = props;
    this.update();
  }
}

export default Fourier;
