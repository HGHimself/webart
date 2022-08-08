import { select } from "d3-selection";
import { line } from "d3-shape";

import theme from "../theme";
import { drawArc } from "../utils/svg-tools.js";
import {
  simpleHarmonicMotionSin,
  simpleHarmonicMotionCos,
} from "../utils/maths-tools.js";

class HarmonicMotion {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;
    this.props.amplitudeMultiplier = 1;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.svg
      .selectAll("circle")
      .data([0])
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

    props.originXCircles = props.amplitude;
    props.originYCircles = originY;

    props.originXLine = props.amplitude * 2.5;
    props.originYLine = originY;
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
        i + offset
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
      props: { amplitude, originYCircles, originXCircles, amplitudeMultiplier },
    } = this;

    const Sinwave = this.getSinwave();
    const getSinwaveDrawer = this.getSinwaveDrawer();
    const getRadius = () => amplitudeMultiplier * amplitude;

    svg
      .selectAll("circle")
      .data([0])
      .join(
        (enter) => enter,
        (update) =>
          update
            .attr("cy", originYCircles)
            .attr("cx", originXCircles)
            .attr("r", getRadius)
      );
    svg.selectAll("path.circles").attr("d", getSinwaveDrawer);
    svg.selectAll("path.lines").attr("d", Sinwave);
    svg
      .selectAll("text.details")
      .data(Object.keys(this.props).map((key) => `${key}: ${this.props[key]}`))
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

  setOptions(props) {
    this.props = props;
    this.props.period = props.frequency;
    this.props.omega = 2 * Math.PI * (1 / props.frequency);
    this.props.originXLine = this.props.amplitude * 2.5;
    this.props.originXCircles = this.props.amplitude;
    this.update();
  }
}

export default HarmonicMotion;
