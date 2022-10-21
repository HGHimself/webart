import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import cartesian from "../vectors/cartesian.js";

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
    count: 1000,
    height: 0,
    width: 0,
    offset: 0,
    amplitudeX: 240,
    amplitudeY: 240,
    frequency: 1,
    multiplierY: 2,
    multiplierX: 2,
    spectrum: 0,
    strokeWidth: 1,
    hideProps: props.hideProps ? props.hideProps : false,
  });

  const optionsToSkip = [
    "height",
    "width",
    "amplitudeMultiplier",
    "hideProps",
    "originalHeight",
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
      <Animator drawer={cartesian} setVis={setVis} options={options} />
    </Fragment>
  );
}
