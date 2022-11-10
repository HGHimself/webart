import { select } from "d3-selection";
import { lineRadial, line } from "d3-shape";

import { polarToCartesianX, polarToCartesianY } from "../utils/maths-tools";

class Clock {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;

    this.props.originX = width / 2;
    this.props.originY = height / 2;
    this.props.radius = width / 2;

    this.props.hourNumbers = [
      "XII",
      "I",
      "II",
      "III",
      "IIII",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
    ];
    this.props.ticks = Array.from({ length: 60 }, (_, i) => i);

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, _height) {
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

    this.props.originX = props.width / 2;
    this.props.originY = props.height / 2;
    this.props.radius = props.width / 2;

    svg.attr("width", props.width).attr("height", props.height);

    this.update();
  }

  setOptions(props) {
    this.props = props;
    this.update();
  }

  getNumbersXPosition(d) {
    const { originX, radius, numbersRadius } = this.props;
    const offset = originX;
    const distance = radius * numbersRadius * 0.01;
    const angle = Math.PI - (d / 12) * 2 * Math.PI;
    const point = polarToCartesianX(angle, distance);
    return offset + point;
  }

  getNumbersYPosition(d) {
    const { originY, radius, numbersRadius } = this.props;
    const offset = originY;
    const distance = radius * numbersRadius * 0.01;
    const angle = Math.PI - (d / 12) * 2 * Math.PI;
    const point = polarToCartesianY(angle, distance);
    return offset + point;
  }

  getHourHandPoints() {
    const { radius, hours, minutes, hourHandEnd, hourHandStart } = this.props;
    const angle = (hours / 12 + minutes / 720) * 2 * Math.PI;
    return lineRadial()([
      [angle, radius * hourHandStart * 0.01],
      [angle, radius * hourHandEnd * 0.01],
    ]);
  }

  getMinuteHandPoints() {
    const { radius, minutes, minuteHandEnd, minuteHandStart } = this.props;
    const angle = (minutes / 60) * 2 * Math.PI;
    return lineRadial()([
      [angle, radius * minuteHandStart * 0.01],
      [angle, radius * minuteHandEnd * 0.01],
    ]);
  }

  getSecondHandPoints() {
    const { radius, seconds, secondHandEnd, secondHandStart } = this.props;
    const angle = (seconds / 60) * 2 * Math.PI;
    return lineRadial()([
      [angle, radius * secondHandStart * 0.01],
      [angle, radius * secondHandEnd * 0.01],
    ]);
  }

  getTickPoints(d) {
    const { radius, tickMarksStart, tickMarksEnd, hourTicks } = this.props;
    const angle = (d / 60) * 2 * Math.PI;
    const tickEnd = tickMarksEnd * 0.01;
    const tickStart = tickMarksStart * 0.01;
    const distance = d % 5 ? tickEnd : tickEnd * hourTicks * 0.01;
    return lineRadial()([
      [angle, radius * distance],
      [angle, radius * tickStart],
    ]);
  }

  update() {
    const {
      svg,
      props: {
        originX,
        originY,
        radius,
        hourNumbersSize,
        hourNumbers,
        speckCircleSize,
        ticks,
        logo,
        colorPrimary,
        colorSecondary,
        tag,
        date,
        hourHandThickness,
        minuteHandThickness,
        secondHandThickness,
        tickMarksThickness,
      },
    } = this;

    svg
      .selectAll("circle")
      .data([0])
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("stroke", colorPrimary)
            .attr("fill", colorSecondary)
            .attr("stroke-width", "1"),
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
            .attr("font-family", "BentonModernDispExtraCondLight")
            .attr("letter-spacing", "-5px")
            .text((d) => d),
        (update) =>
          update
            .attr(
              "transform",
              (d, i) =>
                `rotate(${(i / 12) * 360} ${this.getNumbersXPosition(
                  i
                )} ${this.getNumbersYPosition(i)})`
            )
            .attr("x", (d, i) => this.getNumbersXPosition(i))
            .attr("y", (d, i) => this.getNumbersYPosition(i))
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
            .attr("y", -70)
            .attr("font-size", 25)
            .attr("text-anchor", "middle")
            .attr("fill", colorPrimary)
            .attr("font-weight", "bold")
            .attr("font-family", "BentonModernDispExtraCondLight")
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
            .attr("y", -55)
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .attr("letter-spacing", "0.2em")
            .attr("fill", colorPrimary)
            .text((d) => d),
        (update) =>
          update.attr("transform", `translate(${originX},${originY})`),
        (exit) => exit
      );
    console.log(date);
    svg
      .selectAll("text.date")
      .data(date)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "date")
            .attr("x", 0)
            .attr("y", (d, i) => 55 + i * 15)
            .attr("font-size", 15)
            .attr("text-anchor", "middle")
            .attr("letter-spacing", "0.2em")
            .attr("fill", colorPrimary),
        (update) =>
          update
            .attr("transform", `translate(${originX},${originY})`)
            .text((d) => d),
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
            .attr("stroke", colorPrimary),
        (update) =>
          update
            .attr("d", (_) => this.getHourHandPoints())
            .attr("stroke-width", hourHandThickness)
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
            .attr("stroke", colorPrimary),
        (update) =>
          update
            .attr("d", (_) => this.getMinuteHandPoints())
            .attr("stroke-width", minuteHandThickness)
            .attr("transform", `translate(${originX},${originY})`)
      );

    svg
      .selectAll("path.second")
      .data([0])
      .join(
        (enter) =>
          enter.append("path").attr("class", "second").attr("stroke", "black"),
        (update) =>
          update
            .attr("d", (_) => this.getSecondHandPoints())
            .attr("stroke-width", secondHandThickness)
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
            .attr("d", (d) => this.getTickPoints(d))
            .attr("transform", `translate(${originX},${originY})`),
        (update) =>
          update
            .attr("d", (d) => this.getTickPoints(d))
            .attr("stroke-width", tickMarksThickness)
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
            .attr("stroke", "gold")
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
