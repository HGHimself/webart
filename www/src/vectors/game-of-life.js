// save in vectors/vector.js
import { select } from "d3-selection";
import { getSpectrumPosition } from "../utils/color-tools.js";

class GameOfLife {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height, w } = props;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, height) {
    // const { svg, props } = this;
    // if (width < 670) {
    //   props.width = width * 0.6;
    //   props.height = width * 0.6;
    // } else if (width >= 720) {
    //   props.width = 720;
    //   props.height = 500;
    // } else {
    //   props.width = width;
    //   props.height = 500;
    // }
    // svg.attr("width", props.width).attr("height", props.height);
    // this.update();
  }

  setOptions(options) {
    this.props = options;
    this.update();
  }

  getX() {
    const {
      props: { width, size },
    } = this;
    return (_, i) => size * (i % Math.ceil(width / size));
  }

  getWidth() {
    const {
      props: { width, count, size },
    } = this;
    return (_, i) => size;
  }

  getY() {
    const {
      props: { width, size },
    } = this;
    return (_, i) => Math.floor(i / (width / size)) * size;
  }

  getHeight() {
    const {
      props: { size },
    } = this;
    return (_, i) => size;
  }

  getColor() {
    const {
      props: { spectrum },
    } = this;

    return (d, i) =>
      //getSpectrumPosition(i * 0.1)
      d == 0
        ? "transparent"
        : d == 1
        ? "currentColor"
        : d == 2
        ? "black"
        : "#7CA2B8";
  }

  update() {
    const {
      svg,
      props: { data, w, width },
    } = this;

    this.props.size = Math.floor(width / w);
    svg
      .selectAll("rect")
      .data(data)
      .join(
        (enter) => enter.append("rect").attr("stroke-width", "0.1"),
        (update) =>
          update
            .attr("x", this.getX())
            .attr("y", this.getY())
            .attr("width", this.getWidth())
            .attr("height", this.getHeight())
            .attr("stroke", "grey")
            .attr("fill", this.getColor())
        // (exit) => exit
      );

    !this.props.hideProps &&
      svg
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

export default GameOfLife;
