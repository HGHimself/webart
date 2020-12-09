import * as d3 from "d3";

export const drawArc = (inner, outer, start, end) => d3.arc()
    .innerRadius(inner)
    .outerRadius(outer)
    .startAngle(start)
    .endAngle(end)
