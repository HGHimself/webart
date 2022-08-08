import { h } from "preact";
import { useState } from "preact/hooks";
import entry from "../../build/entry.js";

import Circular from "../../components/Circular.jsx";
import Title from "../../components/Title/index.jsx";

function ColorPlot(props) {
  return (
    <div className="page">
      <Circular />
      <Title
        title="CIRCULAR CARTESIAN"
        description="Draw using ratios and simple harmonic motion. Experiment with the values!"
      />
    </div>
  );
}

export default entry(<ColorPlot />);
