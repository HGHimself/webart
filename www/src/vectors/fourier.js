import { select } from "d3-selection";
import { line } from "d3-shape";

import theme from "../theme";
import { drawArc } from "../utils/svg-tools.js";
import {
  degreesToRadians,
  polarToCartesian,
  fourier,
  squareWaveCos,
  squareWaveSin,
  squareWaveSequenceSin,
  squareWaveSequenceCos,
  distance,
} from "../utils/maths-tools.js";

class Fourier {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height, period, amplitude, numbers } = props;
    this.props.amplitudeMultiplier = 1;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.svg
      .selectAll("circle")
      .data(numbers)
      .enter()
      .append("circle")
      .attr("fill", "none")
      .attr("stroke", theme.colors.black)
      .attr("stroke-width", "0.5");
    this.svg
      .selectAll("path.circles")
      .data([0])
      .enter()
      .append("path")
      .attr("class", "circles")
      .attr("fill", "none")
      .attr("stroke", theme.colors.black)
      .attr("stroke-width", "0.5");
    this.svg
      .selectAll("path.lines")
      .data([0])
      .enter()
      .append("path")
      .attr("class", "lines")
      .attr("fill", "none")
      .attr("stroke", theme.colors.black)
      .attr("stroke-width", "0.5");

    this.update();
  }

  resize(width, height) {
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

    const originY = props.height / 2;

    props.originXCircles = props.amplitudeMultiplier * props.amplitude * 0.7;
    props.originYCircles = originY;

    props.originXLine = props.amplitudeMultiplier * props.amplitude * 1.4;
    props.originYLine = originY;
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
      originYLine + squarewaveTransform(i + offset),
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
      props: {
        height,
        width,
        amplitude,
        omega,
        offset,
        numbers,
        amplitudeMultiplier,
      },
    } = this;

    const squarewave = this.getSquarewave();
    const getSquarewaveDrawer = this.getSquarewaveDrawer(numbers.length);
    const getCirclesX = this.getCircleDrawerX();
    const getCirclesY = this.getCircleDrawerY();
    const getRadius = (d) =>
      amplitudeMultiplier * amplitude * squareWaveCos(1, 0, d);

    svg
      .selectAll("circle")
      .data(numbers)
      .join(
        (enter) => enter,
        (update) =>
          update
            .attr("cy", getCirclesY)
            .attr("cx", getCirclesX)
            .attr("r", getRadius)
      );
    svg.selectAll("path.circles").attr("d", getSquarewaveDrawer);
    svg.selectAll("path.lines").attr("d", squarewave);
  }

  setOptions(props) {
    this.props = props;
    this.props.period = props.frequency;
    this.props.omega = 2 * Math.PI * (1 / props.frequency);
    this.props.count = (this.props.phase / props.frequency) * props.frequency;
    this.update();
  }
}

export default Fourier;
