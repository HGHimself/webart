// save in vectors/vector.js
import { select } from "d3-selection";
import { line, curveBasisOpen } from "d3-shape";
import {
  fourier,
  squareWaveSequenceSin,
  squareWaveSequenceCos,
} from "../utils/maths-tools.js";
import { getSpectrumPosition } from "../utils/color-tools.js";
import { zip } from "../utils/data-tools.js";

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

  getGridX() {
    // const { width, height } = this.props;
    const gap = 150;
    const height = 500;
    const width = 760;

    const x = [gap, width];
    const y = [height - gap, height - gap];

    const arc = zip(x, y);
    return line()(arc);
  }

  getGridY() {
    // const { width, height } = this.props;
    const gap = 150;
    const height = 500;
    const width = 600;

    const x = [gap, gap];
    const y = [height - gap, 0];

    const arc = zip(x, y);
    return line()(arc);
  }

  getGridZ() {
    // const { width, height } = this.props;
    const gap = 200;
    const height = 500;
    const width = 600;

    const xBase = [-1 * gap, gap * -0.25];
    const x = xBase.map((x) => x + gap);
    const y = xBase
      .map((x) => -0.5 * (x + gap * -0.25))
      .map((y) => y + height - gap);

    const arc = zip(x, y);
    return line()(arc);
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

  getColor(d) {
    const {
      props: { color, count },
    } = this;

    return !color
      ? "currentColor"
      : getSpectrumPosition(color + d / (count * 0.4));
  }

  calculateProps() {
    const { frequency, count } = this.props;
    this.props.period = frequency ? 1 / (frequency * 314.1) : frequency;
    this.props.data = Array.from({ length: count }, (_, i) => i);
  }

  update() {
    const { count, width, height, color, thickness, data } = this.props;

    this.svg
      .selectAll("path.zaxis")
      .data([width])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "zaxis")
            .attr("fill", "none")
            .attr("stroke-width", "0.5")
            .attr("transform", `translate(0,0)`)
            .attr("stroke", "currentColor"),
        (update) => update.attr("d", this.getGridZ)
      );

    this.svg
      .selectAll("ellipse")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("ellipse")
            .attr("fill", "#010cac"),
        (update) =>
          update
            .attr("cy", height * 0.85)
            .attr("cx", width * 0.5)
            .attr("rx", width * 0.25)
            .attr("ry", width * 0.05)
      );

    this.svg
      .selectAll("path.door")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("fill", "none")
            .attr("class", "door")
            .attr("stroke", "currentColor"),
        (update) =>
          update
            .attr("d", (d) => this.getDrawer(d))
            .attr("stroke-width", thickness)
            .attr("stroke", (d) => this.getColor(d))
            .attr("transform", `translate(${width / 2},${height / 2})`)
      );

    this.svg
      .selectAll("path.xaxis")
      .data([width])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "xaxis")
            .attr("fill", "none")
            .attr("stroke-width", "0.5")
            .attr("transform", `translate(0,0)`)
            .attr("stroke", "currentColor"),
        (update) => update.attr("d", this.getGridX)
      );

    this.svg
      .selectAll("path.yaxis")
      .data([width])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "yaxis")
            .attr("fill", "none")
            .attr("stroke-width", "0.5")
            .attr("transform", `translate(0,0)`)
            .attr("stroke", "currentColor"),
        (update) => update.attr("d", this.getGridY)
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
