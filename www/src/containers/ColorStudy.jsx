import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

import relativity from "../vectors/relativity.js";
import theme from "../theme";

import Animator from "../components/Animator/";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function ColorStudy(props) {
  const height = 600;
  const width = 1000;

  const colors = [
    {
      left: "rgb(140, 40, 10)",
      right: "rgb(190, 190, 0)",
      color: "rgb(150, 130, 10)",
    },
    {
      left: "rgb(200, 0, 150)",
      right: "rgb(120, 90, 40)",
      color: "rgb(170, 50, 100)",
    },
    {
      left: "rgb(160, 70, 200)",
      right: "rgb(170, 70, 60)",
      color: "rgb(160, 70, 96)",
    },
    {
      left: "rgb(160, 70, 200)",
      right: "rgb(100, 200, 100)",
      color: "rgb(140, 170, 140)",
    },
    {
      left: "rgb(200, 100, 100)",
      right: "rgb(200, 200, 100)",
      color: "rgb(200, 160, 120)",
    },
    {
      left: "rgb(120, 130, 250)",
      right: "rgb(200, 200, 100)",
      color: "rgb(150, 155, 200)",
    },
    {
      left: "rgb(255, 200, 130)",
      right: "rgb(100, 20, 100)",
      color: "rgb(200, 135, 150)",
    },
    {
      left: "rgb(140, 40, 140)",
      right: "rgb(190, 110, 40)",
      color: "rgb(180, 70, 100)",
    },
  ];

  const color = colors[Math.floor(Math.random() * 300) % colors.length];

  const options = {
    height,
    width,
    left: color.left,
    right: color.right,
    color: color.color,
  };

  return (
    <>
      <a href="/webart">back</a>
      <Animator drawer={relativity} setVis={setVis} options={options} />
    </>
  );
}
