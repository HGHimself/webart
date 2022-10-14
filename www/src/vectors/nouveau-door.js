// save in vectors/vector.js
import { select } from "d3-selection";
import { line, curveMonotoneX, curveBasisClosed } from "d3-shape";
import { fourier, squareWaveSequenceSin } from "../utils/maths-tools.js";
import theme from "../theme";
import { getSpectrumPosition } from "../utils/color-tools.js";

class Vector {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;
    this.props.period = this.props.frequency;
    this.props.omega = 2 * Math.PI * (1 / this.props.frequency);

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width * 3)
      .attr("height", height * 1.1);
    this.svg
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "left")
      .attr("transform", `translate(${width * 0.5},100) scale(1,1)`);
    this.svg
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "right")
      .attr("transform", `translate(${width * 2.5},100) scale(-1,1)`);

    this.classes = ["left", "right"];

    const h = height;

    const pad = 0;
    const box = [
      [pad, 0],
      [width - 0, pad],
      [width - pad, h - 0],
      [0, h - pad],
      [pad, 0],
      [0, pad],
      [width - pad, 0],
      [width - 0, h - pad],
      [pad, h - 0],
      [0, pad],
    ];

    this.classes.forEach((c) => {
      // the background box

      // this.svg
      //   .select(`g.${c}`)
      //   .append("g")
      //   .append("path")
      //   .attr("class", "outline")
      //   .attr("d", line().curve(curveMonotoneX)(box))
      //   .attr("stroke-width", "4")
      //   .attr("transform", `translate(0,-45)`)
      //   .attr("fill", getSpectrumPosition(this.props.spectrum))

      // the outline
      this.svg
        .select(`g.${c}`)
        .append("g")
        .append("path")
        .attr("class", "outline1")
        .attr("d", line().curve(curveMonotoneX)(box))
        .attr("stroke-width", "2")
        .attr("fill", "none")
        .attr("transform", `translate(0,-45)`)
        .attr("stroke", theme.colors.black);
    });

    this.update();
  }

  resize(width, height) {
    // const { svg, props } = this
    //
    // props.width = width
    // props.height = height
    //
    // svg.attr('width', props.width).attr('height', props.height)
    //
    // this.update()
  }

  setOptions(options) {
    this.props = options;
    this.props.period = this.props.frequency;
    this.props.omega = 2 * Math.PI * (1 / this.props.frequency);
    this.update();
  }

  getDrawerBottomPart(batch) {
    const {
      count,
      numbers,
      amplitudeX,
      amplitudeY,
      omega,
      offset,
      multiplierX,
      multiplierY,
    } = this.props;

    const squarewaveTransformX = (time) =>
      fourier(amplitudeX, omega, time, numbers, squareWaveSequenceSin);
    const squarewaveTransformY = (time) =>
      fourier(2 * amplitudeY, omega, time, numbers, squareWaveSequenceSin);

    const arc = Array.from({ length: count }, (_, i) => [
      squarewaveTransformX(multiplierX * (i + batch - offset)),
      squarewaveTransformY(multiplierY * (i + batch + offset)),
    ]);

    return !this.props.curve
      ? line().curve(curveBasisClosed)(arc)
      : line()(arc);
  }

  getDrawerTopPart(batch) {
    const {
      count,
      numbers,
      amplitudeX,
      amplitudeY,
      omega,
      offset,
      multiplierX,
      multiplierY,
    } = this.props;

    const squarewaveTransformX = (time) =>
      fourier(amplitudeX, 1 - omega, time, numbers, squareWaveSequenceSin);
    const squarewaveTransformY = (time) =>
      fourier(amplitudeY, 1 - omega, time, numbers, squareWaveSequenceSin);

    const arc = Array.from({ length: count }, (_, i) => [
      squarewaveTransformX(multiplierY * (i + batch - offset)),
      squarewaveTransformY(multiplierX * (i + batch + offset)),
    ]);

    return !this.props.curve
      ? line().curve(curveBasisClosed)(arc)
      : line()(arc);
  }

  update() {
    const {
      props: { count, width, height },
    } = this;

    const data = Array.from({ length: count }, (_, i) => i);

    this.classes.forEach((c) => {
      this.svg
        .select(`g.${c}`)
        .selectAll("path.door")
        .data(data)
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("class", "door")
              .attr("fill", "none")
              .attr("stroke-width", "2")
              .attr("d", (d) => this.getDrawerBottomPart(d))
              .attr("transform", `translate(${width / 2},${height / 1.7})`)
              .attr("stroke", theme.colors.black),
          (update) =>
            update
              .attr("d", (d) => this.getDrawerBottomPart(d))
              .attr("fill", (d) =>
                !this.props.spectrum
                  ? "none"
                  : getSpectrumPosition(
                      this.props.spectrum + d / (this.props.count * 2.4),
                      0.3
                    )
              )
        );

      this.svg
        .select(`g.${c}`)
        .selectAll("path.door-top")
        .data(data)
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("class", "door-top")
              .attr("fill", "none")
              .attr("stroke-width", "2")
              .attr("d", (d) => this.getDrawerTopPart(d))
              .attr(
                "transform",
                `translate(${width / 2},${height / 8}) scale(1,-1)`
              )
              .attr("stroke", theme.colors.black),
          (update) =>
            update
              .attr("d", (d) => this.getDrawerTopPart(d))
              .attr("fill", (d) =>
                !this.props.spectrum
                  ? "none"
                  : getSpectrumPosition(
                      this.props.spectrum + d / (this.props.count * 2.4),
                      0.3
                    )
              )
        );
    });

    !this.props.hideProps &&
      this.svg
        .selectAll("text.details")
        .data(
          Object.keys(this.props).map((key) => `${key}: ${this.props[key]}`)
        )
        .join(
          (enter) =>
            enter
              .append("text")
              .attr("class", "details")
              .attr("x", 10)
              .attr("y", (_, i) => 10 * (i + 1))
              .attr("font-size", 12)
              .text((d) => d),
          (update) => update.text((d) => d),
          (exit) => exit
        );
  }

  getSvg() {
    const { svg } = this;
    return svg;
  }
}

export default Vector;
