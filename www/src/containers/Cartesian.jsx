import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import entry from "../build/entry.js";
import Button from "../components/Button.jsx";

import { default as Vector } from "../components/Cartesian.jsx";
import Title from "../components/Title.jsx";

function Cartesian() {
  const [hideProps, setHideProps] = useState(false)

  return (
    <Fragment>
      <Button onClick={() => setHideProps(!hideProps)}>Hide</Button>
      <Vector hideProps={hideProps}/>
      <Title
        title="RADIAL CARTESIAN"
        description="Draw using ratios and simple harmonic motion. Experiment with the values!"
      />
    </Fragment>
  );
}

entry(<Cartesian />);
