import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import vector from "../vectors/nouveau-door.js";

import Animator from "./Animator.jsx";
import NumberInput from "../components/NumberInput.jsx";

let vis = null;
const setVector = (v) => {
  vis = v;
};

export default function Vector(props) {
  const [options, setOptionsState] = useState({
    numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17],
    count: 9,
    height: 750,
    width: 250,
    amplitudeX: 250,
    amplitudeY: 250,
    frequency: 13,
    offset: 0,
    spectrum: 0,
    multiplierX: 5,
    multiplierY: 16,
    curve: 0,
    hideProps: props.hideProps ? props.hideProps : false,
  });

  const optionsToSkip = [
    "numbers",
    "height",
    "width",
    "omega",
    "period",
    "amplitudeMultiplier",
    "hideProps",
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

  const controls = !props.hideControls && (
    <div className="flex row wrap">{optionsBar}</div>
  );

  return (
    <Fragment>
      {controls}
      <Animator drawer={vector} setVis={setVector} options={options} />
    </Fragment>
  );
}