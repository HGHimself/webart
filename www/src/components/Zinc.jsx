import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import zinc from "../vectors/zinc.js";

import Animator from "../components/Animator/index.jsx";
import FlexRow from "../components/FlexRow/index.jsx";
import NumberInput from "../components/NumberInput/index.jsx";
import { random } from "../utils/maths-tools.js";

let vis = null;
const setVis = (v) => {
  vis = v;
};

export default function Zinc(props) {
  const [options, setOptionsState] = useState({
    numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17],
    count: props.random ? random(4, 2) : 6,
    height: 790,
    width: 1400,
    amplitudeX: 1900,
    amplitudeY: 1400,
    omega: 1,
    offset: props.random ? random(1, 100) : 40,
    spectrum: 0,
    multiplierX: props.random ? random(1, 20) : 5,
    multiplierY: props.random ? random(1, 20) : 16,
    thickness: 1,
    noiseFreqOne: 2.78,
    numOctaves: 6,
    hideProps: props.hideProps ? props.hideProps : false,
  });

  const optionsToSkip = [
    "numbers",
    "height",
    "width",
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

      return <NumberInput value={value} onChange={handleChange} label={key} />;
    });

  const controls = !props.hideControls && (
    <FlexRow direction="row" wrap="wrap">
      {optionsBar}
    </FlexRow>
  );

  return (
    <Fragment>
      {controls}
      <Animator drawer={zinc} setVis={setVis} options={options} />
    </Fragment>
  );
}
