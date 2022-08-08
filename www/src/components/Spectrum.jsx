import { h } from "preact";
import { useState } from "preact/hooks";
import spectrum from "../vectors/spectrum.js";

import Animator from "./Animator/index.jsx";
import FlexRow from "./FlexRow/index.jsx";
import NumberInput from "./NumberInput/index.jsx";

let vis = null;
const setVis = (v) => {
  vis = v;
};

export default function Spectrum(props) {
  const [options, setOptionsState] = useState({
    count: 1000,
    height: 500,
    width: 500,
    size: 20,
    spectrum: 0,
    hideProps: props.hideProps ? props.hideProps : false,
  });

  const optionsToSkip = ["height", "width", "hideProps"];

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
        <Animator drawer={spectrum} setVis={setVis} options={options} />
      </FlexRow>
    </div>
  );
}
