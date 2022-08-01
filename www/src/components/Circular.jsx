import { h } from "preact";
import { useState } from "preact/hooks";
import colorPlot from "../vectors/color-plot.js";

import Animator from "./Animator/index.jsx";
import FlexRow from "./FlexRow/index.jsx";
import NumberInput from "./NumberInput/index.jsx";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function Circular(props) {
  const [options, setOptionsState] = useState({
    count: 100,
    height: 500,
    width: 500,
    offset: 0,
    frequency: 2,
    xAmplitude: 200,
    xMultiplier: 1,
    yAmplitude: 200,
    yMultiplier: 1,
    rAmplitude: 17,
    rMultiplier: 0.5,
    rOrigin: 18,
    colorMultiplier: 30188,
    colorOffset: 120,
  });

  const optionsToSkip = ["height", "width"];

  const optionsBar = Object.keys(options)
    .filter((d) => !optionsToSkip.includes(d))
    .map((key) => {
      const value = options[key];
      const handleChange = (value) => {
        const r = value;
        const newOptions = JSON.parse(JSON.stringify(options));
        newOptions[key] = r;
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
        <Animator drawer={colorPlot} setVis={setVis} options={options} />
      </FlexRow>
    </div>
  );
}
