import { h, Fragment } from "preact";
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
    count: props.count || 6,
    height: 790,
    width: 1400,
    amplitudeX: 1900,
    amplitudeY: 1400,
    period: 20,
    omega: props.omega || Math.PI / 10,
    offset: props.offset || 40,
    spectrum: 0,
    multiplierX: props.multiplierX || 5,
    multiplierY: props.multiplierY || 16,
    thickness: 1,
    noiseFreqOne: 2.78,
    numOctaves: 6,
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
    <Fragment>
      <FlexRow direction="row" wrap="wrap">
        {optionsBar}
      </FlexRow>
      <Animator drawer={zinc} setVis={setVis} options={options} />
    </Fragment>
  );
}
