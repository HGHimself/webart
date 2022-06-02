import { select } from "d3-selection";
import { line } from "d3-shape";

import theme from "../theme";
import { getSpectrumPosition } from "../utils/color-tools.js";

class Relativity {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    this.props.counter = 0;
    const { width, height } = props;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, height) {
    const { svg, props } = this;

    svg.attr("width", width).attr("height", height);

    props.width = width;
    props.height = height;

    this.update();
  }

  update() {
    const {
      svg,
      props: { width, height, left, right, color },
    } = this;

    const colorDimensions = 80;

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", height)
      .attr("width", width * 0.5)
      .attr("fill", left);

    svg
      .append("rect")
      .attr("x", width * 0.5)
      .attr("y", 0)
      .attr("height", height)
      .attr("width", width * 0.5)
      .attr("fill", right);

    svg
      .append("rect")
      .attr("x", width * 0.25 - colorDimensions * 0.5)
      .attr("y", height * 0.5 - colorDimensions * 0.75)
      .attr("height", colorDimensions * 1.5)
      .attr("width", colorDimensions)
      .attr("fill", color);
    svg
      .append("rect")
      .attr("x", width * 0.75 - colorDimensions * 0.5)
      .attr("y", height * 0.5 - colorDimensions * 0.75)
      .attr("height", colorDimensions * 1.5)
      .attr("width", colorDimensions)
      .attr("fill", color);
  }
}

export default Relativity;
