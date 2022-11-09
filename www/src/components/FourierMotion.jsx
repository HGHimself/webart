import { h, Fragment } from "preact";
import { useState, useRef } from "preact/hooks";

import fourier from "../vectors/fourier-motion.js";

import Animator from "./Animator.jsx";
import NumberInput from "./NumberInput.jsx";
import Switch from "./Switch.jsx";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function Fourier(props) {
  const time = 30;
  const step = 1;

  const [options, setOptionsState] = useState({
    numbers: [1, 15, 3, 11, 5, 9, 7],
    offset: 0,
    count: 350,
    height: 500,
    width: 1300,
    frequency: 120,
    amplitude: 200,
    thickness: 0.5,
  });

  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef();
  runningRef.current = isRunning;
  const intervalHandler = () => {
    if (runningRef.current) {
      setOptionsState((currentOptions) => {
        currentOptions.offset += step;
        vis.setOptions(currentOptions);
        return currentOptions;
      });
    }
  };

  const optionsToSkip = [
    "height",
    "width",
    "amplitudeMultiplier",
    "originXCircles",
    "originYCircles",
    "originYLine",
    "originXLine",
    "hideProps",
    "omega",
    "offset",
    "numbers",
    "count",
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

  return (
    <Fragment>
      <div className={isRunning ? "green" : "red"}>
        <Switch
          label="ANIMATE"
          state={isRunning}
          onClick={() => setIsRunning(!isRunning)}
        />
      </div>
      <div className="flex row wrap">{optionsBar}</div>
      <Animator
        drawer={fourier}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={isRunning ? intervalHandler : null}
      />
    </Fragment>
  );
}
