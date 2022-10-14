class Super {
  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;

    this.svg = select(containerEl)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.update();
  }

  resize(width, height) {}

  update() {
    this.elements.forEach((element) => element());
  }

  registerElements(element) {
    this.elements.push(element);
  }
}
