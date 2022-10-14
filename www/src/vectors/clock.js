import { select } from "d3-selection";
import { lineRadial } from "d3-shape";

import { polarToCartesianX, polarToCartesianY } from "../utils/maths-tools";

class Clock {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;

    this.props.originX = width / 2;
    this.props.originY = height / 2;
    this.props.radius = (width * 0.9) / 2;
    this.props.hourNumbers = Array.from({ length: 12 }, (_, i) => i + 1);
    this.props.ticks = Array.from({ length: 60 }, (_, i) => i);

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, height) {
    const { svg, props } = this;

    if (width < 670) {
      props.width = width * 0.6;
      props.height = width * 0.6;
      props.amplitudeMultiplier = 0.4;
    } else {
      props.width = 500;
      props.height = 500;
      props.amplitudeMultiplier = 1;
    }

    // this.props.originX = width / 2;
    // this.props.originY = height / 2;
    // this.props.radius = width / 2;

    svg.attr("width", props.width).attr("height", props.height);

    this.update();
  }

  setOptions(props) {
    this.props = props;
    this.update();
  }

  getNumbersXPosition(d) {
    const { originX, radius } = this.props;
    const offset = originX;
    const distance = radius * 0.85;
    const angle = Math.PI - (d / 12) * 2 * Math.PI;
    const point = polarToCartesianX(angle, distance);
    return offset + point;
  }

  getNumbersYPosition(d) {
    const { originY, radius } = this.props;
    const offset = originY * 1.07;
    const distance = radius * 0.85;
    const angle = Math.PI - (d / 12) * 2 * Math.PI;
    const point = polarToCartesianY(angle, distance);
    return offset + point;
  }

  getHourHandPoints() {
    const { radius, hours, minutes, handTail } = this.props;
    const angle = (hours / 12 + minutes / 600) * 2 * Math.PI;
    return lineRadial()([
      [angle, radius * 0.5],
      [angle, 0],
      [angle, -radius * handTail],
    ]);
  }

  getMinuteHandPoints() {
    const { radius, minutes, handTail } = this.props;
    const angle = (minutes / 60) * 2 * Math.PI;
    return lineRadial()([
      [angle, radius * 0.8],
      [angle, 0],
      [angle, -radius * handTail],
    ]);
  }

  getSecondHandPoints() {
    const { radius, seconds, handTail } = this.props;
    const angle = (seconds / 60) * 2 * Math.PI;
    return lineRadial()([
      [angle, radius * 0.8],
      [angle, 0],
      [angle, -radius * handTail],
    ]);
  }

  getTickPoints(d) {
    const { radius } = this.props;
    const angle = (d / 60) * 2 * Math.PI;
    const distance = d % 5 ? 0.95 : 0.92;
    return lineRadial()([
      [angle, radius * distance],
      [angle, radius * 1],
    ]);
  }

  update() {
    const {
      svg,
      props: {
        width,
        height,
        radius,
        hourNumbersSize,
        hourNumbers,
        speckCircleSize,
        ticks,
        originY,
        originX,
        logo,
        colorPrimary,
        colorSecondary,
        tag,
      },
    } = this;

    svg
      .selectAll("circle")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("stroke", colorSecondary)
            .attr("fill", colorSecondary)
            .attr("stroke-width", "2"),
        (update) =>
          update.attr("cy", originY).attr("cx", originX).attr("r", radius)
      );

    svg
      .selectAll("text.numbers")
      .data(hourNumbers)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "numbers")
            .attr("text-anchor", "middle")
            .attr("fill", colorPrimary)
            .text((d) => d),
        (update) =>
          update
            .attr("x", (d) => this.getNumbersXPosition(d))
            .attr("y", (d) => this.getNumbersYPosition(d))
            .attr("font-size", hourNumbersSize)
      );

    svg
      .selectAll("text.name")
      .data([logo])
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "name")
            .attr("x", 0)
            .attr("y", -100)
            .attr("font-size", 20)
            .attr("text-anchor", "middle")
            .attr("fill", colorPrimary)
            .text((d) => d)
            .attr("transform", `translate(${originX},${originY})`),
        (update) =>
          update.attr("transform", `translate(${originX},${originY})`),
        (exit) => exit
      );

    svg
      .selectAll("text.tag")
      .data([tag])
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "tag")
            .attr("x", 0)
            .attr("y", -85)
            .attr("font-size", 15)
            .attr("text-anchor", "middle")
            .attr("fill", colorPrimary)
            .text((d) => d)
            .attr("transform", `translate(${originX},${originY})`),
        (update) =>
          update.attr("transform", `translate(${originX},${originY})`),
        (exit) => exit
      );

    svg
      .selectAll("path.hour")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "hour")
            .attr("stroke", "black")
            .attr("stroke-width", "4"),
        (update) =>
          update
            .attr("d", (_) => this.getHourHandPoints())
            .attr("transform", `translate(${originX},${originY})`)
      );

    svg
      .selectAll("path.minute")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "minute")
            .attr("stroke", colorPrimary)
            .attr("stroke-width", "3"),
        (update) =>
          update
            .attr("d", (_) => this.getMinuteHandPoints())
            .attr("transform", `translate(${width / 2},${height / 2})`)
      );

    svg
      .selectAll("path.second")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "second")
            .attr("stroke", "red")
            .attr("stroke-width", "2"),
        (update) =>
          update
            .attr("d", (_) => this.getSecondHandPoints())
            .attr("transform", `translate(${originX},${originY})`)
      );

    svg
      .selectAll("path.ticks")
      .data(ticks)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "minute")
            .attr("stroke", colorPrimary)
            .attr("stroke-width", "3")
            .attr("d", (d) => this.getTickPoints(d))
            .attr("transform", `translate(${originX},${originY})`),
        (update) =>
          update
            .attr("d", (d) => this.getTickPoints(d))
            .attr("transform", `translate(${originX},${originY})`)
      );

    svg
      .selectAll("circle.speck")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "speck")
            .attr("stroke", "red")
            .attr("fill", colorPrimary)
            .attr("stroke-width", "2")
            .attr("cy", 0)
            .attr("cx", 0)
            .attr("r", speckCircleSize)
            .attr("transform", `translate(${originX},${originY})`),
        (update) =>
          update
            .attr("r", speckCircleSize)
            .attr("transform", `translate(${originX},${originY})`)
      );

    !this.props.hideProps &&
      svg
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

export default Clock;
