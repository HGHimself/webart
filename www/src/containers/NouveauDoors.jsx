import { h } from "preact";
import { useState } from "preact/hooks";
import entry from "../build/entry.js";

import { default as Vector } from "../components/NouveauDoors.jsx";
import Title from "../components/Title/index.jsx";

let vis = null;
const setVis = (v) => {
  vis = v;
};

function Cartesian(props) {
  return (
    <div className="page">
      <Vector />
      <Title
        title="NOUVEAU DOORS"
        description="Gaudí inspired, procedurally generated, art nouveau doors. Experiment with the values!"
      />
    </div>
  );
}

entry(<Cartesian />);
