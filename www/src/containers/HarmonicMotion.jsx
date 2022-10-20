import { Fragment, h } from "preact";
import entry from "../build/entry.js";

import { default as Vector } from "../components/HarmonicMotion.jsx";
import Title from "../components/Title.jsx";

function HarmonicMotion() {
  return (
    <Fragment>
      <Vector />
      <Title
        title="HARMONIC MOTION"
        description="Simple harmonic motion example!"
      />
    </Fragment>
  );
}

entry(<HarmonicMotion />);
