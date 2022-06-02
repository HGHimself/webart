// containers/vector.jsx
import { h } from "preact";
import { useState, useRef } from "preact/hooks";
import escher from "../vectors/escher.js";

import Animator from "../components/Animator/";
import Title from "../components/Title/";

let vis = null;
const setVector = (v) => {
  vis = v;
};

export default function Escher(props) {
  const options = {
    height: 600,
    width: 1500,
    count: 5,
  };

  return (
    <>
      <a href="/webart">back</a>
      <Title title="ESCHER" description="" />
      <Animator drawer={escher} setVis={setVector} options={options} />
    </>
  );
}
