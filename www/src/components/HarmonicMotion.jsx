import { h } from "preact";
import { useState } from "preact/hooks";

import harmonicMotion from "../vectors/harmonic-motion.js";

import Animator from "./Animator/index.jsx";
import FlexRow from "./FlexRow/index.jsx";
import NumberInput from "./NumberInput/index.jsx";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function HarmonicMotion(props) {
  const time = 10;
  const frequency = 300;
  const step = 1;

  const [options, setOptionsState] = useState({
    count: frequency,
    height: 500,
    width: 500,
    frequency: 350,
    offset: 0,
    amplitude: 100,
    hideProps: props.hideProps ? props.hideProps : false
  });

  const intervalHandler = () => {
    setOptionsState((currentOptions) => {
      currentOptions.offset += step;
      vis.setOptions(currentOptions);
      return currentOptions;
    });
  };

  const optionsToSkip = [
    "height",
    "width",
    "numbers",
    "offset",
    "omega",
    "count",
    "originXCircles",
    "originYCircles",
    "originXLine",
    "originYLine",
    "period",
    "amplitudeMultiplier",
    "hideProps"
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

      return <NumberInput value={value} onChange={handleChange} label={key} />;
    });

  return (
    <div>
      <FlexRow direction="row" wrap="wrap">
        {optionsBar}
      </FlexRow>
      <Animator
        drawer={harmonicMotion}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={intervalHandler}
      />
    </div>
  );
}
