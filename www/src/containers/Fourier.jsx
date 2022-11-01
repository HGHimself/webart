import { Fragment, h } from "preact";
import entry from "../build/entry.js";

import { default as Vector } from "../components/Fourier.jsx";
import Title from "../components/Title.jsx";

function Fourier() {
  return (
    <Fragment>
      <Vector />
      <Title
        title="FOURIER CARTESIAN"
        description="Draw using ratios and squarewaves. Experiment with the values!"
      />
    </Fragment>
  );
}

entry(<Fourier />);
