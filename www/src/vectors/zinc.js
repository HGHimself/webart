// save in vectors/vector.js
import { select } from "d3-selection";
import { line, curveBasisClosed } from "d3-shape";
import {
  fourier,
  squareWaveSequenceSin,
} from "../utils/maths-tools.js";
import { getSpectrumPosition } from "../utils/color-tools.js";

class Vector {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-image", "radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0, transparent 50%), radial-gradient(at 0% 50%, hsla(355,85%,93%,1) 0, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0, transparent 50%)")

    this.svg.append("defs");

    this.svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("filter", "url(#noiseFilter)")
  
    
    this.update();

  }

  resize(width, height) {
    const { svg, props } = this;

    if (width < 720) {
      props.width = width;
      props.amplitudeMultiplier = 0.4;
    } else {
      props.width = 720;
      props.amplitudeMultiplier = 1;
    }

    svg.attr("width", props.width);

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

export default Vector;
