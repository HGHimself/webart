import { h } from "preact";
import { useState } from "preact/hooks";
import zinc from "../vectors/zinc.js";

import Animator from "../components/Animator/index.jsx";
import FlexRow from "../components/FlexRow/index.jsx";
import NumberInput from "../components/NumberInput/index.jsx";

let vis = null;
const setVis = (v) => {
  vis = v;
};

export default function Zinc(props) {

  const [options, setOptionsState] = useState({
    numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17],
    count: 6,
    height: 500,
    width: 250,
    amplitudeX: 250,
    amplitudeY: 500,
    period: 20,
    omega: 2 * Math.PI * (1 / 20),
    offset: 40,
    spectrum: 0,
    multiplierX: 5,
    multiplierY: 16,
    hideProps: props.hideProps ? props.hideProps : false,
  });

  const optionsToSkip = ["height", "width", "amplitudeMultiplier", "hideProps"];

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
    <FlexRow flex="space-around">
      <Animator drawer={zinc} setVis={setVis} options={options} />
    </FlexRow>
  </div>
  );
}
