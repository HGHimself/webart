import { Fragment, h } from "preact";
import entry from "../build/entry.js";

import { default as Vector } from "../components/Cartesian.jsx";
import Title from "../components/Title.jsx";

function Cartesian() {
  return (
    <Fragment>
      <Vector />
      <Title
        title="RADIAL CARTESIAN"
        description="Draw using ratios and simple harmonic motion. Experiment with the values!"
      />
    </Fragment>
  );
}

entry(<Cartesian />);
