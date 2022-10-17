import { h } from "preact";
import entry from "../build/entry.js";

import { default as Vector } from "../components/Spectrum.jsx";
import Title from "../components/Title.jsx";

let vis = null;
const setVis = (v) => {
  vis = v;
};

function Spectrum(props) {
  return (
    <div className="page">
      <Vector />
      <Title
        title="SPECTRUM"
        description="Draw using ratios and simple harmonic motion. Experiment with the values!"
      />
    </div>
  );
}

entry(<Spectrum />);
