import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import "./style.css";
import entry from "../../build/entry.js";
import colorPlot from "../../vectors/color-plot.js";

import Animator from "../../components/Animator/index.jsx";
import FlexRow from "../../components/FlexRow/index.jsx";
import Title from "../../components/Title/index.jsx";
import NumberInput from "../../components/NumberInput/index.jsx";

let vis;
const setVis = (v) => {
  vis = v;
};

function ColorPlot(props) {
  const [options, setOptionsState] = useState({
    count: 100,
    height: 300,
    width: 300,
    frequency: 1,
    xAmplitude: 200,
    xMultiplier: 1,
    yAmplitude: 40,
    yMultiplier: 2,
    rAmplitude: 10,
    rMultiplier: 1,
    rOrigin: 10,
    colorMultiplier: 0.003,
    colorOffset: 106,
  });

  const optionsBar = Object.keys(options).map((key) => {
    const value = options[key];
    const handleChange = (value) => {
      const r = Math.abs(value);
      const newOptions = JSON.parse(JSON.stringify(options));
      newOptions[key] = r;
      setOptionsState(newOptions);
      vis.setOptions(newOptions);
    };

    return (
      <FlexRow flex="center">
        <FlexRow direction="column" align="center">
          <h6>{key}</h6>
          <NumberInput value={value} onChange={handleChange} />
        </FlexRow>
      </FlexRow>
    );
  });

  return (
    <div className="page">
      <div className="content">
        <FlexRow direction="row" wrap="wrap">
          {optionsBar}
        </FlexRow>
        <FlexRow flex="space-around">
          <Animator drawer={colorPlot} setVis={setVis} options={options} />
        </FlexRow>
      </div>
      <Title title="Digitheque" description="" />
    </div>
  );
}

export default entry(<ColorPlot />);
