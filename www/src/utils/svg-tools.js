import { arc } from "d3-shape";

export const drawArc = (inner, outer, start, end) =>
  arc().innerRadius(inner).outerRadius(outer).startAngle(start).endAngle(end);
