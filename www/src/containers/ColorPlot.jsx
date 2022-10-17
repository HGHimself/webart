import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import entry from "../build/entry.js";

import Circular from "../components/Circular.jsx";
import Title from "../components/Title.jsx";

function ColorPlot() {
  return (
    <Fragment>
      <Circular />
      <Title
        title="CIRCULAR CARTESIAN"
        description="Draw using ratios and simple harmonic motion. Experiment with the values!"
      />
    </Fragment>
  );
}

export default entry(<ColorPlot />);
