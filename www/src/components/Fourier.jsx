import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import fourier from "../vectors/fourier.js";

import Animator from "./Animator.jsx";
import NumberInput from "./NumberInput.jsx";
import Button from "../components/Button.jsx";

let vis = null;
const setVis = (v) => {
  vis = v;
};

export default function Cartesian(props) {
  const [hideOptionsBar, setHideOptionsBar] = useState(false);
  const [options, setOptionsState] = useState({
    height: 0,
    width: 0,
    count: 1000,
    offset: 0,
    frequency: 6,
    xAmplitude: 500,
    yAmplitude: 200,
    xMultiplier: 4,
    yMultiplier: 4,
    color: 0,
    thickness: 0.5,
    numbers: [1, 2, 3,],
    curve: 0,
    hideProps: props.hideProps ? props.hideProps : false,
  });

  const optionsToSkip = [
    "height",
    "width",
    "amplitudeMultiplier",
    "hideProps",
    "originalHeight",
    "period",
    "data",
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

  const optionsBarElement = (
    <div className="flex wrap options-bar">{!hideOptionsBar && optionsBar}</div>
  );

  return (
    <Fragment>
      {optionsBarElement}
      <Animator drawer={fourier} setVis={setVis} options={options} />
    </Fragment>
  );
}
