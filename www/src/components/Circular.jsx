import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import colorPlot from "../vectors/color-plot.js";

import Animator from "./Animator.jsx";
import NumberInput from "./NumberInput.jsx";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function Circular(props) {
  const [options, setOptionsState] = useState({
    height: 0,
    width: 0,
    count: 100,
    offset: 0,
    frequency: 2,
    xAmplitude: 200,
    yAmplitude: 200,
    rAmplitude: 17,
    xMultiplier: 1,
    yMultiplier: 1,
    rMultiplier: 0.5,
    colorMultiplier: 30188,
    rOffset: 18,
    colorOffset: 120,
    thickness: 1,
    hideProps: props.hideProps ? props.hideProps : false,
  });

  const optionsToSkip = [
    "height",
    "width",
    "amplitudeMultiplier",
    "hideProps",
    "originalHeight",
    "data",
    "period",
  ];

  const optionsBar = Object.keys(options)
    .filter((d) => !optionsToSkip.includes(d))
    .map((key) => {
      const value = options[key];
      const handleChange = (value) => {
        const r = value;
        const newOptions = JSON.parse(JSON.stringify(options));
        newOptions[key] = parseFloat(r);
        setOptionsState(newOptions);
        vis.setOptions(newOptions);
      };

      return (
        <div className="personal-space-right">
          <NumberInput value={value} onChange={handleChange} label={key} />
        </div>
      );
    });

  return (
    <Fragment>
      <div className="flex row wrap">{optionsBar}</div>
      <Animator drawer={colorPlot} setVis={setVis} options={options} />
    </Fragment>
  );
}
