import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import cartesian from "../vectors/cartesian.js";

import Animator from "./Animator.jsx";
import NumberInput from "./NumberInput.jsx";
import Button from "./Button.jsx";

let vis = null;
const setVis = (v) => {
  vis = v;
};

export default function Cartesian(props) {
  const { options: proptions, hideOptionsBar, disableResize } = props;
  const [showOptions, setShowOptions] = useState(true);
  const [options, setOptionsState] = useState(
    proptions || {
      height: 0,
      width: 0,
      count: 1000,
      offset: 0,
      frequency: 1,
      xAmplitude: 240,
      yAmplitude: 240,
      yMultiplier: 2,
      xMultiplier: 2,
      color: 0,
      thickness: 1,
      hideProps: false,
    }
  );

  const optionsToSkip = [
    "height",
    "width",
    "amplitudeMultiplier",
    "hideProps",
    "originalHeight",
    "period",
    "data",
  ];

  const optionsBarElements = Object.keys(options)
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

      return <NumberInput value={value} onChange={handleChange} label={key} />;
    });

  const optionsBar = !hideOptionsBar && (
    <div className="flex wrap align-start centered-items options-bar sixth personal-space-right">
      <Button onClick={() => setShowOptions(!showOptions)}>
        {showOptions ? "Hide" : "Show"}
      </Button>
      {showOptions && optionsBarElements}
    </div>
  );

  return (
    <Fragment>
      {optionsBar}
      <Animator
        drawer={cartesian}
        setVis={setVis}
        options={options}
        disableResize={disableResize}
      />
    </Fragment>
  );
}
