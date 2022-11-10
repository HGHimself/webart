// save in vectors/vector.js
import { select } from "d3-selection";
import { line, curveBasisOpen } from "d3-shape";
import {
  fourier,
  squareWaveSequenceSin,
  squareWaveSequenceCos,
} from "../utils/maths-tools.js";
import { getSpectrumPosition } from "../utils/color-tools.js";

class Vector {
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
      props.width = width;
      props.height = this.props.originalHeight;
      props.amplitudeMultiplier = 1;
    }

    svg.attr("width", props.width).attr("height", props.height);

    this.update();
  }

  setOptions(options) {
    this.props = options;
    this.calculateProps();
    this.update();
  }

  getDrawer(batch) {
    const {
      count,
      numbers,
      xAmplitude,
      yAmplitude,
      amplitudeMultiplier,
      period,
      offset,
      xMultiplier,
      yMultiplier,
    } = this.props;

    const squarewaveTransformX = (time) =>
      fourier(
        xAmplitude * amplitudeMultiplier,
        2 * Math.PI * period,
        time,
        numbers,
        squareWaveSequenceSin
      );
    const squarewaveTransformY = (time) =>
      fourier(
        yAmplitude * amplitudeMultiplier,
        2 * Math.PI * period,
        time,
        numbers,
        squareWaveSequenceCos
      );

    const arc = Array.from({ length: 4 }, (_, i) => [
      squarewaveTransformX(314 * xMultiplier * (i + batch + offset)),
      squarewaveTransformY(314 * yMultiplier * (i + batch + offset)),
    ]);

    return !this.props.curve ? line().curve(curveBasisOpen)(arc) : line()(arc);
  }

  // (d) =>
  // !color
  //   ? "black"
  //   : getSpectrumPosition(color + d / (count * 2.4))

  getColor(d) {
    const {
      props: { color, count },
    } = this;

    return !color ? "black" : getSpectrumPosition(color + d / (count * 0.4));
  }

  calculateProps() {
    const { frequency, count } = this.props;
    this.props.period = frequency ? 1 / (frequency * 314.1) : frequency;
    this.props.data = Array.from({ length: count }, (_, i) => i);
    // this.props.data.push(0)
    console.log(this.props.data);
  }

  update() {
    const { count, width, height, color, thickness, data } = this.props;

    this.svg
      .selectAll("path.door")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "door")
            .attr("fill", "none")
            .attr("stroke", "black"),
        (update) =>
          update
            .attr("d", (d) => this.getDrawer(d))
            .attr("stroke-width", thickness)
            .attr("stroke", (d) => this.getColor(d))
            .attr("transform", `translate(${width / 2},${height / 2})`)
      );

    !this.props.hideProps &&
      this.svg
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

  getSvg() {
    const { svg } = this;
    return svg;
  }
}

export default Vector;
