// save in vectors/vector.js
import { select } from "d3-selection";
import { line, curveBasisClosed } from "d3-shape";
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

    this.classes = ["left", "right"];

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

  getDrawerBottomPart(batch) {
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

    const arc = Array.from({ length: count }, (_, i) => [
      squarewaveTransformX(xMultiplier * (i + batch + offset)),
      squarewaveTransformY(yMultiplier * (i + batch + offset)),
    ]);

    return !this.props.curve
      ? line().curve(curveBasisClosed)(arc)
      : line()(arc);
  }

  calculateProps() {
    const { frequency, count } = this.props;
    this.props.period = 1 / frequency;
    this.props.data = Array.from({ length: count }, (_, i) => i);
  }

  update() {
    const { count, width, height, widthPercentage, color, thickness, data } =
      this.props;

    this.svg
      .selectAll("g.left")
      .data([width])
      .join(
        (enter) =>
          enter
            .append("g")
            .attr("class", "left")
            .attr("transform", `translate(0,0) scale(1,1)`),
        (update) =>
          update
            .attr("width", (width / 2) * widthPercentage)
            .attr("height", height)
            .attr(
              "transform",
              `translate(${(width - width * widthPercentage) / 2},0) scale(1,1)`
            )
      );

    this.svg
      .selectAll("g.right")
      .data([width])
      .join(
        (enter) => enter.append("g").attr("class", "right"),
        (update) =>
          update
            .attr("width", (width / 2) * widthPercentage)
            .attr("height", height)
            .attr(
              "transform",
              `translate(${
                width * widthPercentage + (width - width * widthPercentage) / 2
              },0) scale(-1,1)`
            )
      );

    const box = [
      [0, 0],
      [(width * widthPercentage) / 2, 0],
      [(width * widthPercentage) / 2, height],
      [0, height],
      [0, 0],
    ];

    // the outline
    this.svg
      .select(`g.left`)
      .selectAll("g")
      .data([0])
      .join((enter) => enter.append("g"))
      .selectAll("path.outline")
      .data([width])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "outline")
            .attr("stroke-width", "2")
            .attr("fill", "none")
            .attr("transform", `translate(0,0)`)
            .attr("stroke", "currentColor"),
        (update) =>
          update
            .attr("d", line()(box))
            .attr("fill", (d) =>
              !this.props.color
                ? "none"
                : getSpectrumPosition(
                    this.props.color + d / (this.props.count * 2.4),
                    0.3
                  )
            )
      );

    this.svg
      .select(`g.right`)
      .selectAll("g")
      .data([0])
      .join((enter) => enter.append("g"))
      .selectAll("path.outline")
      .data([width])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "outline")
            .attr("stroke-width", "2")
            .attr("fill", "none")
            .attr("transform", `translate(0,0)`)
            .attr("stroke", "currentColor"),
        (update) =>
          update
            .attr("d", line()(box))
            .attr("fill", (d) =>
              !color
                ? "none"
                : getSpectrumPosition(color + d / (count * 2.4), 0.3)
            )
      );

    this.svg
      .select(`g.left`)
      .selectAll("path.door")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "door")
            .attr("fill", "none")
            .attr("stroke", "currentColor"),
        (update) =>
          update
            .attr("d", (d) => this.getDrawerBottomPart(d))
            .attr("stroke-width", thickness)
            .attr("fill", (d) =>
              !color
                ? "none"
                : getSpectrumPosition(color + d / (count * 2.4), 0.3)
            )
            .attr(
              "transform",
              `translate(${width * widthPercentage * 0.25},${height / 2})`
            )
      );

    this.svg
      .select(`g.right`)
      .selectAll("path.door")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "door")
            .attr("fill", "none")
            .attr("stroke", "currentColor"),
        (update) =>
          update
            .attr("d", (d) => this.getDrawerBottomPart(d))
            .attr("stroke-width", thickness)
            .attr("fill", (d) =>
              !color
                ? "none"
                : getSpectrumPosition(color + d / (count * 2.4), 0.3)
            )
            .attr(
              "transform",
              `translate(${width * widthPercentage * 0.25},${height / 2})`
            )
      );

    !this.props.hideProps &&
      this.svg
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

export default Vector;
