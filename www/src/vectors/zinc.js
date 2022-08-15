// save in vectors/vector.js
import { select } from "d3-selection";
import { line, curveBasisClosed } from "d3-shape";
import { fourier, squareWaveSequenceSin } from "../utils/maths-tools.js";

class Zinc {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;

    this.svg = select("body")
      .insert("svg", ":first-child")
      .attr("width", width)
      .attr("height", height)
      .style("position", "absolute")
      .style("z-index", "-1")
      .style("background-color", "yellow")
      .style(
        "background-image",
        "radial-gradient(at 69% 86%, hsla(21,100%,76%,1) 0px, transparent 50%),radial-gradient(at 17% 29%, hsla(177,100%,61%,1) 0px, transparent 50%),radial-gradient(at 66% 11%, hsla(356,100%,79%,1) 0px, transparent 50%),radial-gradient(at 90% 14%, hsla(50,100%,74%,1) 0px, transparent 50%),radial-gradient(at 42% 66%, hsla(266,100%,68%,1) 0px, transparent 50%),radial-gradient(at 93% 82%, hsla(161,100%,73%,1) 0px, transparent 50%),radial-gradient(at 77% 48%, hsla(158,100%,70%,1) 0px, transparent 50%)"
      );

    this.svg.append("defs");

    this.svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("filter", "url(#noiseFilter)");

    this.update();
  }

  resize(width, height) {
    const { svg, props } = this;

    // if (width < 720) {
    //   props.width = width;
    //   props.amplitudeMultiplier = 0.4;
    // } else {
    //   props.width = 720;
    props.amplitudeMultiplier = 1;
    // }

    props.width = width;
    props.height = height;

    svg.attr("height", props.height).attr("width", props.width);
    this.svg.select("rect").attr("width", width).attr("height", height);
    this.update();
  }

  setOptions(options) {
    this.props = options;
    this.update();
  }

  getDrawer(batch) {
    const {
      count,
      numbers,
      amplitudeX,
      amplitudeY,
      omega,
      offset,
      multiplierX,
      multiplierY,
      width,
      height,
      amplitudeMultiplier,
    } = this.props;

    const originX = width / 2;
    const originY = height / 2;

    const squarewaveTransformX = (time) =>
      fourier(
        amplitudeX * amplitudeMultiplier,
        omega,
        time,
        numbers,
        squareWaveSequenceSin
      );
    const squarewaveTransformY = (time) =>
      fourier(
        amplitudeY * amplitudeMultiplier,
        omega,
        time,
        numbers,
        squareWaveSequenceSin
      );

    const arc = Array.from({ length: count }, (_, i) => [
      originX + squarewaveTransformX(multiplierX * (i + batch - offset)),
      originY + squarewaveTransformY(multiplierY * (i + batch + offset)),
    ]);

    return line().curve(curveBasisClosed)(arc);
  }

  update() {
    const {
      props: { count, thickness, spectrum },
    } = this;
    const data = Array.from({ length: count }, (_, i) => i);

    this.svg
      .selectAll("path.door")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "door")
            .attr("fill", "none")
            .attr("stroke-width", thickness)
            .attr("d", (d) => this.getDrawer(d))
            .attr("stroke", "#888888"),
        (update) =>
          update
            .attr("d", (d) => this.getDrawer(d))
            .attr("stroke-width", thickness),
        (exit) => exit
      );

    this.svg
      .select("defs")
      .selectAll("filter#noiseFilter")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("filter")
            .attr("id", "noiseFilter")
            .attr("x", "0")
            .attr("y", "0")
            .attr("height", this.props.height)
            .attr("width", this.props.width)
            .append("feTurbulence")
            .attr("type", "fractalNoise")
            .attr("baseFrequency", this.props.noiseFreqOne)
            .attr("numOctaves", this.props.numOctaves)
            .attr("stitchTiles", "stitch"),
        (update) =>
          update
            .attr("height", this.props.height)
            .attr("width", this.props.width)
            .selectAll("feTurbulence")
            .attr("baseFrequency", this.props.noiseFreqOne)
            .attr("numOctaves", this.props.numOctaves),
        (exit) => exit
      );
  }

  getSvg() {
    const { svg } = this;
    return svg;
  }
}

export default Zinc;
