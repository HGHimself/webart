import { h } from "preact";
import { useState } from "preact/hooks";
import "./style.css";
import entry from "../../build/entry.js";
import circular from "../../vectors/circular.js";

import Animator from "../../components/Animator/index.jsx";
import FlexRow from "../../components/FlexRow/index.jsx";
import Title from "../../components/Title/index.jsx";
import NumberInput from "../../components/NumberInput/index.jsx";

let vis = null;
const setVis = (v) => {
  vis = v;
};

function Cartesian(props) {
  const [options, setOptionsState] = useState({
    count: 1000,
    height: 500,
    width: 500,
    offset: 0,
    amplitudeX: 240,
    amplitudeY: 240,
    frequency: 1,
    multiplierY: 2,
    multiplierX: 2,
    spectrum: 0,
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
    <div className="page">
      <div className="content">
        <FlexRow direction="row" wrap="wrap">
          {optionsBar}
        </FlexRow>
        <FlexRow flex="space-around">
          <Animator drawer={circular} setVis={setVis} options={options} />
        </FlexRow>
      </div>
      <Title
        title="DESCARTES"
        description="Draw using ratios and simple harmonic motion. Experiment with the values!"
      />
    </div>
  );
}

entry(<Cartesian />);
