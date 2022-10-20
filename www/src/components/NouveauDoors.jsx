import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import vector from "../vectors/nouveau-door-v2.js";

import Animator from "./Animator.jsx";
import NumberInput from "../components/NumberInput.jsx";

let vis = null;
const setVector = (v) => {
  vis = v;
};

export default function Vector(props) {
  const [options, setOptionsState] = useState({
    numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17],
    count: 7,
    height: 500,
    width: 500,
    amplitudeX: 240,
    amplitudeY: 240,
    frequency: 14,
    widthMultiplier: 0.6,
    // heightOffsetBottom: 0.65,
    // heightOffsetTop: 0.16,
    offset: 2,
    spectrum: 0,
    multiplierX: 15,
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
    "widthMultiplier",
    "originalHeight",
    "curve",
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
